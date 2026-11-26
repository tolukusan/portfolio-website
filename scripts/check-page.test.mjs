// Checks the prerendered home page produced by `next build`.
// Run with: pnpm build && pnpm check
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const raw = readFileSync(".next/server/app/index.html", "utf8");

// The RSC payload inside <script> tags repeats class names and hrefs,
// so every check runs on the markup with scripts removed.
const html = raw.replace(/<script\b[\s\S]*?<\/script>/g, "");

const cssDir = ".next/static/css";
const css = readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(cssDir, f), "utf8"))
  .join("\n");

function textOf(fragment) {
  return fragment
    .replace(/<script\b[\s\S]*?<\/script>/g, " ")
    .replace(/<style\b[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&apos;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function section(id) {
  const start = html.indexOf(`id="${id}"`);
  assert.ok(start >= 0, `missing #${id}`);
  const end = html.indexOf("</section>", start);
  return html.slice(start, end);
}

const text = textOf(html);

test("one h1", () => {
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
});

test("every in-page link has a target", () => {
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `no element with id="${id}"`);
  }
});

test("no placeholders, invented metrics or banned terms", () => {
  for (const re of [
    /illustration placeholder/i,
    /\[(add|your|todo|placeholder)/i,
    /\bTODO\b/,
    /hours to minutes/i,
    /fewer broken builds/i,
    /\d+\s?%/,
    /idempoten/i,
    /\bcron\b/i,
    /webhook/i,
    /Ajoti|DigitalBridge|StitchPro|IDA AI Sandbox/,
  ]) {
    assert.doesNotMatch(text, re);
  }
});

test("education has its training arc note in the handwriting font", () => {
  const edu = section("education");
  assert.match(textOf(edu), /training arc/);
  assert.match(edu, /font-hand/);
});

test("profile card lists the character sheet rows and hides empty likes", () => {
  const p = section("profile");
  const t = textOf(p);
  assert.match(p, /<dl/);
  for (const row of [
    "Class",
    "Base",
    "Current guild",
    "Main stats",
    "Backend / full-stack developer",
    "Nigeria",
    "Ibadan Digital Academy, Lead Developer (2025 to present)",
  ]) {
    assert.ok(t.includes(row), row);
  }
  assert.doesNotMatch(t, /Likes|Dislikes/);
});

test("abilities uses one swatch tone per group and holds the code block", () => {
  const a = section("abilities");
  const tones = new Set([...a.matchAll(/data-tone="(\w+)"/g)].map((m) => m[1]));
  assert.deepEqual([...tones].sort(), ["mint", "orange", "sky", "yellow"]);
  assert.match(textOf(a), /colour notes/);
  assert.match(a, /stack\.config\.ts/);
  assert.ok(!html.includes('id="skills"'));
});

test("hero introduces Tolu and offers the recruit action", () => {
  const h = section("about");
  const t = textOf(h);
  for (const s of [
    "CHARACTER SHEET",
    "Hello, I'm",
    "Afolayan Iseoluwa",
    "(Tolu)",
    "I build reliable backend systems (ledgers, job queues, automation) and the interfaces on top of them.",
    "Recruit this character",
    "Email me about a role",
    "See projects",
  ]) {
    assert.ok(t.includes(s), s);
  }
  assert.match(h, /<h1[\s\S]*Afolayan Iseoluwa[\s\S]*<\/h1>/);
  assert.match(h, /href="mailto:[^"]+"/);
  assert.match(h, /href="#projects"/);
  assert.doesNotMatch(text, /CURRENTLY BUILDING/);
});

test("hero puts the waving figure in front of a giant decorative name", () => {
  const h = section("about");
  assert.match(h, /<p[^>]*aria-hidden="true"[^>]*>TOLU<\/p>/);
  const wave = h.match(/<img[^>]*data-pose="wave"[^>]*>/)?.[0];
  assert.ok(wave, "no wave pose in the hero");
  assert.match(wave, /loading="eager"/);
  const t = textOf(h);
  for (const s of ["thinks in queues and transactions", "ships weekly", "fixes what breaks at 2am"]) {
    assert.ok(t.includes(s), s);
  }
  assert.doesNotMatch(html, /sketch-(draw|fill)|wireframe/i);
});

test("poses are decorative, sized, and lazy below the fold", () => {
  const imgs = html.match(/<img[^>]*data-pose="[^"]+"[^>]*>/g) ?? [];
  assert.ok(imgs.length >= 7, `only ${imgs.length} poses`);
  for (const img of imgs) {
    assert.match(img, /alt=""/);
    assert.match(img, /aria-hidden="true"/);
    assert.match(img, /\swidth="\d+"/);
    assert.match(img, /\sheight="\d+"/);
    if (!/data-pose="wave"/.test(img)) assert.match(img, /loading="lazy"/);
  }
});

test("backstory is a timeline of the existing roles", () => {
  const b = section("backstory");
  assert.match(b, /<ol/);
  const t = textOf(b);
  for (const s of ["Backstory", "experience log", "Lead Developer", "Ibadan Digital Academy"]) {
    assert.ok(t.includes(s), s);
  }
  assert.ok(!html.includes('id="experience"'));
});

const diagramLabels = {
  "Financial Ledger": ["Payment events", "Transaction state", "Ledger", "Scheduled reconciliation", "Reversal credits"],
  "Internal Workflow": ["Shared tasks", "Certificates", "Image layouts & mockups", "Reports"],
  "Educational Content": ["Legacy framework (refactored)", "Publishing pipeline", "Layouts"],
  "Enterprise Request": ["Request form (Power Apps)", "SharePoint records", "Multi-stage email routing"],
};

// True when the element's class list has a bare `hidden` (shown only from a breakpoint up).
const hiddenOnPhone = (tag) => /class="(?:[^"]*\s)?hidden[\s"]/.test(tag);

test("every project has a diagram built only from its published steps", () => {
  const p = section("projects");
  const t = textOf(p);
  assert.match(t, /sketchbook pages/);
  // A diagram may have a phone and a desktop variant; one of each per project is visible.
  const svgs = p.match(/<svg[^>]*role="img"[^>]*>/g) ?? [];
  const onPhone = svgs.filter((s) => !hiddenOnPhone(s));
  const onDesktop = svgs.filter((s) => !/sm:hidden/.test(s));
  assert.equal(onPhone.length, 4);
  assert.equal(onDesktop.length, 4);
  for (const labels of Object.values(diagramLabels)) {
    for (const l of labels) assert.ok(t.includes(l), l);
  }
  for (const svg of p.match(/<svg[^>]*role="img"[^>]*>/g) ?? []) {
    assert.match(svg, /viewBox=/);
    assert.doesNotMatch(svg, /\swidth="\d/);
  }
});

test("one project per band, each with its own diagram and pose", () => {
  const p = section("projects");
  const bands = p.split(/<article\b/).slice(1);
  assert.equal(bands.length, 4);
  for (const band of bands) {
    const svgs = band.match(/<svg[^>]*role="img"[^>]*>/g) ?? [];
    assert.equal(svgs.filter((s) => !hiddenOnPhone(s)).length, 1);
    assert.equal((band.match(/data-pose="/g) ?? []).length, 1);
    assert.equal((band.match(/<h3[\s>]/g) ?? []).length, 1);
  }
  // featured project comes first
  assert.match(bands[0], /data-featured="true"[\s\S]*Financial Ledger/);
});

test("add to party panel has recruit button and labelled sticker links", () => {
  const c = section("party");
  const t = textOf(c);
  for (const s of [
    "Add to party?",
    "Need a backend developer on your team? I'm open to roles.",
    "Recruit this character",
    "Email",
    "GitHub",
    "LinkedIn",
    "WhatsApp",
  ]) {
    assert.ok(t.includes(s), s);
  }
  assert.ok(!html.includes('id="contact"'));
});

test("every mailto uses the one socialLinks email", () => {
  const mailtos = new Set([...html.matchAll(/href="(mailto:[^"]+)"/g)].map((m) => m[1]));
  assert.equal(mailtos.size, 1);
});

const sections = ["profile", "projects", "abilities", "backstory", "education", "party"];

test("header links to every section, in page order", () => {
  const header = html.slice(html.indexOf("<header"), html.indexOf("</header>"));
  const nav = header.slice(header.indexOf("<nav"), header.indexOf("</nav>"));
  const hrefs = [...nav.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(hrefs, sections);
  const positions = sections.map((id) => html.indexOf(`id="${id}"`));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(textOf(header), /Add to party/);
  assert.match(header, /href="mailto:/);
});

test("top strip sits above the header", () => {
  const strip = html.slice(0, html.indexOf("<header"));
  const t = textOf(strip);
  for (const s of ["Available for work", "Based in Nigeria", "Open to backend roles"]) {
    assert.ok(t.includes(s), s);
  }
});

test("sections are bands that clear the sticky header and snap gently", () => {
  for (const id of sections) {
    const open = html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>`))?.[0] ?? "";
    assert.match(open, /class="[^"]*\bband\b/, id);
  }
  assert.match(css, /\.band\{[^}]*scroll-margin-top/);
  assert.match(css, /scroll-snap-type:y proximity/);
  assert.doesNotMatch(css, /scroll-snap-type:[^;}]*mandatory/);
});

test("peek figure is a button that opens a labelled contact dialog", () => {
  const button = html.match(/<button[^>]*aria-controls="contact-popover"[^>]*>/)?.[0];
  assert.ok(button, "no peek button");
  assert.match(button, /aria-expanded="false"/);
  assert.match(button, /aria-label="[^"]+"/);
  const start = html.indexOf('id="contact-popover"');
  assert.ok(start >= 0, "no popover");
  const open = html.slice(html.lastIndexOf("<div", start), html.indexOf(">", start));
  assert.match(open, /role="dialog"/);
  const labelId = open.match(/aria-labelledby="([^"]+)"/)?.[1];
  assert.ok(labelId && html.includes(`id="${labelId}"`), "dialog label missing");
  const body = html.slice(start, html.indexOf("</button>", html.indexOf("peek.webp", start)));
  const t = textOf(body);
  for (const s of ["Email", "Copy", "GitHub", "LinkedIn", "WhatsApp", "Recruit this character"]) {
    assert.ok(t.includes(s), s);
  }
  assert.match(body, /href="mailto:/);
});

test("small text meets contrast and focus is visible", () => {
  assert.doesNotMatch(html, /text-orange-dark/);
  // orange text only on the giant decorative name
  for (const tag of html.match(/<[^>]*class="[^"]*\btext-orange\b[^"]*"[^>]*>/g) ?? []) {
    assert.match(tag, /aria-hidden="true"/);
  }
  assert.match(css, /:focus-visible\{outline:3px solid/);
});

test("diagram labels stay readable on phones", () => {
  // At 360px the featured diagram gets ~252px of width. A viewBox wider than
  // 360 units shrinks 12-14px labels below ~9px, so phone-visible diagrams
  // must be at most 360 units wide.
  const svgs = section("projects").match(/<svg[^>]*role="img"[^>]*>/g) ?? [];
  for (const svg of svgs.filter((s) => !hiddenOnPhone(s))) {
    const width = Number(svg.match(/viewBox="0 0 (\d+)/)[1]);
    assert.ok(width <= 360, `phone-visible diagram is ${width} units wide`);
  }
});

test("diagram labels use readable font sizes", () => {
  const sizes = [...section("projects").matchAll(/<text[^>]*font-size="(\d+)"/g)].map((m) => Number(m[1]));
  assert.ok(sizes.length > 0);
  for (const size of sizes) assert.ok(size >= 12, `font-size ${size}`);
  assert.ok(sizes.filter((n) => n >= 14).length >= sizes.length / 2, "node labels below 14");
});

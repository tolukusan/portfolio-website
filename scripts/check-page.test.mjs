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

test("turnaround is an anonymous wireframe sketch", () => {
  const h = section("about");
  const label = h.match(/role="img" aria-label="([^"]+)"/)?.[1] ?? "";
  assert.match(label, /wireframe/i);
  assert.doesNotMatch(label, /Tolu|Iseoluwa|Afolayan/);
  const t = textOf(h);
  for (const s of [
    "Front",
    "Three-quarter",
    "Side",
    "turnaround · rough · 1:1",
    "thinks in queues and transactions",
    "ships weekly",
    "fixes what breaks at 2am",
  ]) {
    assert.ok(t.includes(s), s);
  }
  assert.doesNotMatch(t, /character design in progress/i);
});

test("turnaround svg scales with its container", () => {
  const svg = section("about").match(/<svg[^>]*role="img"[^>]*>/)?.[0];
  assert.ok(svg, "no turnaround svg");
  assert.match(svg, /viewBox=/);
  assert.doesNotMatch(svg, /\swidth="\d/);
});

test("draw-in animation is turnaround-only and respects reduced motion", () => {
  const outside = html.replace(section("about"), "");
  assert.doesNotMatch(outside, /sketch-(draw|fill)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce\)[^}]*\{[^}]*\.sketch-draw/);
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

test("featured project comes first and spans the row", () => {
  const p = section("projects");
  assert.ok(p.indexOf("Financial Ledger") < p.indexOf("Internal Workflow"));
  assert.match(p, /data-featured="true"/);
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

const tabs = ["profile", "abilities", "backstory", "projects", "education", "party"];

test("header has folder tabs for every section, in order", () => {
  const header = html.slice(html.indexOf("<header"), html.indexOf("</header>"));
  const hrefs = [...header.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(hrefs, tabs);
  assert.match(textOf(header), /Add to party/);
  assert.doesNotMatch(html, /aria-label="Section navigation"/);
});

test("tab targets clear the sticky header", () => {
  for (const id of tabs) {
    const open = html.match(new RegExp(`<section[^>]*id="${id}"[^>]*>`))?.[0] ?? "";
    assert.match(open, /scroll-mt-32/, id);
  }
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

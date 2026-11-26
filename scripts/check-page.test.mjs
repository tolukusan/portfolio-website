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

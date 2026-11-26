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

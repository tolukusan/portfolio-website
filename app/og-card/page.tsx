// Development-only: renders the 1200x630 link-preview card, with the site's
// own fonts, so scripts/make-og-image.sh can screenshot it into
// app/opengraph-image.png. It 404s in production.
import { notFound } from "next/navigation";
import { hero } from "@/lib/data";

export const metadata = { robots: { index: false } };

export default function OgCard() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div
      className="relative overflow-hidden bg-cream"
      style={{ width: 1200, height: 630 }}
    >
      <p
        aria-hidden="true"
        className="absolute inset-x-0 text-center font-display font-bold leading-none tracking-[-0.04em] text-orange"
        style={{ top: 70, fontSize: 380 }}
      >
        TOLU
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/character/cut/wave.webp"
        alt=""
        className="absolute"
        style={{ height: 520, bottom: 96, left: 640 }}
      />

      <div
        className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t-[6px] border-ink bg-ink px-14 text-cream"
        style={{ height: 104 }}
      >
        <p className="font-display text-[40px] font-bold leading-none">
          {hero.name} <span className="text-cream/70">({hero.nickname})</span>
        </p>
        <p className="font-mono text-[26px] uppercase tracking-wider text-yellow">
          Backend Developer
        </p>
      </div>
    </div>
  );
}

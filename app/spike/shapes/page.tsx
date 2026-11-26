// SPIKE (throwaway): Tolu's sketch built from primitives, styled after the
// Stitch mockups (warm grey, giant black word behind, one orange accent).
import ShapeFigure, { type Outfit } from "@/components/spike/ShapeFigure";

export const metadata = { robots: { index: false } };

const outfits = ["sky", "charcoal", "split"] as const;

export default function ShapesSpike({
  searchParams,
}: {
  searchParams: { outfit?: string; word?: string };
}) {
  const outfit = (outfits as readonly string[]).includes(searchParams.outfit ?? "")
    ? (searchParams.outfit as Outfit)
    : "sky";
  const word = (searchParams.word ?? "TOLU").slice(0, 10).toUpperCase();

  return (
    <main className="min-h-screen bg-[#E7E4DF]">
      <section className="relative mx-auto h-[100svh] max-h-[900px] min-h-[600px] w-full max-w-6xl overflow-hidden">
        {/* Giant word behind the figure, at torso height like the mockups */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[34%] select-none text-center font-display font-bold leading-none tracking-tight text-ink"
          style={{ fontSize: "min(30vw, 320px)" }}
        >
          {word}
        </p>

        <ShapeFigure outfit={outfit} />

        <div className="pointer-events-none absolute left-6 top-6 font-mono text-xs uppercase leading-relaxed text-ink/60">
          Backend-leaning
          <br />
          full-stack developer
        </div>

        <div className="absolute bottom-6 left-6">
          <p className="font-mono text-xs uppercase text-ink/60">Hello, I&apos;m</p>
          <h1 className="font-display text-2xl font-bold">
            Afolayan Iseoluwa <span className="text-ink/50">(Tolu)</span>
          </h1>
        </div>
      </section>
    </main>
  );
}

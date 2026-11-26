// SPIKE (throwaway): GAZU-style hero, a 3D figure turning in front of a giant
// word. Not linked from the site.
import Header from "@/components/Header";
import HeroFigure, { type Suit } from "@/components/spike/HeroFigure";

const suits = ["ink", "orange", "yellow", "sky"] as const;
import { emailHref, hero } from "@/lib/data";

export const metadata = { robots: { index: false } };

const buttonBase =
  "inline-flex items-center justify-center rounded-brutal-sm border-3 border-ink px-5 py-3 font-display font-bold shadow-brutal transition-all hover:-translate-y-0.5 hover:shadow-brutal-lg";

export default function SpikePage({
  searchParams,
}: {
  searchParams: { suit?: string };
}) {
  const suit = (suits as readonly string[]).includes(searchParams.suit ?? "") ? (searchParams.suit as Suit) : "ink";
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-6">
        <section className="relative overflow-hidden rounded-brutal border-3 border-ink bg-cream shadow-brutal-lg">
          <div className="relative h-[560px] sm:h-[640px]">
            {/* Giant word behind the figure */}
            <p
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[18%] select-none text-center font-display text-[34vw] font-bold leading-none tracking-tight text-ink lg:text-[300px]"
            >
              TOLU
            </p>

            <HeroFigure suit={suit} />

            <div className="pointer-events-none absolute left-6 top-6 max-w-[14rem] font-mono text-xs uppercase leading-relaxed text-ink/70">
              Backend-leaning
              <br />
              full-stack developer
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase text-orange-dark">{hero.greeting}</p>
                <h1 className="font-display text-2xl font-bold sm:text-3xl">
                  {hero.name} <span className="text-ink/60">({hero.nickname})</span>
                </h1>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a href={emailHref} className={`${buttonBase} bg-orange text-ink`}>
                    {hero.recruitLabel}
                  </a>
                  <a href="/#projects" className={`${buttonBase} bg-white text-ink`}>
                    {hero.projectsLabel}
                  </a>
                </div>
              </div>
              <p className="hidden text-right font-hand text-xl text-ink/70 sm:block">
                ships weekly
                <br />
                fixes what breaks at 2am
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

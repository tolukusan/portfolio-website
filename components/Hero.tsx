import { emailHref, hero, heroNotes } from "@/lib/data";
import LiquidWord from "./LiquidWord";
import TurnablePose from "./TurnablePose";

export const buttonBase =
  "inline-flex items-center justify-center rounded-brutal-sm border-3 border-ink px-5 py-3 font-display font-bold text-ink shadow-brutal transition-all hover:-translate-y-0.5 hover:shadow-brutal-lg";

// GAZU-style hero: a giant word across the band, the figure standing in front
// of it, copy in the corners. On phones the copy stacks above the figure.
export default function Hero() {
  return (
    <section
      id="about"
      // Not a snap point: snapping to it would hide the top strip on load.
      className="relative scroll-mt-32 overflow-hidden border-b-3 border-ink bg-cream"
    >
      <div className="relative mx-auto grid max-w-7xl grid-rows-[auto_1fr_auto] px-4 pt-8 sm:pt-10 lg:h-[calc(100svh-6.5rem)] lg:min-h-[640px] lg:max-h-[920px] lg:px-8 lg:pb-10">
        {/* top-left: who, and what he builds */}
        <div className="relative z-10 max-w-sm lg:max-w-[min(22rem,32vw)]">
          <h1 className="font-display text-3xl font-bold leading-[1.05] sm:text-4xl">
            {hero.name}{" "}
            <span className="text-ink/60">({hero.nickname})</span>
          </h1>
          <p className="mt-3 text-sm text-ink/80 sm:text-base">{hero.pitch}</p>
        </div>

        {/* middle: the giant word with the figure in front of it */}
        <div className="relative -mx-4 mt-6 h-[360px] sm:h-[440px] lg:static lg:mx-0 lg:mt-0 lg:h-auto">
          <LiquidWord
            text="TOLU"
            className="pointer-events-none absolute inset-x-0 top-[12%] select-none text-center font-display font-bold leading-none tracking-[-0.04em] lg:top-[30%]"
            style={{ fontSize: "clamp(8rem, 31vw, 30rem)" }}
          />
          <TurnablePose
            pose="wave"
            className="absolute bottom-0 left-1/2 h-full -translate-x-1/2 lg:h-[94%]"
          />
        </div>

        {/* bottom row: actions left, a note right */}
        <div className="relative z-10 -mx-4 flex flex-col gap-6 border-t-3 border-ink bg-cream px-4 py-6 lg:mx-0 lg:flex-row lg:items-end lg:justify-between lg:border-0 lg:bg-transparent lg:p-0">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex flex-col gap-1.5">
              <a href={emailHref} className={`${buttonBase} bg-orange`}>
                {hero.recruitLabel}
              </a>
              <span className="font-mono text-xs text-ink/70">
                {hero.recruitHint}
              </span>
            </div>
            <a href="#projects" className={`${buttonBase} bg-cream`}>
              {hero.projectsLabel}
            </a>
          </div>

          <ul className="flex flex-col gap-0.5 lg:max-w-[16rem] lg:text-right">
            {heroNotes.map((note) => (
              <li key={note} className="font-hand text-xl leading-tight text-ink/80">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

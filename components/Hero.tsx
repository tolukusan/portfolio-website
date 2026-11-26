import { emailHref, hero } from "@/lib/data";
import Turnaround from "./Turnaround";

const buttonBase =
  "inline-flex items-center justify-center rounded-brutal-sm border-3 border-ink px-5 py-3 font-display font-bold shadow-brutal transition-all hover:-translate-y-0.5 hover:shadow-brutal-lg";

export default function Hero() {
  return (
    <section id="about" className="relative scroll-mt-32">
      <span className="absolute -top-4 left-6 z-10 rounded-full border-3 border-ink bg-orange px-4 py-1 font-mono text-xs font-bold text-ink shadow-brutal-sm">
        {hero.tab}
      </span>

      <div className="grid gap-8 rounded-brutal border-3 border-ink bg-white p-6 pt-10 shadow-brutal-lg sm:p-8 sm:pt-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase text-orange-dark">
            {hero.greeting}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {hero.name}{" "}
            <span className="text-ink/60">({hero.nickname})</span>
          </h1>
          <p className="mt-2 font-display text-xl text-ink/70 sm:text-2xl">
            {hero.role}
          </p>
          <p className="mt-4 max-w-xl text-sm text-ink/80 sm:text-base">
            {hero.pitch}
          </p>

          <div className="mt-6 flex flex-wrap items-start gap-4">
            <div className="flex flex-col gap-1.5">
              <a href={emailHref} className={`${buttonBase} bg-orange text-ink`}>
                {hero.recruitLabel}
              </a>
              <span className="font-mono text-xs text-ink/60">
                {hero.recruitHint}
              </span>
            </div>
            <a href="#projects" className={`${buttonBase} bg-cream text-ink`}>
              {hero.projectsLabel}
            </a>
          </div>
        </div>

        <Turnaround />
      </div>
    </section>
  );
}

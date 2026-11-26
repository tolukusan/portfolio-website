// SPIKE (throwaway): the redesigned page with Tolu's drawn character placed
// in it: hero figure in front of a giant name, plus poses pinned to cards.
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactPanel from "@/components/ContactPanel";
import Footer from "@/components/Footer";
import CharacterPins from "@/components/spike/CharacterPins";
import { emailHref, hero } from "@/lib/data";

export const metadata = { robots: { index: false } };

const buttonBase =
  "inline-flex items-center justify-center rounded-brutal-sm border-3 border-ink px-5 py-3 font-display font-bold shadow-brutal transition-all hover:-translate-y-0.5 hover:shadow-brutal-lg";

function SpikeHero() {
  return (
    <section id="about" className="relative scroll-mt-32">
      <span className="absolute -top-4 left-6 z-10 rounded-full border-3 border-ink bg-orange px-4 py-1 font-mono text-xs font-bold text-ink shadow-brutal-sm">
        {hero.tab}
      </span>
      <div className="grid grid-cols-1 overflow-hidden rounded-brutal border-3 border-ink bg-white shadow-brutal-lg lg:grid-cols-[1fr_1.1fr]">
        <div className="p-6 pt-10 sm:p-8 sm:pt-12 lg:self-center">
          <p className="font-mono text-xs uppercase text-orange-dark">{hero.greeting}</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {hero.name} <span className="text-ink/60">({hero.nickname})</span>
          </h1>
          <p className="mt-2 font-display text-xl text-ink/70 sm:text-2xl">{hero.role}</p>
          <p className="mt-4 max-w-xl text-sm text-ink/80 sm:text-base">{hero.pitch}</p>
          <div className="mt-6 flex flex-wrap items-start gap-4">
            <div className="flex flex-col gap-1.5">
              <a href={emailHref} className={`${buttonBase} bg-orange text-ink`}>
                {hero.recruitLabel}
              </a>
              <span className="font-mono text-xs text-ink/60">{hero.recruitHint}</span>
            </div>
            <a href="#projects" className={`${buttonBase} bg-cream text-ink`}>
              {hero.projectsLabel}
            </a>
          </div>
        </div>

        {/* Giant name behind the character */}
        <div className="relative h-[380px] border-t-3 border-ink bg-cream sm:h-[460px] lg:h-auto lg:min-h-[520px] lg:border-l-3 lg:border-t-0">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[22%] select-none text-center font-display font-bold leading-none tracking-tight text-ink"
            style={{ fontSize: "min(26vw, 230px)" }}
          >
            TOLU
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/character/cut/wave.webp"
            alt=""
            className="absolute bottom-0 left-1/2 h-[94%] w-auto -translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}

export default function CharacterSpike() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="relative flex-1">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 lg:gap-14 lg:px-6 lg:py-12">
          <SpikeHero />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <ProfileCard />
            <SkillsSection />
          </div>
          <div className="lg:mt-16">
            <ExperienceSection />
          </div>
          <ProjectsSection />
          <EducationSection />
          <ContactPanel />
        </main>
        <CharacterPins />
      </div>

      {/* Peeks in from the right edge of the screen; jumps to contact. */}
      <a
        href="#party"
        aria-label="Say hi: jump to contact"
        className="fixed bottom-0 right-0 z-40 hidden h-[190px] translate-x-[18px] transition-transform hover:translate-x-0 lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/character/cut/peek.webp" alt="" className="h-full w-auto" />
      </a>

      <Footer />
    </div>
  );
}

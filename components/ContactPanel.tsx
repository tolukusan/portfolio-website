import { emailHref, hero, party, socialLinks } from "@/lib/data";
import { iconMap } from "./icons";
import Pose from "./Pose";

export default function ContactPanel() {
  return (
    <section
      id="party"
      className="band on-dark border-b-3 border-ink bg-ink text-cream"
    >
      <div className="mx-auto grid min-h-[min(90svh,820px)] max-w-7xl grid-cols-1 gap-x-16 px-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:px-8">
        <div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24">
          <h2 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
            {party.heading}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-cream/90">{party.line}</p>

          <a
            href={emailHref}
            className="mt-8 inline-flex w-fit items-center justify-center rounded-brutal-sm border-3 border-ink bg-orange px-6 py-4 font-display text-lg font-bold text-ink shadow-brutal-white transition-all hover:-translate-y-0.5"
          >
            {hero.recruitLabel}
          </a>

          <ul className="mt-10 flex flex-wrap gap-3">
            {socialLinks.map((link, i) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              const isExternal = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`flex min-h-11 items-center gap-2 rounded-brutal-sm border-3 border-ink bg-cream px-4 font-display text-sm font-bold text-ink shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:rotate-0 ${
                      i % 2 === 0 ? "-rotate-1" : "rotate-1"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* points left, back at the Recruit button */}
        <div className="flex items-end justify-center">
          <Pose
            pose="point"
            flip
            className="h-[300px] sm:h-[360px] lg:h-[min(540px,70svh)]"
          />
        </div>
      </div>
    </section>
  );
}

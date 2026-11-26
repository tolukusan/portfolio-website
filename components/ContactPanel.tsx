import { emailHref, hero, party, socialLinks } from "@/lib/data";
import { iconMap } from "./icons";

export default function ContactPanel() {
  return (
    <section
      id="party"
      className="scroll-mt-24 rounded-brutal border-3 border-ink bg-ink p-6 text-cream shadow-brutal sm:p-8"
    >
      <h2 className="font-display text-2xl font-bold sm:text-3xl">
        {party.heading}
      </h2>
      <p className="mt-2 text-sm text-cream/90 sm:text-base">{party.line}</p>

      <a
        href={emailHref}
        className="mt-5 inline-flex items-center justify-center rounded-brutal-sm border-3 border-ink bg-orange px-5 py-3 font-display font-bold text-ink shadow-brutal-white transition-all hover:-translate-y-0.5"
      >
        {hero.recruitLabel}
      </a>

      <ul className="mt-6 flex flex-wrap gap-3">
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
    </section>
  );
}

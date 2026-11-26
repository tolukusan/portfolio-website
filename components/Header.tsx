import { emailHref, hero, navSections, topStrip } from "@/lib/data";

export default function Header() {
  return (
    <>
      {/* Thin ink strip; scrolls away, only the header below sticks. */}
      <div className="on-dark bg-ink px-4 py-2 text-cream">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider sm:text-xs">
          {topStrip.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i === 0 && (
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-mint motion-safe:animate-pulse"
                />
              )}
              {i > 0 && <span aria-hidden="true">·</span>}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <header className="sticky top-0 z-50 border-b-3 border-ink bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 px-4 py-3 lg:grid-cols-[auto_1fr_auto] lg:px-8 xl:grid-cols-[1fr_auto_1fr]">
          <nav
            aria-label="Sections"
            className="order-3 col-span-2 -mx-4 lg:order-none lg:col-span-1 lg:mx-0"
          >
            <ul className="flex gap-1 overflow-x-auto px-4 py-1 [scrollbar-width:none] lg:gap-x-4 lg:px-0 [&::-webkit-scrollbar]:hidden">
              {navSections.map((section) => (
                <li key={section.id} className="shrink-0">
                  <a
                    href={`#${section.id}`}
                    className="block whitespace-nowrap rounded-full px-2.5 py-1.5 font-mono text-xs uppercase tracking-wide text-ink underline-offset-4 hover:underline focus-visible:outline-offset-[-3px] lg:px-1"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#about"
            className="justify-self-start font-display text-lg font-bold tracking-tight sm:text-xl lg:justify-self-center"
          >
            Afolayan Iseoluwa
          </a>

          <a
            href={emailHref}
            className="justify-self-end rounded-brutal-sm border-3 border-ink bg-orange px-3 py-1.5 font-display text-sm font-bold text-ink shadow-brutal-sm transition-transform hover:-translate-y-0.5 sm:px-4"
          >
            <span className="sm:hidden lg:inline xl:hidden">Recruit</span>
            <span className="hidden sm:inline lg:hidden xl:inline">{hero.recruitLabel}</span>
          </a>
        </div>
      </header>
    </>
  );
}

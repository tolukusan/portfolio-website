import { emailHref, hero, navSections } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-3 border-ink bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 px-4 py-3 lg:px-8">
        <nav
          aria-label="Sections"
          className="-ml-4 min-w-0 lg:ml-0"
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
          href={emailHref}
          className="justify-self-end rounded-brutal-sm border-3 border-ink bg-orange px-3 py-1.5 font-display text-sm font-bold text-ink shadow-brutal-sm transition-transform hover:-translate-y-0.5 sm:px-4"
        >
          <span className="lg:hidden">Recruit</span>
          <span className="hidden lg:inline">{hero.recruitLabel}</span>
        </a>
      </div>
    </header>
  );
}

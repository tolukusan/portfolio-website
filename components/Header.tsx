import { navSections } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-3 border-ink bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-yellow bg-ink font-display text-sm font-bold text-yellow">
            AI
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold sm:text-lg">
              Afolayan Iseoluwa
            </span>
            <span className="hidden font-mono text-xs text-cream/70 sm:block">
              Backend-leaning Full-Stack Developer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border-2 border-mint bg-ink px-3 py-1.5 font-mono text-xs text-mint">
          <span className="h-2 w-2 rounded-full bg-mint motion-safe:animate-pulse" />
          <span className="hidden sm:inline">AVAILABLE FOR WORK</span>
          <span className="sm:hidden">OPEN</span>
        </div>
      </div>

      {/* Folder tabs sit flush on the header's bottom edge. Only this row scrolls sideways. */}
      <nav aria-label="Sections" className="mx-auto max-w-6xl px-4 lg:px-6">
        <ul className="-mb-[3px] mt-2 flex pt-1 gap-1 overflow-x-auto">
          {navSections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className={`block whitespace-nowrap rounded-t-brutal-sm border-3 border-b-0 border-ink px-3 py-1.5 font-display text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 ${
                  section.id === "party" ? "bg-orange" : "bg-cream"
                }`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

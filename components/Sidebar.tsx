import { navSections } from "@/lib/data";

export default function Sidebar() {
  return (
    <nav
      aria-label="Section navigation"
      className="lg:sticky lg:top-24 lg:h-fit lg:w-56 lg:shrink-0"
    >
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {navSections.map((section) => (
          <li key={section.id} className="shrink-0 lg:shrink lg:w-full">
            <a
              href={`#${section.id}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-brutal-sm border-3 border-ink bg-cream px-4 py-2.5 font-display text-sm font-bold shadow-brutal-sm transition-all hover:-translate-y-0.5 hover:shadow-brutal lg:w-full"
            >
              <span className="font-mono text-xs text-orange">
                {section.number}
              </span>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

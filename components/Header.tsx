export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b-3 border-ink bg-ink px-4 py-3 text-cream sm:px-6">
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
        <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
        <span className="hidden sm:inline">AVAILABLE FOR WORK</span>
        <span className="sm:hidden">OPEN</span>
      </div>
    </header>
  );
}

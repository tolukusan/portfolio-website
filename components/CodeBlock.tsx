export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className="rounded-brutal-sm border-3 border-ink bg-ink">
      <div className="flex items-center gap-1.5 border-b-3 border-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-orange" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint" />
        <span className="ml-2 font-mono text-xs text-cream/60">
          stack.config.ts
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-mint sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

import CodeBlock from "./CodeBlock";
import { codeSnippet } from "@/lib/data";

export default function FeaturedPanel() {
  return (
    <section id="about" className="relative scroll-mt-24">
      {/* Corner tab label, mirrors the reference image's "HOUR 2" tab */}
      <span className="absolute -top-4 left-6 z-10 rounded-full border-3 border-ink bg-orange px-4 py-1 font-mono text-xs font-bold text-ink shadow-brutal-sm">
        CURRENTLY BUILDING
      </span>

      <div className="rounded-brutal border-3 border-ink bg-white p-6 pt-10 shadow-brutal-lg sm:p-8 sm:pt-12">
        <p className="font-mono text-xs text-orange-dark">
          HELLO, I&apos;M
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Afolayan Iseoluwa
          <span className="block text-2xl text-ink/70 sm:text-3xl">
            backend-leaning full-stack developer.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-ink/80 sm:text-base">
          Lead Developer at Ibadan Digital Academy. I build reliable
          backend systems and the full-stack products around them &mdash; from
          fintech savings platforms to internal tooling.
        </p>

        <div className="mt-6">
          <CodeBlock code={codeSnippet} />
        </div>
      </div>
    </section>
  );
}

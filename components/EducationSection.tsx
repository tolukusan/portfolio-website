export default function EducationSection() {
  return (
    <section
      id="education"
      className="scroll-mt-24 rounded-brutal border-3 border-ink bg-white p-6 shadow-brutal sm:p-8"
    >
      <h2 className="font-display text-2xl font-bold">Education</h2>
      <div className="mt-5 rounded-brutal-sm border-3 border-ink bg-cream p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold">
            BSc Computer Science
          </h3>
          <span className="font-mono text-xs text-ink/60">July 2025</span>
        </div>
        <p className="font-mono text-sm text-orange-dark">
          Covenant University
        </p>
        <p className="mt-2 text-sm text-ink/80">2nd Class Upper</p>
      </div>
    </section>
  );
}

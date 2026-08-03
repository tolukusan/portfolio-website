import { experience } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 rounded-brutal border-3 border-ink bg-white p-6 shadow-brutal sm:p-8"
    >
      <h2 className="font-display text-2xl font-bold">Experience</h2>
      <div className="mt-5 flex flex-col gap-4">
        {experience.map((role) => (
          <div
            key={role.role}
            className="rounded-brutal-sm border-3 border-ink bg-cream p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-bold">{role.role}</h3>
              <span className="font-mono text-xs text-ink/60">
                {role.period}
              </span>
            </div>
            <p className="font-mono text-sm text-orange-dark">{role.org}</p>
            <p className="mt-2 text-sm text-ink/80">{role.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

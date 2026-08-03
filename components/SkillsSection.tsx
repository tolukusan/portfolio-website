import { skillGroups } from "@/lib/data";

const toneClasses = {
  sky: "bg-sky",
  mint: "bg-mint",
} as const;

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 rounded-brutal border-3 border-ink bg-white p-6 shadow-brutal sm:p-8"
    >
      <h2 className="font-display text-2xl font-bold">Skills &amp; Stack</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="font-mono text-xs uppercase tracking-wide text-ink/50">
              {group.label}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className={`tag-badge ${toneClasses[group.tone]}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

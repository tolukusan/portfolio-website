import { codeSnippet, skillGroups } from "@/lib/data";
import CodeBlock from "./CodeBlock";
import SectionHeading from "./SectionHeading";

type Tone = (typeof skillGroups)[number]["tone"];

const swatchClasses: Record<Tone, string> = {
  yellow: "bg-yellow",
  orange: "bg-orange",
  mint: "bg-mint",
  sky: "bg-sky",
};

export default function SkillsSection() {
  return (
    <section
      id="abilities"
      className="scroll-mt-32 rounded-brutal border-3 border-ink bg-white p-6 shadow-brutal sm:p-8"
    >
      <SectionHeading title="Abilities" note="colour notes" />

      <div className="mt-5 flex flex-col gap-4">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
              {group.label}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  data-tone={group.tone}
                  className="inline-flex items-center gap-2 rounded-brutal-sm border-3 border-ink bg-white py-1 pl-1.5 pr-3 font-mono text-xs font-medium"
                >
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 rounded-sm border-2 border-ink ${swatchClasses[group.tone]}`}
                  />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <CodeBlock code={codeSnippet} />
      </div>
    </section>
  );
}

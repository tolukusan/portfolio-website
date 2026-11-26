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

// The light feature strip: one column per skill group.
export default function SkillsSection() {
  return (
    <section id="abilities" className="band border-b-3 border-ink bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8 lg:py-32">
        <SectionHeading title="Abilities" note="colour notes" />

        <div className="mt-12 grid grid-cols-1 border-y-3 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <div
              key={group.label}
              className={`flex flex-col gap-5 py-8 sm:px-6 ${
                i > 0 ? "border-t-3 border-ink sm:border-t-0" : ""
              } ${i % 2 === 1 ? "sm:border-l-3" : ""} ${
                i >= 2 ? "sm:border-t-3 lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l-3" : ""} ${i === 0 ? "sm:pl-0" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`h-14 w-14 rounded-brutal-sm border-3 border-ink ${swatchClasses[group.tone]}`}
              />
              <h3 className="font-display text-2xl font-bold">{group.label}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    data-tone={group.tone}
                    className="inline-flex items-center gap-2 rounded-brutal-sm border-3 border-ink bg-white py-1 pl-1.5 pr-3 font-mono text-xs font-medium"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-3 w-3 rounded-sm border-2 border-ink ${swatchClasses[group.tone]}`}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl">
          <CodeBlock code={codeSnippet} />
        </div>
      </div>
    </section>
  );
}

import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import SplitBand from "./SplitBand";

export default function ExperienceSection() {
  return (
    <SplitBand
      id="backstory"
      staging={{ pose: "sit", how: "sit", side: "left", flip: true }}
      className="bg-cream"
    >
      <SectionHeading title="Backstory" note="experience log" />
      <ol className="ml-2 mt-10 flex flex-col gap-8 border-l-3 border-ink pl-8">
        {experience.map((role) => (
          <li key={role.role} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[42px] top-2 h-5 w-5 rounded-full border-3 border-ink bg-orange"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-ink/70">
              {role.period}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold">{role.role}</h3>
            <p className="mt-1 font-mono text-sm text-ink">{role.org}</p>
            <ul className="mt-4 flex max-w-xl list-disc flex-col gap-2 pl-5 text-base text-ink/80 marker:text-ink">
              {role.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SplitBand>
  );
}

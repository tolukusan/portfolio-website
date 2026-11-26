import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  return (
    <section
      id="backstory"
      className="scroll-mt-32 rounded-brutal border-3 border-ink bg-white p-6 shadow-brutal sm:p-8"
    >
      <SectionHeading title="Backstory" note="experience log" />
      <ol className="ml-2 mt-5 flex flex-col gap-6 border-l-3 border-ink pl-6">
        {experience.map((role) => (
          <li key={role.role} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[34px] top-5 h-4 w-4 rounded-full border-3 border-ink bg-orange"
            />
            <div className="rounded-brutal-sm border-3 border-ink bg-cream p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-bold">{role.role}</h3>
                <span className="font-mono text-xs text-ink/60">
                  {role.period}
                </span>
              </div>
              <p className="font-mono text-sm text-orange-dark">{role.org}</p>
              <p className="mt-2 text-sm text-ink/80">{role.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

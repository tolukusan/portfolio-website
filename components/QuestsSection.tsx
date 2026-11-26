import { quests } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import SplitBand from "./SplitBand";

// Achievements and teaching, as side quests.
export default function QuestsSection() {
  return (
    <SplitBand
      id="quests"
      staging={{ pose: "wave", how: "stand", side: "right" }}
      className="bg-white"
    >
      <SectionHeading title="Side quests" note="achievements unlocked" />
      <ul className="mt-10 flex flex-col gap-6">
        {quests.map((quest) => (
          <li
            key={quest.title}
            className="rounded-brutal border-3 border-ink bg-cream p-5 shadow-brutal-sm"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-ink/70">
              {quest.year}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold">{quest.title}</h3>
            <p className="mt-2 max-w-xl text-base text-ink/80">{quest.detail}</p>
          </li>
        ))}
      </ul>
    </SplitBand>
  );
}

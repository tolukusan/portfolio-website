import SectionHeading from "./SectionHeading";
import SplitBand from "./SplitBand";

export default function EducationSection() {
  return (
    // training arc: he does a pull-up on the band's top line
    <SplitBand
      id="education"
      staging={{ pose: "hang", how: "hang", side: "right" }}
      className="bg-white"
    >
      <SectionHeading title="Education" note="training arc" />
      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-wider text-ink/70">
          Covenant University
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold">
          BSc Computer Science
        </h3>
        <p className="mt-3 text-base text-ink/80">2nd Class Upper</p>
      </div>
    </SplitBand>
  );
}

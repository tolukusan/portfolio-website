import type { projects } from "@/lib/data";
import { diagrams } from "./diagrams";
import HandNote from "./HandNote";
import AnimatedPose from "./AnimatedPose";
import { type PoseName } from "./Pose";

type Project = (typeof projects)[number];

export type Staging = {
  pose: PoseName;
  // stand: feet on the band's floor line. hang: hands on the band's top line.
  // sit: sitting on a ledge block.
  how: "stand" | "hang" | "sit";
  side: "left" | "right";
  flip?: boolean;
};

// Height of a pose in a split band: in the flow on phones, its own column from lg.
const poseHeight = "h-[300px] sm:h-[360px] lg:h-[min(540px,70svh)]";

export function StagedPose({ staging }: { staging: Staging }) {
  const { pose, how, flip } = staging;

  if (how === "sit") {
    return (
      <div className={`relative mx-auto aspect-[638/1081] ${poseHeight}`}>
        {/* the ledge he sits on; the seat line is at ~59% of the pose */}
        <span
          aria-hidden="true"
          className="absolute -inset-x-[30%] bottom-0 top-[57%] rounded-t-brutal-sm border-3 border-b-0 border-ink bg-white bg-[radial-gradient(#11111133_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <AnimatedPose pose={pose} flip={flip} className="relative h-full" />
      </div>
    );
  }

  return (
    <AnimatedPose
      pose={pose}
      flip={flip}
      className={`mx-auto w-fit ${poseHeight} ${how === "hang" ? "-mt-[3%]" : ""}`}
    />
  );
}

export default function ProjectCard({
  project,
  index,
  total,
  staging,
}: {
  project: Project;
  index: number;
  total: number;
  staging: Staging;
}) {
  const Diagram = diagrams[project.slug];
  const featured = "tab" in project && project.tab === "FEATURED";
  const poseLeft = staging.side === "left";

  return (
    <article
      data-project={project.slug}
      data-featured={featured ? "true" : undefined}
      className={`band border-b-3 border-ink ${index % 2 === 0 ? "bg-cream" : "bg-white"}`}
    >
      <div className="mx-auto grid min-h-[min(100svh,960px)] max-w-7xl grid-cols-1 gap-x-16 px-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:px-8">
        <div
          className={`flex justify-center ${
            staging.how === "hang" ? "items-start" : "items-end pt-12 lg:pt-0"
          } ${
            poseLeft ? "lg:order-first" : "lg:order-last"
          }`}
        >
          <StagedPose staging={staging} />
        </div>

        <div
          className={`flex flex-col justify-center gap-8 py-12 sm:py-16 lg:py-24 ${
            poseLeft ? "" : "lg:order-first"
          }`}
        >
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-ink/70">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {featured && (
              <span className="rounded-full border-3 border-ink bg-yellow px-3 py-0.5 font-bold text-ink">
                {project.tab}
              </span>
            )}
          </div>

          <div className="w-full max-w-xl">
            <Diagram />
          </div>

          <div>
            <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink/70">
              {project.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base text-ink/80">
              {project.description}
            </p>
            <HandNote className="mt-3 block text-xl">{project.note}</HandNote>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="tag-badge bg-sky">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

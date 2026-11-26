import { projects } from "@/lib/data";
import ProjectCard, { type Staging } from "./ProjectCard";
import HandNote from "./HandNote";

// One band per project; the pose alternates sides and does something different
// each time.
const staging: Record<(typeof projects)[number]["slug"], Staging> = {
  // points left at the diagram
  "financial-ledger-reconciliation": { pose: "point", how: "stand", side: "right", flip: true },
  "internal-workflow-automation": { pose: "hang", how: "hang", side: "left" },
  "educational-content-publishing": { pose: "sit", how: "sit", side: "right" },
  "enterprise-request-management": { pose: "thumbs", how: "stand", side: "left" },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="band">
      <div className="bg-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-baseline gap-x-4 gap-y-2 px-4 py-14 sm:py-20 lg:px-8">
          <h2 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
            Projects
          </h2>
          <HandNote className="text-2xl">sketchbook pages</HandNote>
        </div>
      </div>
      <div className="border-t-3 border-ink">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            staging={staging[project.slug]}
          />
        ))}
      </div>
    </section>
  );
}

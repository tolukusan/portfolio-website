import type { projects } from "@/lib/data";
import { diagrams } from "./diagrams";
import HandNote from "./HandNote";

type Project = (typeof projects)[number];

export default function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  const Diagram = diagrams[project.slug];

  return (
    <div
      data-featured={featured ? "true" : undefined}
      className={`relative flex flex-col gap-5 rounded-brutal border-3 border-ink bg-white p-5 shadow-brutal transition-all hover:-translate-y-1 hover:shadow-brutal-lg sm:p-6 ${
        featured ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-6" : ""
      }`}
    >
      {"tab" in project && project.tab && (
        <span className="absolute -top-3 left-5 z-10 rounded-full border-3 border-ink bg-yellow px-3 py-0.5 font-mono text-[10px] font-bold">
          {project.tab}
        </span>
      )}

      <Diagram />

      <div>
        <h3 className="font-display text-xl font-bold">{project.name}</h3>
        <p className="font-mono text-xs text-orange-dark">{project.tagline}</p>
        <p className="mt-3 text-sm text-ink/80">{project.description}</p>
        <HandNote className="mt-2 block">{project.note}</HandNote>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="tag-badge bg-sky">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

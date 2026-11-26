import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

const isFeatured = (project: (typeof projects)[number]) =>
  "tab" in project && project.tab === "FEATURED";

export default function ProjectsSection() {
  const featured = projects.filter(isFeatured);
  const rest = projects.filter((project) => !isFeatured(project));

  return (
    <section id="projects" className="scroll-mt-32">
      <SectionHeading title="Projects" note="sketchbook pages" />
      <div className="mt-5 flex flex-col gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} featured />
        ))}
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

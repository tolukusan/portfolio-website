import { StagedPose, type Staging } from "./ProjectCard";

// A full-width band with content on one side and a pose in its own column.
export default function SplitBand({
  id,
  staging,
  className = "",
  children,
}: {
  id: string;
  staging: Staging;
  className?: string;
  children: React.ReactNode;
}) {
  const poseLeft = staging.side === "left";
  return (
    <section id={id} className={`band border-b-3 border-ink ${className}`.trim()}>
      <div className="mx-auto grid min-h-[min(90svh,860px)] max-w-7xl grid-cols-1 gap-x-16 px-4 lg:grid-cols-2 lg:px-8">
        <div
          className={`flex justify-center ${
            staging.how === "hang" ? "items-start" : "items-end pt-12 lg:pt-0"
          } ${poseLeft ? "lg:order-first" : "lg:order-last"}`}
        >
          <StagedPose staging={staging} />
        </div>
        <div
          className={`flex flex-col justify-center py-12 sm:py-16 lg:py-24 ${
            poseLeft ? "" : "lg:order-first"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

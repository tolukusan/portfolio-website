import { DiagramArrow, DiagramFrame, DiagramNode } from "./parts";

export default function PublishingDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 360 220"
      label="Publishing diagram: the refactored legacy framework feeds the publishing pipeline, which produces layouts"
    >
      <DiagramNode x={15} y={15} w={160} h={52} label={["Legacy framework", "(refactored)"]} />
      <DiagramNode x={185} y={84} w={160} h={52} label={["Publishing", "pipeline"]} highlight />
      <DiagramNode x={15} y={153} w={160} h={52} label="Layouts" />

      <DiagramArrow from={[175, 41]} to={[265, 84]} />
      <DiagramArrow from={[185, 120]} to={[110, 153]} />
    </DiagramFrame>
  );
}

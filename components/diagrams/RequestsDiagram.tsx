import { DiagramArrow, DiagramFrame, DiagramNode } from "./parts";

export default function RequestsDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 360 220"
      label="Request workflow diagram: a Power Apps request form creates SharePoint records, which drive multi-stage email routing"
    >
      <DiagramNode x={15} y={15} w={160} h={52} label={["Request form", "(Power Apps)"]} />
      <DiagramNode x={185} y={84} w={160} h={52} label={["SharePoint", "records"]} highlight />
      <DiagramNode x={15} y={153} w={160} h={52} label={["Multi-stage", "email routing"]} />

      <DiagramArrow from={[175, 41]} to={[265, 84]} />
      <DiagramArrow from={[185, 120]} to={[110, 153]} />
    </DiagramFrame>
  );
}

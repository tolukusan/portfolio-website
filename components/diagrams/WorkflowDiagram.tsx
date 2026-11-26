import { DiagramArrow, DiagramFrame, DiagramNode } from "./parts";

export default function WorkflowDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 360 220"
      label="Workflow diagram: shared tasks feed certificates, image layouts and mockups, and reports"
    >
      <DiagramNode x={15} y={82} w={115} h={56} label={["Shared", "tasks"]} highlight />
      <DiagramNode x={215} y={12} w={130} h={48} label="Certificates" />
      <DiagramNode x={215} y={86} w={130} h={48} label={["Image layouts", "& mockups"]} />
      <DiagramNode x={215} y={160} w={130} h={48} label="Reports" />

      <DiagramArrow from={[130, 100]} to={[215, 36]} />
      <DiagramArrow from={[130, 110]} to={[215, 110]} />
      <DiagramArrow from={[130, 120]} to={[215, 184]} />
    </DiagramFrame>
  );
}

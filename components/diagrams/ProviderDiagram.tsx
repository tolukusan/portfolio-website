import { DiagramArrow, DiagramFrame, DiagramNode, EdgeLabel } from "./parts";

export default function ProviderDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 360 230"
      label="AI provider diagram: an assistant request goes through one provider interface to Model A, which is skipped for Model B on a timeout"
    >
      <DiagramNode x={15} y={15} w={140} h={52} label={["Assistant", "request"]} />
      <DiagramNode x={205} y={15} w={140} h={52} label={["Provider", "interface"]} highlight />
      <DiagramNode x={205} y={140} w={140} h={48} label="Model A" />
      <DiagramNode x={15} y={140} w={140} h={48} label="Model B" />

      <DiagramArrow from={[155, 41]} to={[205, 41]} />
      <DiagramArrow from={[275, 67]} to={[275, 140]} />
      <DiagramArrow from={[205, 164]} to={[155, 164]} tone="orange" />
      <EdgeLabel x={112} y={214}>
        skip on timeout
      </EdgeLabel>
    </DiagramFrame>
  );
}

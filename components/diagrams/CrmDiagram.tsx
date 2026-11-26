import { DiagramArrow, DiagramFrame, DiagramNode } from "./parts";

export default function CrmDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 360 220"
      label="Sales CRM diagram: a spreadsheet CRM becomes a PostgreSQL schema with Row-Level Security, behind a web app with order approvals"
    >
      <DiagramNode x={15} y={15} w={130} h={52} label={["Spreadsheet", "CRM"]} />
      <DiagramNode x={175} y={10} w={170} h={62} label={["PostgreSQL schema", "Row-Level Security"]} highlight />
      <DiagramNode x={175} y={150} w={170} h={48} label="Web app" />
      <DiagramNode x={15} y={150} w={130} h={48} label={["Order", "approvals"]} />

      <DiagramArrow from={[145, 41]} to={[175, 41]} />
      <DiagramArrow from={[260, 72]} to={[260, 150]} />
      <DiagramArrow from={[175, 174]} to={[145, 174]} />
    </DiagramFrame>
  );
}

import { DiagramArrow, DiagramFrame, DiagramNode, EdgeLabel } from "./parts";

// Phone layout: the same nodes and edges stacked in two columns, so labels
// stay readable at 360px.
const phone = {
  viewBox: "0 0 320 330",
  children: (
    <>
      <DiagramNode x={10} y={20} w={140} h={56} label={["Payment", "events"]} />
      <DiagramNode x={10} y={140} w={140} h={56} label={["Transaction", "state"]} />
      <DiagramNode x={10} y={260} w={140} h={56} label="Ledger" highlight />
      <DiagramNode x={180} y={140} w={130} h={56} label={["Scheduled", "reconciliation"]} />
      <DiagramNode x={180} y={260} w={130} h={56} label={["Reversal", "credits"]} />

      <DiagramArrow from={[80, 76]} to={[80, 140]} />
      <DiagramArrow from={[80, 196]} to={[80, 260]} />
      <DiagramArrow from={[245, 140]} to={[150, 48]} tone="orange" />
      <EdgeLabel x={204} y={88}>
        missed events
      </EdgeLabel>
      <DiagramArrow from={[245, 196]} to={[245, 260]} tone="orange" />
    </>
  ),
};

export default function LedgerDiagram() {
  return (
    <DiagramFrame
      viewBox="0 0 560 250"
      phone={phone}
      label="Ledger system diagram: payment events update transaction state and the ledger; scheduled reconciliation catches missed events and issues reversal credits"
    >
      <DiagramNode x={20} y={30} w={130} h={56} label={["Payment", "events"]} />
      <DiagramNode x={215} y={30} w={130} h={56} label={["Transaction", "state"]} />
      <DiagramNode x={410} y={30} w={130} h={56} label="Ledger" highlight />
      <DiagramNode x={20} y={170} w={150} h={56} label={["Scheduled", "reconciliation"]} />
      <DiagramNode x={410} y={170} w={130} h={56} label={["Reversal", "credits"]} />

      <DiagramArrow from={[150, 58]} to={[215, 58]} />
      <DiagramArrow from={[345, 58]} to={[410, 58]} />
      <DiagramArrow from={[85, 170]} to={[85, 86]} tone="orange" />
      <EdgeLabel x={94} y={132}>
        missed events
      </EdgeLabel>
      <DiagramArrow from={[170, 198]} to={[410, 198]} tone="orange" />
    </DiagramFrame>
  );
}

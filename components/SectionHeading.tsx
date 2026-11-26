import HandNote from "./HandNote";

export default function SectionHeading({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {note && <HandNote>{note}</HandNote>}
    </div>
  );
}

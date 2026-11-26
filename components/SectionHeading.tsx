import HandNote from "./HandNote";

export default function SectionHeading({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {note && <HandNote className="text-2xl">{note}</HandNote>}
    </div>
  );
}

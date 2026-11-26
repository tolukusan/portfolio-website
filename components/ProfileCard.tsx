import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b-2 border-dashed border-ink/20 py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="w-32 shrink-0 font-mono text-xs uppercase tracking-wide text-ink/60">
        {term}
      </dt>
      <dd className="font-display font-bold">{children}</dd>
    </div>
  );
}

export default function ProfileCard() {
  const { likes, dislikes } = profile;

  return (
    <section
      id="profile"
      className="relative scroll-mt-32 rounded-brutal border-3 border-ink bg-white p-6 pt-8 shadow-brutal sm:p-8 sm:pt-10 lg:-rotate-1"
    >
      {/* tape strip holding the sheet to the page */}
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 rotate-2 border-2 border-ink bg-yellow/90"
      />

      <SectionHeading title="Profile" note="character sheet" />

      <dl className="mt-4">
        <Row term="Class">{profile.characterClass}</Row>
        <Row term="Base">{profile.base}</Row>
        <Row term="Current guild">{profile.guild}</Row>
        <Row term="Main stats">
          <span className="flex flex-wrap gap-2">
            {profile.mainStats.map((stat) => (
              <span key={stat} className="tag-badge bg-cream">
                {stat}
              </span>
            ))}
          </span>
        </Row>
        {likes && likes.length > 0 && <Row term="Likes">{likes.join(", ")}</Row>}
        {dislikes && dislikes.length > 0 && (
          <Row term="Dislikes">{dislikes.join(", ")}</Row>
        )}
      </dl>

      <p className="mt-4 text-sm text-ink/80 sm:text-base">{profile.bio}</p>
    </section>
  );
}

import { profile } from "@/lib/data";
import HandNote from "./HandNote";

// The dark band: three stat tiles from the character sheet, then main stats
// and the bio.
export default function ProfileCard() {
  const { likes, dislikes } = profile;
  const tiles = [
    { term: "Class", value: profile.characterClass, n: "01" },
    { term: "Base", value: profile.base, n: "02" },
    { term: "Last guild", value: profile.guild, n: "03" },
  ];

  return (
    <section
      id="profile"
      className="band on-dark border-b-3 border-ink bg-ink text-cream"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8 lg:py-32">
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Profile</h2>
          <HandNote className="text-cream/80">character sheet</HandNote>
        </div>

        <dl className="mt-10 grid gap-5 md:grid-cols-3">
          {tiles.map((tile) => (
            <div
              key={tile.term}
              className="fill-tile flex flex-col justify-between gap-8 md:min-h-[13rem] rounded-brutal border-3 border-cream/90 p-6"
            >
              <span aria-hidden="true" className="font-mono text-sm text-yellow">
                {tile.n}
              </span>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-cream/80">
                  {tile.term}
                </dt>
                <dd className="mt-2 font-display text-xl font-bold leading-snug sm:text-2xl">
                  {tile.value}
                </dd>
              </div>
            </div>
          ))}
          <div className="md:col-span-3 md:flex md:items-baseline md:gap-6">
            <dt className="font-mono text-xs uppercase tracking-wider text-cream/80">
              Main stats
            </dt>
            <dd className="mt-3 flex flex-wrap gap-2 md:mt-0">
              {profile.mainStats.map((stat) => (
                <span
                  key={stat}
                  className="inline-flex items-center rounded-full border-2 border-cream px-3 py-1 font-mono text-xs font-medium"
                >
                  {stat}
                </span>
              ))}
            </dd>
          </div>
          {likes && likes.length > 0 && (
            <div>
              <dt>Likes</dt>
              <dd>{likes.join(", ")}</dd>
            </div>
          )}
          {dislikes && dislikes.length > 0 && (
            <div>
              <dt>Dislikes</dt>
              <dd>{dislikes.join(", ")}</dd>
            </div>
          )}
        </dl>

        <p className="mt-10 max-w-2xl text-base text-cream/90 sm:text-lg">
          {profile.bio}
        </p>
      </div>
    </section>
  );
}

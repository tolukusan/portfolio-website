// One of Tolu's drawn character poses. Decorative: the face stays blank and
// the image carries no information, so it is hidden from assistive tech.

// Natural sizes. Every animation frame of a pose shares that pose's size and
// trim rectangle (see scripts/cut-character.sh, CROP), so frames swap in place.
export const POSES = {
  wave: { w: 476, h: 1072 },
  hang: { w: 425, h: 1065 },
  point: { w: 615, h: 1091 },
  sit: { w: 638, h: 1081 },
  peek: { w: 604, h: 1200 },
  thumbs: { w: 498, h: 1089 },
} as const;

export type PoseName = keyof typeof POSES;

export default function Pose({
  pose,
  frame,
  className = "",
  flip,
  eager,
  playing,
}: {
  pose: PoseName;
  /** An animation frame of this pose to show instead, e.g. "hang-up". */
  frame?: string;
  className?: string;
  flip?: boolean;
  eager?: boolean;
  /** Set while a click animation plays, so CSS can add body motion. */
  playing?: boolean;
}) {
  const { w, h } = POSES[pose];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/character/cut/${frame ?? pose}.webp`}
      alt=""
      aria-hidden="true"
      width={w}
      height={h}
      data-pose={pose}
      data-flip={flip ? "" : undefined}
      data-playing={playing ? "" : undefined}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      className={`block w-auto select-none ${flip ? "-scale-x-100" : ""} ${className}`.trim()}
    />
  );
}

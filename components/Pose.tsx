// One of Tolu's drawn character poses. Decorative: the face stays blank and
// the image carries no information, so it is hidden from assistive tech.

export const POSES = {
  wave: { w: 437, h: 1066 },
  hang: { w: 329, h: 1060 },
  point: { w: 610, h: 1086 },
  sit: { w: 554, h: 1076 },
  peek: { w: 599, h: 1200 },
  thumbs: { w: 490, h: 1083 },
} as const;

export type PoseName = keyof typeof POSES;

export default function Pose({
  pose,
  className = "",
  flip,
  eager,
}: {
  pose: PoseName;
  className?: string;
  flip?: boolean;
  eager?: boolean;
}) {
  const { w, h } = POSES[pose];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/character/cut/${pose}.webp`}
      alt=""
      aria-hidden="true"
      width={w}
      height={h}
      data-pose={pose}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      className={`block w-auto select-none ${flip ? "-scale-x-100" : ""} ${className}`.trim()}
    />
  );
}

import { turnaroundNotes } from "@/lib/data";
import HandNote from "./HandNote";

// Shared guide heights (viewBox units) so all three views line up.
const HEAD_TOP = 30;
const SHOULDERS = 105;
const HIPS = 200;
const KNEES = 260;
const FEET = 318;

type View = {
  label: string;
  cx: number;
  // Horizontal widths for the left and right half of the body (1 = front view).
  left: number;
  right: number;
  side?: boolean;
};

const views: View[] = [
  { label: "Front", cx: 100, left: 1, right: 1 },
  { label: "Three-quarter", cx: 300, left: 0.6, right: 0.95 },
  { label: "Side", cx: 500, left: 0.45, right: 0.45, side: true },
];

const ink = {
  stroke: "#111111",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
  pathLength: 1,
  className: "sketch-draw",
};

const guide = {
  stroke: "#111111",
  strokeOpacity: 0.3,
  strokeWidth: 1.5,
  strokeDasharray: "4 4",
  fill: "none",
};

function Joint({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={4} {...ink} />;
}

function Limb({ points }: { points: [number, number][] }) {
  return <polyline points={points.map((p) => p.join(",")).join(" ")} {...ink} />;
}

function Figure({ cx, left, right, side }: View) {
  const sl = cx - 38 * left; // shoulder left
  const sr = cx + 38 * right;
  const hl = cx - 26 * left; // hip corner left
  const hr = cx + 26 * right;
  const torso = `M ${sl} ${SHOULDERS} L ${sr} ${SHOULDERS} L ${hr} ${HIPS} L ${hl} ${HIPS} Z`;

  // Side view: one visible arm and overlapping legs, feet pointing right.
  const arms: [number, number][][] = side
    ? [[[cx, SHOULDERS + 4], [cx + 6, 152], [cx + 12, 196]]]
    : [
        [[sl, SHOULDERS + 4], [cx - 48 * left, 152], [cx - 52 * left, 198]],
        [[sr, SHOULDERS + 4], [cx + 48 * right, 152], [cx + 52 * right, 198]],
      ];
  const legXs = side ? [cx - 4, cx + 4] : [cx - 16 * left, cx + 16 * right];
  const legs: [number, number][][] = legXs.map((x, i) => {
    const dir = side ? 1 : i === 0 ? -1 : 1;
    const footX = side ? x + 2 : x + dir * 4;
    return [
      [x, HIPS],
      [side ? x + 3 : x + dir * 2, KNEES],
      [footX, FEET],
      [footX + dir * 14, FEET],
    ];
  });

  return (
    <g>
      {/* yellow torso fill fades in after the lines */}
      <path d={torso} fill="#FFC93C" className="sketch-fill" />
      <circle cx={cx} cy={HEAD_TOP + 25} r={24} {...ink} />
      <line x1={cx} y1={HEAD_TOP + 49} x2={cx} y2={SHOULDERS} {...ink} />
      <path d={torso} {...ink} />
      {arms.map((a, i) => (
        <Limb key={`arm${i}`} points={a} />
      ))}
      {legs.map((l, i) => (
        <Limb key={`leg${i}`} points={l} />
      ))}
      {arms.map((a, i) => (
        <g key={`armj${i}`}>
          <Joint x={a[0][0]} y={a[0][1]} />
          <Joint x={a[1][0]} y={a[1][1]} />
        </g>
      ))}
      {legs.map((l, i) => (
        <g key={`legj${i}`}>
          <Joint x={l[0][0]} y={l[0][1]} />
          <Joint x={l[1][0]} y={l[1][1]} />
        </g>
      ))}
    </g>
  );
}

function CropMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-4 w-4 border-ink ${className}`}
    />
  );
}

function NoteArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-ink/70"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20 C 6 12, 10 8, 19 5" />
      <path d="M13 4 L 19 5 L 17 11" />
    </svg>
  );
}

export default function Turnaround({ artSrc }: { artSrc?: string }) {
  return (
    <div>
      <div className="relative rounded-brutal-sm border-3 border-ink bg-cream p-4 sm:p-6">
        <CropMark className="left-2 top-2 border-l-2 border-t-2" />
        <CropMark className="right-2 top-2 border-r-2 border-t-2" />
        <CropMark className="bottom-2 left-2 border-b-2 border-l-2" />
        <CropMark className="bottom-2 right-2 border-b-2 border-r-2" />

        {artSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artSrc}
            alt="Character turnaround artwork"
            className="h-auto w-full"
          />
        ) : (
          <svg
            viewBox="0 0 600 360"
            className="h-auto w-full"
            role="img"
            aria-label="Wireframe figure turnaround sketch: front, three-quarter and side views"
          >
            {[HEAD_TOP, SHOULDERS, HIPS, FEET].map((y) => (
              <line key={y} x1={8} y1={y} x2={592} y2={y} {...guide} />
            ))}
            {views.map((v) => (
              <g key={v.label}>
                <rect x={v.cx - 80} y={18} width={160} height={312} {...guide} />
                <line x1={v.cx} y1={18} x2={v.cx} y2={330} {...guide} />
                <Figure {...v} />
                <text
                  x={v.cx}
                  y={350}
                  textAnchor="middle"
                  className="fill-ink font-mono"
                  fontSize={14}
                >
                  {v.label}
                </text>
              </g>
            ))}
          </svg>
        )}
      </div>

      <p className="mt-2 text-right font-mono text-xs text-ink/60">
        turnaround · rough · 1:1
      </p>

      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {turnaroundNotes.map((note) => (
          <li key={note} className="flex items-start gap-1.5">
            <NoteArrow />
            <HandNote className="leading-tight">{note}</HandNote>
          </li>
        ))}
      </ul>
    </div>
  );
}

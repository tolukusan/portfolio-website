// Building blocks for the project system diagrams: 3px ink boxes and arrows
// on a cream dot-grid inset.

const INK = "#111111";
const ORANGE = "#FF6B35";
const YELLOW = "#FFC93C";

export function DiagramFrame({
  label,
  viewBox,
  children,
}: {
  label: string;
  viewBox: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-brutal-sm border-3 border-ink bg-cream bg-[radial-gradient(#11111133_1px,transparent_1px)] p-3 [background-size:16px_16px]">
      <svg viewBox={viewBox} className="h-auto w-full" role="img" aria-label={label}>
        {children}
      </svg>
    </div>
  );
}

export function DiagramNode({
  x,
  y,
  w,
  h,
  label,
  highlight,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string | string[];
  highlight?: boolean;
}) {
  const lines = Array.isArray(label) ? label : [label];
  const lineHeight = 15;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={highlight ? YELLOW : "#FFFFFF"}
        stroke={INK}
        strokeWidth={3}
      />
      <text
        x={x + w / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        className="fill-ink font-mono"
      >
        {lines.map((line, i) => (
          <tspan
            key={line}
            x={x + w / 2}
            y={y + h / 2 + (i - (lines.length - 1) / 2) * lineHeight}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export function DiagramArrow({
  from,
  to,
  tone = "ink",
}: {
  from: [number, number];
  to: [number, number];
  tone?: "ink" | "orange";
}) {
  const color = tone === "orange" ? ORANGE : INK;
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const headLength = 11;
  const headHalf = 6;
  // Stop the line at the base of the head so it never pokes through the tip.
  const baseX = to[0] - ux * headLength;
  const baseY = to[1] - uy * headLength;
  const head = [
    [to[0], to[1]],
    [baseX - uy * headHalf, baseY + ux * headHalf],
    [baseX + uy * headHalf, baseY - ux * headHalf],
  ]
    .map((p) => p.map((n) => n.toFixed(1)).join(","))
    .join(" ");

  return (
    <g>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={baseX}
        y2={baseY}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <polygon points={head} fill={color} />
    </g>
  );
}

export function EdgeLabel({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: string;
}) {
  return (
    <text x={x} y={y} fontSize={11} className="fill-ink/70 font-mono">
      {children}
    </text>
  );
}

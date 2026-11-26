"use client";

// SPIKE (throwaway): pins character poses to the edges of real page elements.
// Each pose knows where its contact point is (hands on a ledge, seat, feet),
// as a fraction of the image height; we measure the target element and put
// that contact point on the chosen edge.

import { useEffect, useRef, useState } from "react";

const POSES = {
  wave: { w: 437, h: 1066 },
  hang: { w: 329, h: 1060 },
  point: { w: 610, h: 1086 },
  sit: { w: 554, h: 1076 },
  peek: { w: 599, h: 1200 },
  thumbs: { w: 490, h: 1083 },
} as const;
type Pose = keyof typeof POSES;

type Pin = {
  pose: Pose;
  target: string; // CSS selector
  edge: "top" | "bottom";
  contactY: number; // 0 = top of image, 1 = bottom
  alignX: number; // 0 = target's left edge, 1 = right edge (figure centre)
  height: number; // px
  flip?: boolean;
  dy?: number;
};

const PINS: Pin[] = [
  // Hangs from the bottom of the second project card, into the empty grid slot.
  { pose: "hang", target: "#projects .grid > div:nth-child(2)", edge: "bottom", contactY: 0.03, alignX: 0.5, height: 230 },
  // Sits on the top edge of the Backstory card.
  { pose: "sit", target: "#backstory", edge: "top", contactY: 0.586, alignX: 0.86, height: 170 },
  // Stands inside the contact panel, pointing left at the Recruit button.
  { pose: "point", target: "#party", edge: "bottom", contactY: 1, alignX: 0.6, height: 175, flip: true, dy: -10 },
];

export default function CharacterPins() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<({ top: number; left: number; width: number } | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current?.parentElement;
    if (!root) return;
    const measure = () => {
      const r = root.getBoundingClientRect();
      setBoxes(
        PINS.map((pin) => {
          const el = document.querySelector(pin.target);
          if (!el) return null;
          const t = el.getBoundingClientRect();
          const { w, h } = POSES[pin.pose];
          const width = (pin.height * w) / h;
          const edgeY = pin.edge === "top" ? t.top : t.bottom;
          return {
            top: edgeY - r.top - pin.contactY * pin.height + (pin.dy ?? 0),
            left: t.left - r.left + pin.alignX * t.width - width / 2,
            width,
          };
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none hidden lg:block">
      {PINS.map((pin, i) => {
        const box = boxes[i];
        if (!box) return null;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={pin.pose}
            src={`/character/cut/${pin.pose}.webp`}
            alt=""
            className="absolute z-20 drop-shadow-[3px_3px_0_rgba(17,17,17,0.18)]"
            style={{
              top: box.top,
              left: box.left,
              width: box.width,
              height: pin.height,
              transform: pin.flip ? "scaleX(-1)" : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

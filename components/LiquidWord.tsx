"use client";

// The hero's giant word as a container of liquid. Hovering over the word
// fills it; moving away drains it slowly to a resting level; a click fills it
// fast and makes it shake. The level is one CSS variable (--lvl, 0 to 1) that
// globals.css turns into a wavy fill. Hover is hit-tested against the word's
// box, because the figure and buttons sit on top of it. With reduced motion
// the CSS shows solid letters and this does nothing.

import { useEffect, useRef } from "react";

const REST = 0.22; // resting level with nothing hovering
const FILL_RATE = 0.12; // per second while hovered (~6.5s to full): slow, so a click stands out
const DRAIN_RATE = 0.1; // per second after leaving (slow)
const RUSH_RATE = 1.4; // per second after a click: a visible surge, under a second
const RUSH_MS = 1200;

export default function LiquidWord({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.closest("section");
    if (!el || !area) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let level = REST;
    let hovered = false;
    let rushUntil = 0;
    let frame = 0;
    let last = 0;

    const inside = (x: number, y: number) => {
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const rushing = now < rushUntil;
      const target = hovered || rushing ? 1 : REST;
      const rate = rushing ? RUSH_RATE : target > level ? FILL_RATE : DRAIN_RATE;
      level = target > level ? Math.min(target, level + rate * dt) : Math.max(target, level - rate * dt);
      el.style.setProperty("--lvl", level.toFixed(4));
      if (level !== target || rushing) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        last = 0;
      }
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const now = inside(e.clientX, e.clientY);
      if (now !== hovered) {
        hovered = now;
        run();
      }
    };
    const onLeave = () => {
      if (hovered) {
        hovered = false;
        run();
      }
    };
    const onClick = (e: MouseEvent) => {
      // clicks on the figure, links and buttons do their own thing
      if ((e.target as Element).closest("a, button")) return;
      if (!inside(e.clientX, e.clientY)) return;
      rushUntil = performance.now() + RUSH_MS;
      el.removeAttribute("data-shake");
      void el.offsetWidth; // restart the shake animation
      el.setAttribute("data-shake", "");
      window.setTimeout(() => el.removeAttribute("data-shake"), 900);
      run();
    };

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    area.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      area.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <p ref={ref} aria-hidden="true" className={`liquid-word ${className}`} style={style}>
      {text}
    </p>
  );
}

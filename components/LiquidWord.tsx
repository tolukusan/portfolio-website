"use client";

// The hero's giant word as a container of liquid. Pressing and holding on it
// (mouse or finger) surges it full and makes the letters shake until you let
// go; then it drains slowly back to a resting level. The level is one CSS
// variable (--lvl, 0 to 1) that globals.css turns into a wavy fill. Presses
// are hit-tested against the word's box, because the figure and buttons sit on
// top of it. With reduced motion the CSS shows solid letters and this does
// nothing.

import { useEffect, useRef } from "react";

const REST = 0.22; // resting level when not held
const DRAIN_RATE = 0.1; // per second after release (slow)
const RUSH_RATE = 1.4; // per second while held: a visible surge, under a second

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
    let holding = false;
    let frame = 0;
    let last = 0;

    const inside = (x: number, y: number) => {
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const target = holding ? 1 : REST;
      const rate = holding ? RUSH_RATE : DRAIN_RATE;
      level = target > level ? Math.min(target, level + rate * dt) : Math.max(target, level - rate * dt);
      el.style.setProperty("--lvl", level.toFixed(4));
      if (level !== target) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        last = 0;
      }
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      // the figure, links and buttons do their own thing
      if ((e.target as Element).closest("a, button")) return;
      if (!inside(e.clientX, e.clientY)) return;
      holding = true;
      el.setAttribute("data-hold", "");
      run();
    };
    const onUp = () => {
      if (!holding) return;
      holding = false;
      el.removeAttribute("data-hold");
      run();
    };

    area.addEventListener("pointerdown", onDown);
    // released anywhere, even outside the hero, ends the hold
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("blur", onUp);
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, []);

  return (
    <p ref={ref} aria-hidden="true" className={`liquid-word ${className}`} style={style}>
      {text}
    </p>
  );
}

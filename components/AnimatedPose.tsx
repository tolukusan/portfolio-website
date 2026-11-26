"use client";

// A pose that plays a short clip when clicked: it swaps through drawn frames
// (from public/character/cut/) while CSS adds body motion via data-playing.
// The figures are a playful extra, not content, so they stay out of the tab
// order (the hero's turn button is the keyboard-reachable one). With reduced
// motion, a click shows the clip's key frame briefly instead of a sequence.

import { useEffect, useRef, useState } from "react";
import Pose, { type PoseName } from "./Pose";

type Clip = {
  /** Frames to step through; the last should be the pose itself. */
  frames: string[];
  /** Milliseconds per frame. */
  ms: number;
  /** The frame to show alone under reduced motion. */
  key: string;
};

export const CLIPS: Partial<Record<PoseName, Clip>> = {
  // waves the hand back and forth
  wave: { frames: ["wave-a", "wave-b", "wave-a", "wave-b", "wave"], ms: 150, key: "wave-b" },
  // a pull-up: up, hold, down
  hang: { frames: ["hang-up", "hang-up", "hang-up", "hang"], ms: 220, key: "hang-up" },
  // taps the point twice
  point: { frames: ["point-back", "point-out", "point-back", "point-out", "point"], ms: 150, key: "point-back" },
  // kicks his legs on the ledge
  sit: { frames: ["sit-fwd", "sit-back", "sit-fwd", "sit-back", "sit"], ms: 170, key: "sit-fwd" },
  // switches to a double thumbs up and holds it
  thumbs: { frames: ["thumbs-double", "thumbs-double", "thumbs-double", "thumbs-double", "thumbs"], ms: 220, key: "thumbs-double" },
};

/** Plays a pose's clip; returns the current frame and a trigger. */
export function useClip(pose: PoseName) {
  const clip = CLIPS[pose];
  const [frame, setFrame] = useState<string | undefined>();
  const timers = useRef<number[]>([]);
  const preloaded = useRef(false);

  const preload = () => {
    if (!clip || preloaded.current) return;
    preloaded.current = true;
    for (const f of new Set(clip.frames)) new Image().src = `/character/cut/${f}.webp`;
  };

  const play = () => {
    if (!clip) return;
    preload();
    timers.current.forEach(clearTimeout);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = reduce ? [clip.key, clip.frames[clip.frames.length - 1]] : clip.frames;
    const ms = reduce ? 1200 : clip.ms;
    setFrame(steps[0]);
    timers.current = steps.slice(1).map((f, i) =>
      window.setTimeout(() => setFrame(i === steps.length - 2 ? undefined : f), ms * (i + 1)),
    );
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return { frame, playing: frame !== undefined, play, preload };
}

export default function AnimatedPose({
  pose,
  flip,
  className = "",
}: {
  pose: PoseName;
  flip?: boolean;
  className?: string;
}) {
  const { frame, playing, play, preload } = useClip(pose);
  const ref = useRef<HTMLDivElement>(null);

  // Fetch the frames once the figure is close to the screen, so the first
  // click never shows a blank frame.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          preload();
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} onClick={play} className={`cursor-pointer ${className}`}>
      <Pose pose={pose} frame={frame} flip={flip} playing={playing} className="h-full" />
    </div>
  );
}

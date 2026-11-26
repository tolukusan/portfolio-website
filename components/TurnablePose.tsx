"use client";

// The hero figure: click (or Enter/Space) and he turns to face the other way,
// waving as he does. The mirror is animated as a quick turn through edge-on;
// with reduced motion it flips instantly. A real toggle button, so it works
// from the keyboard.

import { useEffect, useState } from "react";
import { useClip } from "./AnimatedPose";
import Pose, { type PoseName } from "./Pose";

export default function TurnablePose({
  pose,
  className = "",
}: {
  pose: PoseName;
  className?: string;
}) {
  const [turned, setTurned] = useState(false);
  const { frame, playing, play, preload } = useClip(pose);

  // The hero is on screen at load, so fetch the wave frames right away.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => preload(), []);

  return (
    <button
      type="button"
      aria-pressed={turned}
      aria-label="Turn the character around"
      onClick={() => {
        setTurned((t) => !t);
        play();
      }}
      className={`cursor-pointer ${className}`}
    >
      <Pose
        pose={pose}
        frame={frame}
        playing={playing}
        eager
        flip={turned}
        className="h-full transition-transform duration-500 ease-in-out motion-reduce:transition-none"
      />
    </button>
  );
}

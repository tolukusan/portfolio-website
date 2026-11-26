"use client";

// The hero figure: click (or Enter/Space) and he turns to face the other way.
// The mirror is animated as a quick turn through edge-on; with reduced motion
// it flips instantly. A real toggle button, so it works from the keyboard.

import { useState } from "react";
import Pose, { type PoseName } from "./Pose";

export default function TurnablePose({
  pose,
  className = "",
}: {
  pose: PoseName;
  className?: string;
}) {
  const [turned, setTurned] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={turned}
      aria-label="Turn the character around"
      onClick={() => setTurned((t) => !t)}
      className={`cursor-pointer ${className}`}
    >
      <Pose
        pose={pose}
        eager
        flip={turned}
        className="h-full transition-transform duration-500 ease-in-out motion-reduce:transition-none"
      />
    </button>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { clamp } from "@/lib/utils";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const frame = useRef<number | null>(null);
  const previousY = useRef(0);
  const previousTime = useRef(0);

  useEffect(() => {
    const update = (time: number) => {
      const y = window.scrollY;
      const delta = y - previousY.current;
      const elapsed = Math.max(time - previousTime.current, 16);
      setVelocity(clamp((delta / elapsed) * 16, -80, 80));
      previousY.current = y;
      previousTime.current = time;
      frame.current = requestAnimationFrame(update);
    };

    frame.current = requestAnimationFrame(update);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return velocity;
}

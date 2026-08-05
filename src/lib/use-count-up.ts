"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 up to `target` using requestAnimationFrame with
 * an ease-out curve. Re-runs whenever `target` changes (e.g. locale switch
 * re-renders with the same numbers, so this only visibly re-animates when
 * the underlying value actually changes).
 */
export function useCountUp(target: number, durationMs = 1200): number {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(target)) return;
    startRef.current = null;
    let frame = 0;

    function tick(now: number) {
      if (startRef.current === null) startRef.current = now;
      const progress = Math.min((now - startRef.current) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}

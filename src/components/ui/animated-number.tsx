"use client";

import { useCountUp } from "@/lib/use-count-up";

/**
 * Renders a number (or a formatted string like "2,840" or "9–11 PM") with
 * the numeric portion counting up from 0 on mount. Non-numeric strings
 * (or strings with no digits, like "9–11 PM") render unchanged — only the
 * digit run is animated, and thousands separators are re-applied so
 * "2,840" counts up as "0" → "1,420" → "2,840", not a raw "2840".
 */
export function AnimatedNumber({
  value,
  durationMs = 1200,
}: {
  value: string | number;
  durationMs?: number;
}) {
  const str = String(value);
  const match = str.match(/^(\D*)([\d,]+)(.*)$/);
  const numStr = match?.[2] ?? "";
  const target = numStr ? Number(numStr.replace(/,/g, "")) : NaN;
  const current = useCountUp(Number.isFinite(target) ? target : 0, durationMs);

  if (!match || !Number.isFinite(target)) return <>{str}</>;

  const [, prefix, , suffix] = match;
  const formatted = numStr.includes(",") ? current.toLocaleString("en-US") : String(current);
  return (
    <>
      {prefix}
      {formatted}
      {suffix}
    </>
  );
}

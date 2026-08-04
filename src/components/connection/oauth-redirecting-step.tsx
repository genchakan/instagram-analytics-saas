"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const STATUSES = [
  { label: "Connecting to Instagram…", durationMs: 1600 },
  { label: "Establishing secure session…", durationMs: 1900 },
  { label: "Requesting account access…", durationMs: 1500 },
  { label: "Verifying connection…", durationMs: 1700 },
  { label: "Redirecting to sign-in…", durationMs: 1300 },
];

export function OAuthRedirectingStep({ onDone }: { onDone: () => void }) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const duration = STATUSES[statusIndex]!.durationMs;
    if (statusIndex >= STATUSES.length - 1) {
      const timer = setTimeout(onDone, duration);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setStatusIndex((i) => i + 1), duration);
    return () => clearTimeout(timer);
  }, [statusIndex, onDone]);

  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-accent-secondary" aria-hidden="true" />
      <p className="text-sm font-medium text-text-primary" aria-live="polite">
        {STATUSES[statusIndex]!.label}
      </p>
    </div>
  );
}

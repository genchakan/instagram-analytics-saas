"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const STATUSES = [
  "Connecting to Instagram…",
  "Requesting secure access…",
  "Redirecting to sign-in…",
];

const STATUS_INTERVAL_MS = 700;

export function OAuthRedirectingStep({ onDone }: { onDone: () => void }) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (statusIndex >= STATUSES.length - 1) {
      const timer = setTimeout(onDone, STATUS_INTERVAL_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setStatusIndex((i) => i + 1), STATUS_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [statusIndex, onDone]);

  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-accent-secondary" aria-hidden="true" />
      <p className="text-sm font-medium text-text-primary" aria-live="polite">
        {STATUSES[statusIndex]}
      </p>
    </div>
  );
}

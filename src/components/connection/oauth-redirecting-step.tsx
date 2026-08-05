"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Connecting to Instagram…", durationMs: 1600 },
  { label: "Establishing secure session…", durationMs: 1900 },
  { label: "Requesting account access…", durationMs: 1500 },
  { label: "Verifying connection…", durationMs: 1700 },
  { label: "Redirecting to sign-in…", durationMs: 1300 },
];

export function OAuthRedirectingStep({ onDone }: { onDone: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const done = activeStep >= STEPS.length;
  const percent = Math.round((activeStep / STEPS.length) * 100);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(onDone, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setActiveStep((s) => s + 1), STEPS[activeStep]!.durationMs);
    return () => clearTimeout(timer);
  }, [activeStep, done, onDone]);

  return (
    <div className="py-2">
      <div className="mb-5 flex items-center justify-between pr-10">
        <span className="text-xs font-medium text-text-secondary">Connecting…</span>
        <span className="text-xs font-semibold text-text-primary" aria-live="polite">
          {percent}%
        </span>
      </div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-primary-muted to-accent-secondary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-center">
        <Loader2 className="mx-auto mb-5 h-8 w-8 animate-spin text-accent-secondary" aria-hidden="true" />
        <h1 className="text-lg font-semibold text-text-primary">Connecting your account</h1>
        <p className="mt-1 text-sm text-text-secondary">This may take a moment — don&apos;t close this window.</p>
      </div>

      <ul className="mt-6 flex flex-col gap-3 text-left" aria-live="polite">
        {STEPS.map((step, index) => {
          const complete = index < activeStep;
          const active = index === activeStep;
          return (
            <li key={step.label} className="flex items-center gap-3">
              {complete ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
              ) : active ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-accent-secondary" aria-hidden="true" />
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border-2 border-border" />
              )}
              <span
                className={cn(
                  "text-sm",
                  complete || active ? "text-text-primary" : "text-text-secondary",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

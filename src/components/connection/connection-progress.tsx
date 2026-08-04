"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  "Checking profile information",
  "Preparing analytics",
  "Syncing profile activity",
  "Building dashboard",
  "Completing setup",
];

const STEP_DURATION_MS = 900;

export function ConnectionProgress() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const done = activeStep >= STEPS.length;

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setActiveStep((s) => s + 1), STEP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeStep, done]);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => router.push("/dashboard"), 1200);
    return () => clearTimeout(timer);
  }, [done, router]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="w-full rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6 sm:p-8">
        {!done ? (
          <>
            <Loader2 className="mx-auto mb-5 h-8 w-8 animate-spin text-accent-secondary" aria-hidden="true" />
            <h1 className="text-lg font-semibold text-text-primary">Setting up your dashboard</h1>
            <p className="mt-1 text-sm text-text-secondary">This will only take a moment.</p>

            <ul className="mt-6 flex flex-col gap-3 text-left" aria-live="polite">
              {STEPS.map((label, index) => {
                const complete = index < activeStep;
                const active = index === activeStep;
                return (
                  <li key={label} className="flex items-center gap-3">
                    {complete ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    ) : (
                      <span
                        className={cn(
                          "h-4 w-4 shrink-0 rounded-full border-2",
                          active ? "border-accent-secondary" : "border-border",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        complete || active ? "text-text-primary" : "text-text-secondary",
                      )}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-success" aria-hidden="true" />
            <h1 className="text-lg font-semibold text-text-primary">Your dashboard is ready.</h1>
            <p className="mt-1 text-sm text-text-secondary">Taking you there now…</p>
            <Button className="mt-6 w-full" onClick={() => router.push("/dashboard")}>
              View Dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

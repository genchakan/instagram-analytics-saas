"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/app-state";
import { getStoredAccount } from "@/services/instagram-connection";

const STEPS = [
  { label: "Verifying account details", durationMs: 1500 },
  { label: "Establishing secure connection", durationMs: 1900 },
  { label: "Accessing basic profile data", durationMs: 1700 },
  { label: "Syncing recent visitor activity", durationMs: 2200 },
  { label: "Preparing analytics", durationMs: 1600 },
  { label: "Building your dashboard", durationMs: 1400 },
  { label: "Completing setup", durationMs: 2600 },
];

export function ConnectionProgress() {
  const router = useRouter();
  const { setAccount } = useAppState();
  const [activeStep, setActiveStep] = useState(0);
  const done = activeStep >= STEPS.length;
  const percent = Math.round((activeStep / STEPS.length) * 100);

  useEffect(() => {
    // Set once this progress screen is the only thing on screen, so the
    // /dashboard page never briefly renders its "connected" view behind
    // the connect modal while the route transition is still in flight.
    setAccount(getStoredAccount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setActiveStep((s) => s + 1), STEPS[activeStep]!.durationMs);
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
            <div className="mb-5 flex items-center justify-between">
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

            <Loader2 className="mx-auto mb-5 h-8 w-8 animate-spin text-accent-secondary" aria-hidden="true" />
            <h1 className="text-lg font-semibold text-text-primary">Setting up your dashboard</h1>
            <p className="mt-1 text-sm text-text-secondary">This may take a moment — don&apos;t close this window.</p>

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
          </>
        ) : (
          <>
            <XCircle className="mx-auto mb-4 h-10 w-10 text-danger" aria-hidden="true" />
            <h1 className="text-lg font-semibold text-text-primary">We couldn't connect this account</h1>
            <p className="mt-1 text-sm text-text-secondary">
              This usually happens when two-factor authentication is turned on — verification could not be
              completed automatically. Please try again.
            </p>
            <Button className="mt-6 w-full" variant="secondary" onClick={() => router.push("/dashboard")}>
              Back to dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

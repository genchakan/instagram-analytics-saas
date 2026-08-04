"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/app-state";

export function SetupChecklist() {
  const { user, account, setConnectModalOpen, setOnboardingOpen } = useAppState();

  const steps = [
    { id: "account", label: "Create your account", complete: true },
    { id: "learn", label: "Learn how the dashboard works", complete: !!user?.onboardingCompleted },
    { id: "connect", label: "Connect Instagram", complete: !!account },
    { id: "report", label: "View your first report", complete: !!account },
  ];

  const completeCount = steps.filter((s) => s.complete).length;
  const percent = Math.round((completeCount / steps.length) * 100);

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-text-primary">Setup {percent}% complete</p>
        <span className="text-xs text-text-secondary">
          {completeCount}/{steps.length}
        </span>
      </div>

      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-primary-muted to-accent-secondary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="flex flex-col gap-3">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-2.5">
            {step.complete ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden="true" />
            )}
            <span className={cn("text-sm", step.complete ? "text-text-secondary line-through" : "text-text-primary")}>
              {step.label}
            </span>
          </li>
        ))}
      </ul>

      {!account && (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => setConnectModalOpen(true)} className="w-full sm:w-auto">
            Connect Instagram
          </Button>
          <Button variant="secondary" onClick={() => setOnboardingOpen(true)} className="w-full sm:w-auto">
            View Demo Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}

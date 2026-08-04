"use client";

import { CheckCircle2, Circle, Eye, Lock, ShieldCheck, KeyRound, Unplug } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppState } from "@/lib/app-state";

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Encrypted connection" },
  { icon: KeyRound, label: "Password never stored" },
  { icon: Unplug, label: "No direct access to Meta's login systems" },
];

export function SetupChecklist() {
  const { account, setConnectModalOpen } = useAppState();

  const steps = [
    { id: "connect", label: "Connect Instagram", complete: !!account },
    { id: "report", label: "View your first report", complete: !!account },
  ];

  const completeCount = steps.filter((s) => s.complete).length;
  const percent = Math.round((completeCount / steps.length) * 100);

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-1">
      {!account && (
        <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-surface-2 via-surface-1 to-surface-2 p-5 text-center sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(225,48,108,0.16),transparent)]"
          />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-highlight/30 bg-accent-highlight/10 px-3 py-1 text-xs font-medium text-fuchsia-300">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            One step left
          </span>
          <h2 className="mx-auto mt-4 max-w-sm text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
            Connect Instagram to see who&apos;s watching you
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
            Takes less than a minute. Your password is never stored, and you can disconnect anytime.
          </p>
          <button
            type="button"
            onClick={() => setConnectModalOpen(true)}
            className="gradient-cta mx-auto mt-5 flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            Connect Instagram
          </button>

          <ul className="mx-auto mt-5 flex max-w-sm flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2">
            {TRUST_POINTS.map((point) => (
              <li key={point.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
                <point.icon className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                {point.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-5 sm:p-6">
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
      </div>
    </div>
  );
}

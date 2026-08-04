"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, AtSign, ShieldCheck, KeyRound, Unplug, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { OnboardingProgress } from "./onboarding-progress";
import { useAppState } from "@/lib/app-state";
import { DEMO_METRICS, DEMO_VISITORS } from "@/data/demo-dashboard";

const TOTAL_STEPS = 3;

const TRUST_POINTS = [
  { icon: KeyRound, label: "Prototype connection" },
  { icon: ShieldCheck, label: "Password is not stored" },
  { icon: Lock, label: "No data is sent to Instagram" },
  { icon: Unplug, label: "Disconnect anytime" },
];

export function OnboardingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { completeOnboarding, setConnectModalOpen } = useAppState();
  const [step, setStep] = useState(0);

  function close() {
    onOpenChange(false);
    setStep(0);
  }

  function handleFinishToConnect() {
    completeOnboarding();
    close();
    setConnectModalOpen(true);
  }

  function handleFinishToDemo() {
    completeOnboarding();
    close();
    router.push("/dashboard");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next: boolean) => {
        if (!next) close();
      }}
    >
      <DialogContent className="max-w-lg" onEscapeKeyDown={close}>
        <div className="mb-5">
          <OnboardingProgress step={step} total={TOTAL_STEPS} />
        </div>

        {step === 0 && (
          <>
            <DialogHeader>
              <DialogTitle>Connect your Instagram profile</DialogTitle>
              <DialogDescription>
                Link your profile to begin creating your activity and visitor insights dashboard.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-border bg-surface-2 py-6">
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500">
                  <AtSign className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <span className="text-[11px] text-text-secondary">Instagram Profile</span>
              </div>
              <ArrowRight className="h-4 w-4 text-text-secondary" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-1 border border-border">
                  <ShieldCheck className="h-5 w-5 text-accent-secondary" aria-hidden="true" />
                </span>
                <span className="text-[11px] text-text-secondary">Secure Connection</span>
              </div>
              <ArrowRight className="h-4 w-4 text-text-secondary" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
                  <Lock className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <span className="text-[11px] text-text-secondary">Analytics Dashboard</span>
              </div>
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {TRUST_POINTS.map((point) => (
                <li key={point.label} className="flex items-center gap-2 text-xs text-text-secondary">
                  <point.icon className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                  {point.label}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="ghost" onClick={close}>
                Skip for now
              </Button>
              <Button onClick={() => setStep(1)}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>See everything in one dashboard</DialogTitle>
              <DialogDescription>
                Your profile activity, visitor insights and engagement patterns will be organized
                in one clear workspace.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-[var(--radius-lg)] border border-border bg-surface-2 p-4">
              <div className="mb-3 flex justify-end">
                <Badge variant="demo">Example dashboard preview</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_METRICS.map((metric) => (
                  <div key={metric.id} className="rounded-[var(--radius-md)] border border-border bg-surface-1 p-2.5">
                    <p className="text-[10px] text-text-secondary">{metric.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-text-primary">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              <Button variant="ghost" onClick={() => setStep(0)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => setStep(2)}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Explore your visitor activity</DialogTitle>
              <DialogDescription>
                Review recent activity, visit frequency and individual interest indicators.
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-[var(--radius-lg)] border border-border bg-surface-2 p-3">
              <div className="mb-2 flex justify-end px-1">
                <Badge variant="demo">Demo data</Badge>
              </div>
              <div className="space-y-1.5">
                {DEMO_VISITORS.slice(0, 3).map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex items-center gap-2.5 rounded-[var(--radius-md)] bg-surface-1 px-2.5 py-2"
                  >
                    <Avatar name={visitor.displayName} src={visitor.avatarUrl} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-text-primary">@{visitor.username}</p>
                      <p className="text-[10px] text-text-secondary capitalize">
                        {visitor.visitFrequency} · {visitor.status.replace(/-/g, " ")}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-text-primary">{visitor.interestScore}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
              <Button onClick={handleFinishToConnect} className="w-full sm:w-auto">
                Connect Instagram Now
              </Button>
              <Button variant="secondary" onClick={handleFinishToDemo} className="w-full sm:w-auto">
                Explore Demo Dashboard
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

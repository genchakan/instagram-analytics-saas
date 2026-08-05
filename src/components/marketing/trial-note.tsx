"use client";

import { CheckCircle2 } from "lucide-react";
import { getTrialHeadline, getTrialSubline } from "@/data/pricing";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function TrialNote({ className }: { className?: string }) {
  const { t } = useLocale();
  return (
    <p
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-sm font-medium text-success",
        className,
      )}
    >
      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="text-text-primary">{getTrialHeadline(t)}</span>
      <span className="text-success/50" aria-hidden="true">
        ·
      </span>
      <span>{getTrialSubline(t)}</span>
    </p>
  );
}

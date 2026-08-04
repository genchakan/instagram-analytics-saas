import { CheckCircle2 } from "lucide-react";
import { TRIAL_HEADLINE, TRIAL_SUBLINE } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function TrialNote({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-1.5 text-sm text-text-secondary", className)}>
      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
      <span>
        <span className="font-medium text-text-primary">{TRIAL_HEADLINE}</span> · {TRIAL_SUBLINE}
      </span>
    </p>
  );
}

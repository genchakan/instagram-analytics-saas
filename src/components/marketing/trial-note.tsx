import { CheckCircle2 } from "lucide-react";
import { TRIAL_HEADLINE, TRIAL_SUBLINE } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function TrialNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-sm font-medium text-success",
        className,
      )}
    >
      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="text-text-primary">{TRIAL_HEADLINE}</span>
      <span className="text-success/50" aria-hidden="true">
        ·
      </span>
      <span>{TRIAL_SUBLINE}</span>
    </p>
  );
}

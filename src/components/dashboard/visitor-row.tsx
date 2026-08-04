"use client";

import { Lock, Eye, Flame } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "./status-badge";
import { formatRelativeTime, maskUsername, cn } from "@/lib/utils";
import type { VisitorInsight } from "@/types/visitor";

const FREQUENCY_LABEL: Record<VisitorInsight["visitFrequency"], string> = {
  daily: "Daily",
  weekly: "Weekly",
  occasional: "Occasional",
  "one-time": "One-time",
};

function scoreTier(score: number) {
  if (score >= 85) return { label: "Very high", ring: "ring-accent-highlight/50", text: "text-fuchsia-300", glow: "shadow-[0_0_0_4px_rgba(217,70,239,0.15)]" };
  if (score >= 70) return { label: "High", ring: "ring-accent-primary/50", text: "text-violet-300", glow: "shadow-[0_0_0_4px_rgba(139,92,246,0.15)]" };
  if (score >= 50) return { label: "Medium", ring: "ring-border", text: "text-text-primary", glow: "" };
  return { label: "Low data", ring: "ring-border", text: "text-text-secondary", glow: "" };
}

export function VisitorRow({
  visitor,
  onClick,
  onUnlockClick,
}: {
  visitor: VisitorInsight;
  onClick?: () => void;
  onUnlockClick?: () => void;
}) {
  const locked = visitor.isLocked;
  const tier = scoreTier(visitor.interestScore);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface-1 p-3.5 transition-colors sm:p-4",
        !locked && "hover:border-accent-primary/40 cursor-pointer",
        locked && visitor.interestScore >= 85 && "border-accent-highlight/25",
      )}
      onClick={!locked ? onClick : undefined}
      role={!locked ? "button" : undefined}
      tabIndex={!locked ? 0 : undefined}
      onKeyDown={
        !locked
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick?.();
            }
          : undefined
      }
    >
      <div className="flex items-start gap-3">
        <div className={cn("relative shrink-0 rounded-full ring-2", tier.ring, tier.glow)}>
          <Avatar
            name={visitor.displayName}
            src={visitor.avatarUrl}
            size="md"
            className={locked ? "blur-[1px] grayscale-[0.3] select-none" : undefined}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
              @{locked ? maskUsername(visitor.username) : visitor.username}
            </p>
            <span className={cn("flex shrink-0 items-center gap-1 text-base font-bold", tier.text)}>
              {visitor.interestScore >= 85 && <Flame className="h-3.5 w-3.5" aria-hidden="true" />}
              {visitor.interestScore}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <StatusBadge status={visitor.status} />
            <span className="text-xs text-text-secondary">
              {formatRelativeTime(visitor.lastActivityAt)} · {FREQUENCY_LABEL[visitor.visitFrequency]}
            </span>
          </div>
        </div>
      </div>

      {locked ? (
        <button
          type="button"
          onClick={onUnlockClick}
          className="gradient-cta flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Lock className="h-4 w-4" aria-hidden="true" />
          Unlock this visitor
        </button>
      ) : (
        <span className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          View full activity
        </span>
      )}
    </div>
  );
}

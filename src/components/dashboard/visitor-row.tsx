"use client";

import { Lock, Eye } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "./status-badge";
import { formatRelativeTime, cn } from "@/lib/utils";
import type { VisitorInsight } from "@/types/visitor";

const FREQUENCY_LABEL: Record<VisitorInsight["visitFrequency"], string> = {
  daily: "Daily",
  weekly: "Weekly",
  occasional: "Occasional",
  "one-time": "One-time",
};

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

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius-md)] border border-border bg-surface-1 p-4 transition-colors sm:flex-row sm:items-center sm:gap-4",
        !locked && "hover:border-accent-primary/40 cursor-pointer",
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
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar name={visitor.displayName} src={visitor.avatarUrl} size="md" />
        <div className="min-w-0 flex-1">
          <p className={cn("truncate text-sm font-medium text-text-primary", locked && "blur-[4px] select-none")}>
            @{visitor.username}
          </p>
          <div className="mt-1">
            <StatusBadge status={visitor.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:flex sm:items-center sm:gap-6 sm:text-sm">
        <div>
          <p className="text-text-secondary sm:hidden">Interest score</p>
          <p className="font-semibold text-text-primary sm:w-12">{visitor.interestScore}</p>
        </div>
        <div>
          <p className="text-text-secondary sm:hidden">Last activity</p>
          <p className="text-text-secondary sm:w-24">{formatRelativeTime(visitor.lastActivityAt)}</p>
        </div>
        <div>
          <p className="text-text-secondary sm:hidden">Frequency</p>
          <p className="text-text-secondary sm:w-20">{FREQUENCY_LABEL[visitor.visitFrequency]}</p>
        </div>
        <div className="flex items-center sm:w-24 sm:justify-end">
          {locked ? (
            <button
              type="button"
              onClick={onUnlockClick}
              className="flex items-center gap-1.5 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-2.5 py-1 text-xs font-medium text-violet-300 hover:bg-accent-primary/20"
            >
              <Lock className="h-3 w-3" aria-hidden="true" />
              Unlock
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              View
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

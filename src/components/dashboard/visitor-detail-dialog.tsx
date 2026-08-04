import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "./status-badge";
import { formatRelativeTime } from "@/lib/utils";
import type { VisitorInsight } from "@/types/visitor";

export function VisitorDetailDialog({
  visitor,
  onOpenChange,
}: {
  visitor: VisitorInsight | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!visitor} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {visitor && (
          <>
            <DialogHeader>
              <DialogTitle>Visitor detail</DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-3">
              <Avatar name={visitor.displayName} src={visitor.avatarUrl} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-text-primary">@{visitor.username}</p>
                <div className="mt-1">
                  <StatusBadge status={visitor.status} />
                </div>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-text-secondary">Interest score</dt>
                <dd className="font-medium text-text-primary">{visitor.interestScore} / 100</dd>
              </div>
              <div>
                <dt className="text-xs text-text-secondary">Visit frequency</dt>
                <dd className="font-medium capitalize text-text-primary">{visitor.visitFrequency}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-secondary">Last activity</dt>
                <dd className="font-medium text-text-primary">{formatRelativeTime(visitor.lastActivityAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-secondary">First detected</dt>
                <dd className="font-medium text-text-primary">{formatRelativeTime(visitor.firstDetectedAt)}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <p className="mb-2 text-xs font-medium text-text-secondary">Recent timeline</p>
              <ul className="space-y-2">
                {visitor.timeline.map((entry) => (
                  <li key={entry.id} className="flex items-center justify-between rounded-[var(--radius-md)] bg-surface-2 px-3 py-2 text-xs">
                    <span className="text-text-primary">{entry.label}</span>
                    <span className="text-text-secondary">{formatRelativeTime(entry.timestamp)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="secondary" className="mt-5 w-full" disabled>
              <Download className="h-4 w-4" />
              Export (Pro plan required)
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

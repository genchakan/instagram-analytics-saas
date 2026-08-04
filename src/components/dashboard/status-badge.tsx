import { Badge } from "@/components/ui/badge";
import type { VisitorStatus } from "@/types/visitor";

const STATUS_CONFIG: Record<VisitorStatus, { label: string; variant: "success" | "accent" | "neutral" | "warning" }> = {
  "active-now": { label: "Active now", variant: "success" },
  "recently-active": { label: "Recently active", variant: "accent" },
  "returning-visitor": { label: "Returning visitor", variant: "neutral" },
  "new-signal": { label: "New signal", variant: "warning" },
};

export function StatusBadge({ status }: { status: VisitorStatus }) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

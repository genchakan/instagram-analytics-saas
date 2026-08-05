"use client";

import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/locale";
import type { VisitorStatus } from "@/types/visitor";

const STATUS_CONFIG: Record<VisitorStatus, { labelKey: string; variant: "success" | "accent" | "neutral" | "warning" }> = {
  "active-now": { labelKey: "status.activeNow", variant: "success" },
  "recently-active": { labelKey: "status.recentlyActive", variant: "accent" },
  "returning-visitor": { labelKey: "status.returningVisitor", variant: "neutral" },
  "new-signal": { labelKey: "status.newSignal", variant: "warning" },
};

export function StatusBadge({ status }: { status: VisitorStatus }) {
  const { t } = useLocale();
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{t(config.labelKey)}</Badge>;
}

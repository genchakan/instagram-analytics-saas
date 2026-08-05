"use client";

import { Lock } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { DEMO_VISITORS } from "@/data/demo-dashboard";
import { maskUsername } from "@/lib/utils";
import { useLocale } from "@/lib/locale";

const STATUS_KEY: Record<string, string> = {
  "active-now": "status.activeNow",
  "recently-active": "status.recentlyActive",
  "returning-visitor": "status.returningVisitor",
  "new-signal": "status.newSignal",
};

export function VisitorInsightsShowcase() {
  const { t } = useLocale();
  const visitors = DEMO_VISITORS.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          align="left"
          eyebrow={t("mkt.visitorInsightsEyebrow")}
          title={t("mkt.visitorInsightsTitle")}
          description={t("mkt.visitorInsightsDesc")}
        />

        <div className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-xs text-text-secondary">{t("mkt.recentVisitors")}</p>
            <Badge variant="demo">{t("mkt.demoData")}</Badge>
          </div>
          <div className="space-y-1.5">
            {visitors.map((visitor, index) => (
              <div
                key={visitor.id}
                className="flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-2.5 hover:bg-surface-2"
              >
                <Avatar
                  name={visitor.displayName}
                  src={visitor.avatarUrl}
                  size="sm"
                  className={index !== 0 ? "blur-[1px] grayscale-[0.3]" : undefined}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">
                    @{index === 0 ? visitor.username : maskUsername(visitor.username)}
                  </p>
                  <p className="text-xs text-text-secondary">{t(STATUS_KEY[visitor.status] ?? "")}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">{visitor.interestScore}</span>
                  {index !== 0 && <Lock className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

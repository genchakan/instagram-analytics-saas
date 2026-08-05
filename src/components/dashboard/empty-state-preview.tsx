"use client";

import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DemoBadge } from "./demo-badge";
import { Avatar } from "@/components/ui/avatar";
import { getDemoMetrics, DEMO_VISITORS } from "@/data/demo-dashboard";
import { maskUsername } from "@/lib/utils";
import { useAppState } from "@/lib/app-state";
import { useLocale } from "@/lib/locale";

export function EmptyStatePreview() {
  const { setConnectModalOpen } = useAppState();
  const { t } = useLocale();
  const visitors = DEMO_VISITORS.slice(0, 4);

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium text-text-secondary">{t("dash.peekTitle")}</p>
        <DemoBadge label={t("dash.demoPreview")} />
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none opacity-60 blur-[1.5px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
            maskImage: "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
          }}
        >
          <div className="grid grid-cols-3 gap-3">
            {getDemoMetrics(t).map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-4">
                  <p className="text-xs text-text-secondary">{metric.label}</p>
                  <p className="mt-1.5 text-lg font-semibold text-text-primary">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardContent className="flex flex-col gap-2.5 p-4 sm:p-5">
              {visitors.map((visitor) => (
                <div key={visitor.id} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface-2 p-3">
                  <Avatar name={visitor.displayName} src={visitor.avatarUrl} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">@{maskUsername(visitor.username)}</p>
                    <p className="text-xs text-text-secondary">
                      {t("dash.interestScore", { score: visitor.interestScore })}
                    </p>
                  </div>
                  <Lock className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden="true" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(7,8,18,0.85),transparent_70%)] sm:h-56 sm:w-56"
          />
          <button
            type="button"
            onClick={() => setConnectModalOpen(true)}
            className="gradient-cta relative flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(225,48,108,0.5)] transition-opacity hover:opacity-90"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            {t("dash.unlockCta")}
          </button>
        </div>
      </div>
    </div>
  );
}

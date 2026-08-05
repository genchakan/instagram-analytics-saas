"use client";

import { useAppState } from "@/lib/app-state";
import { SetupChecklist } from "@/components/dashboard/setup-checklist";
import { EmptyStatePreview } from "@/components/dashboard/empty-state-preview";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ActivityChartCard } from "@/components/dashboard/activity-chart-card";
import { VisitorsPreviewCard } from "@/components/dashboard/visitors-preview-card";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { InterestBreakdownCard } from "@/components/dashboard/interest-breakdown-card";
import { ConnectedAccountCard } from "@/components/dashboard/connected-account-card";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { useLocale } from "@/lib/locale";
import { getDemoMetrics, getDemoActivityEvents, DEMO_VISITORS } from "@/data/demo-dashboard";

export default function DashboardOverviewPage() {
  const { account } = useAppState();
  const { t } = useLocale();
  const topVisitor = DEMO_VISITORS[0];
  const otherVisitorCount = DEMO_VISITORS.length - 1;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">{t("dpages.overviewTitle")}</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {account
            ? t("dpages.overviewSubConnected", { username: `@${topVisitor.username}`, count: otherVisitorCount })
            : t("dpages.overviewSubEmpty")}
        </p>
      </div>

      {!account ? (
        <div className="flex flex-col gap-6">
          <SetupChecklist />
          <EmptyStatePreview />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <DemoBadge />
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {getDemoMetrics(t).map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
              <VisitorsPreviewCard />
              <ActivityChartCard />
            </div>
            <div className="flex min-w-0 flex-col gap-6">
              <ConnectedAccountCard />
              <InterestBreakdownCard />
            </div>
          </div>

          <ActivityTimeline events={getDemoActivityEvents(t)} />
        </div>
      )}
    </div>
  );
}

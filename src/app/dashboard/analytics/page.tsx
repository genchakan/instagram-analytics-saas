"use client";

import { DemoBadge } from "@/components/dashboard/demo-badge";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ActivityChartCard } from "@/components/dashboard/activity-chart-card";
import { InterestBreakdownCard } from "@/components/dashboard/interest-breakdown-card";
import { getDemoMetrics } from "@/data/demo-dashboard";
import { useLocale } from "@/lib/locale";

export default function AnalyticsPage() {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">{t("dpages.analyticsTitle")}</h1>
          <p className="mt-1 text-sm text-text-secondary">{t("dpages.analyticsSubtitle")}</p>
        </div>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {getDemoMetrics(t).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ActivityChartCard />
        </div>
        <InterestBreakdownCard />
      </div>
    </div>
  );
}

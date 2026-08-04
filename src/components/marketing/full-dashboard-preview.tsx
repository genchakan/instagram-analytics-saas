import { MetricCard } from "@/components/dashboard/metric-card";
import { ActivityChartCard } from "@/components/dashboard/activity-chart-card";
import { VisitorsPreviewCard } from "@/components/dashboard/visitors-preview-card";
import { InterestBreakdownCard } from "@/components/dashboard/interest-breakdown-card";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { StaticConnectedAccount } from "./static-connected-account";
import { DEMO_METRICS } from "@/data/demo-dashboard";

/**
 * The real, populated dashboard — shown on the landing page so a visitor
 * can see exactly what they'll get before creating an account. Reuses
 * the same dashboard widgets (fed by demo data) as `/dashboard` itself.
 */
export function FullDashboardPreview() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none rounded-[var(--radius-xl)] border border-border bg-surface-1/60 p-3 shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_40px_100px_-24px_rgba(109,94,247,0.35)] backdrop-blur sm:p-5 lg:p-6"
    >
      <div className="mb-4 flex justify-end">
        <DemoBadge />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {DEMO_METRICS.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ActivityChartCard />
        </div>
        <div className="min-w-0">
          <InterestBreakdownCard />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <VisitorsPreviewCard />
        </div>
        <div className="min-w-0">
          <StaticConnectedAccount />
        </div>
      </div>
    </div>
  );
}

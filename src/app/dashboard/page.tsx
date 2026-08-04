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
import { DEMO_METRICS, DEMO_ACTIVITY_EVENTS } from "@/data/demo-dashboard";

export default function DashboardOverviewPage() {
  const { user, account } = useAppState();
  const firstName = user?.fullName.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Welcome, {firstName}.</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {account
            ? "Here's what's happening around your profile."
            : "Connect your Instagram profile to begin building your activity dashboard."}
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

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {DEMO_METRICS.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
              <ActivityChartCard />
              <VisitorsPreviewCard />
            </div>
            <div className="flex min-w-0 flex-col gap-6">
              <ConnectedAccountCard />
              <InterestBreakdownCard />
            </div>
          </div>

          <ActivityTimeline events={DEMO_ACTIVITY_EVENTS} />
        </div>
      )}
    </div>
  );
}

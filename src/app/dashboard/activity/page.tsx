"use client";

import { DemoBadge } from "@/components/dashboard/demo-badge";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { getDemoActivityEvents } from "@/data/demo-dashboard";
import { useLocale } from "@/lib/locale";

export default function ActivityPage() {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">{t("dpages.activityTitle")}</h1>
          <p className="mt-1 text-sm text-text-secondary">{t("dpages.activitySubtitle")}</p>
        </div>
        <DemoBadge />
      </div>

      <ActivityTimeline events={getDemoActivityEvents(t)} title={t("dpages.allActivity")} />
    </div>
  );
}

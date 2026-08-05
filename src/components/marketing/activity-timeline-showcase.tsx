"use client";

import { Activity, MessageCircle, RotateCcw, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { getDemoActivityEvents } from "@/data/demo-dashboard";
import { formatRelativeTime } from "@/lib/utils";
import { useLocale } from "@/lib/locale";

const ICONS: Record<string, typeof Activity> = {
  "profile-activity": Activity,
  "engagement-signal": MessageCircle,
  "returning-visitor": RotateCcw,
  "report-generated": FileText,
};

export function ActivityTimelineShowcase() {
  const { t } = useLocale();
  return (
    <section id="dashboard-preview" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 rounded-[var(--radius-lg)] border border-border bg-surface-1 p-5 sm:p-6 lg:order-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-text-primary">{t("dash.activityTimeline")}</p>
            <Badge variant="demo">{t("mkt.demoData")}</Badge>
          </div>
          <ol className="space-y-4">
            {getDemoActivityEvents(t).map((event) => {
              const Icon = ICONS[event.type] ?? Activity;
              return (
                <li key={event.id} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2">
                    <Icon className="h-4 w-4 text-accent-secondary" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">{event.title}</p>
                    <p className="text-sm text-text-secondary">{event.description}</p>
                    <p className="mt-0.5 text-xs text-text-secondary/70">
                      {formatRelativeTime(event.timestamp)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <SectionHeading
          align="left"
          eyebrow={t("dash.activityTimeline")}
          title={t("mkt.activityShowcaseTitle")}
          description={t("mkt.activityShowcaseDesc")}
          className="order-1 lg:order-2"
        />
      </div>
    </section>
  );
}

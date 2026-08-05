"use client";

import { Activity, MessageCircle, RotateCcw, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import { useLocale } from "@/lib/locale";
import type { ActivityEvent, ActivityEventType } from "@/types/analytics";

const ICONS: Record<ActivityEventType, typeof Activity> = {
  "profile-activity": Activity,
  "engagement-signal": MessageCircle,
  "returning-visitor": RotateCcw,
  "report-generated": FileText,
};

export function ActivityTimeline({ events, title }: { events: ActivityEvent[]; title?: string }) {
  const { t } = useLocale();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title ?? t("dash.activityTimeline")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {events.map((event) => {
            const Icon = ICONS[event.type];
            return (
              <li key={event.id} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2">
                  <Icon className="h-4 w-4 text-accent-secondary" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">{event.title}</p>
                  <p className="text-sm text-text-secondary">{event.description}</p>
                  <p className="mt-0.5 text-xs text-text-secondary/70">{formatRelativeTime(event.timestamp)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}

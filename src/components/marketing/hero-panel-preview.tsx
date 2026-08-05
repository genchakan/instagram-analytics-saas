"use client";

import { ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { LOCALE_TO_INTL_TAG, useLocale } from "@/lib/locale";
import { DEMO_VISITORS, DEMO_ACTIVITY_SERIES_7D, getDemoMetrics } from "@/data/demo-dashboard";

// Illustrative per-row stats for the hero preview only — the real
// VisitorInsight type has no raw "views"/"total time" fields, and this
// panel exists purely to look convincing next to the headline.
const ROW_STATS = [
  { views: 12, time: "3h 24m", mostEngaged: true },
  { views: 9, time: "1h 46m" },
  { views: 7, time: "1h 12m" },
  { views: 6, time: "56m" },
  { views: 5, time: "42m" },
];

function useSparkline() {
  const values = DEMO_ACTIVITY_SERIES_7D.map((p) => p.profileViews);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const w = 100;
  const h = 32;
  const stepX = w / (values.length - 1);
  const coords = values.map((v, i) => {
    const x = i * stepX;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  return { coords, line, area, w, h };
}

export function HeroPanelPreview() {
  const { t, locale } = useLocale();
  const rows = DEMO_VISITORS.slice(0, 5).map((visitor, i) => ({ visitor, stats: ROW_STATS[i]! }));
  const { coords, line, area, w, h } = useSparkline();
  const dayLabels = DEMO_ACTIVITY_SERIES_7D.map((p) =>
    new Date(p.date).toLocaleDateString(LOCALE_TO_INTL_TAG[locale], {
      month: "short",
      day: "numeric",
    }),
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none rounded-[var(--radius-xl)] border border-border bg-surface-1/80 p-4 shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_40px_100px_-24px_rgba(109,94,247,0.35)] backdrop-blur sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-text-primary">{t("mkt.topVisitorsTitle")}</p>
        <span className="text-xs text-text-secondary">{t("topbar.last7Days")}</span>
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {rows.map(({ visitor, stats }, index) => (
          <li key={visitor.id} className="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[10px] font-semibold text-text-secondary">
              {index + 1}
            </span>
            <Avatar name={visitor.displayName} src={visitor.avatarUrl} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-medium text-text-primary">@{visitor.username}</span>
                {stats.mostEngaged && (
                  <Badge variant="accent" className="hidden shrink-0 text-[10px] sm:inline-flex">
                    {t("mkt.mostEngaged")}
                  </Badge>
                )}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs font-semibold text-text-primary">
                <AnimatedNumber value={stats.views} />
              </p>
              <p className="text-[10px] text-text-secondary">{t("mkt.viewsLabel")}</p>
            </div>
            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-xs font-semibold text-text-primary">{stats.time}</p>
              <p className="text-[10px] text-text-secondary">{t("mkt.totalTimeLabel")}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden="true" />
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-[var(--radius-md)] border border-border bg-surface-2/40 p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-text-secondary">{t("mkt.activityOverviewTitle")}</p>
          <span className="text-[10px] text-text-secondary">{t("topbar.last7Days")}</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full sm:h-16" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroSparklineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#heroSparklineFill)" stroke="none" />
          <path d={line} fill="none" stroke="#8B5CF6" strokeWidth="1.2" />
          {coords.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.4" fill="#8B5CF6" />
          ))}
        </svg>
        <div className="mt-1 flex justify-between text-[10px] text-text-secondary">
          {dayLabels.map((label, i) => (
            <span key={i} className={i !== 0 && i !== dayLabels.length - 1 ? "hidden sm:inline" : undefined}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {getDemoMetrics(t).map((metric) => (
          <div key={metric.id} className="rounded-[var(--radius-md)] border border-border bg-surface-2/40 p-2.5">
            <p className="text-sm font-semibold text-text-primary sm:text-base">
              <AnimatedNumber value={metric.value} />
            </p>
            <p className="mt-0.5 truncate text-[10px] text-text-secondary">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <DemoBadge />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/locale";
import { DEMO_ACTIVITY_SERIES_7D, DEMO_ACTIVITY_SERIES_30D } from "@/data/demo-dashboard";
import type { DailyActivityPoint } from "@/types/analytics";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-surface-2 px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-medium text-text-primary">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function useSummarize(data: DailyActivityPoint[]): string {
  const { t } = useLocale();
  const first = data[0];
  const last = data[data.length - 1];
  if (!first || !last) return "";
  const change = Math.round(((last.profileViews - first.profileViews) / first.profileViews) * 100);
  return t("dash.chartSummary", {
    firstValue: first.profileViews.toLocaleString(),
    firstDate: first.date,
    lastValue: last.profileViews.toLocaleString(),
    lastDate: last.date,
    change: `${change > 0 ? "+" : ""}${change}`,
  });
}

export function ActivityChartCardInner() {
  const { t } = useLocale();
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const data = range === "7d" ? DEMO_ACTIVITY_SERIES_7D : DEMO_ACTIVITY_SERIES_30D;
  const summary = useSummarize(data);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{t("dash.visitorActivity")}</CardTitle>
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 p-0.5">
          {(["7d", "30d"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={cn(
                "min-h-8 rounded-full px-3 text-xs font-medium transition-colors",
                range === r ? "bg-accent-primary text-white" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {r === "7d" ? t("dash.days7") : t("dash.days30")}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="sr-only">{summary}</p>
        <div className="h-56 w-full sm:h-64" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1F2437" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: string) => v.slice(5)}
                minTickGap={24}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={52}
                tickFormatter={(v: number) => v.toLocaleString()}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="profileViews"
                name={t("dash.profileViews")}
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#viewsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

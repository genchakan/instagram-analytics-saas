"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLocale } from "@/lib/locale";
import { DEMO_INTEREST_BREAKDOWN } from "@/data/demo-dashboard";

const SEGMENTS = [
  { key: "veryHigh", labelKey: "dash.segmentVeryHigh", color: "bg-accent-highlight" },
  { key: "high", labelKey: "dash.segmentHigh", color: "bg-accent-primary" },
  { key: "medium", labelKey: "dash.segmentMedium", color: "bg-accent-secondary" },
  { key: "lowData", labelKey: "dash.segmentLowData", color: "bg-surface-2" },
] as const;

export function InterestBreakdownCard() {
  const { t } = useLocale();
  const total = Object.values(DEMO_INTEREST_BREAKDOWN).reduce((a, b) => a + b, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dash.interestBreakdown")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full">
          {SEGMENTS.map((segment) => {
            const value = DEMO_INTEREST_BREAKDOWN[segment.key];
            const pct = (value / total) * 100;
            return <div key={segment.key} className={segment.color} style={{ width: `${pct}%` }} />;
          })}
        </div>

        <ul className="mt-4 flex flex-col gap-2.5">
          {SEGMENTS.map((segment) => {
            const value = DEMO_INTEREST_BREAKDOWN[segment.key];
            const pct = Math.round((value / total) * 100);
            return (
              <li key={segment.key} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-text-secondary">
                  <span className={`h-2 w-2 rounded-full ${segment.color}`} />
                  {t(segment.labelKey)}
                </span>
                <span className="font-medium text-text-primary">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

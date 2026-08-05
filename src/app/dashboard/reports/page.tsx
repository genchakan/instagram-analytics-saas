"use client";

import { useRouter } from "next/navigation";
import { FileText, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { formatRelativeTime } from "@/lib/utils";
import { useLocale } from "@/lib/locale";

const DEMO_REPORTS = [
  { id: "r1", titleKey: "dpages.reportWeekly", generatedAt: "2026-08-01T09:00:00Z", locked: false },
  { id: "r2", titleKey: "dpages.reportVisitorSummary", generatedAt: "2026-07-25T09:00:00Z", locked: true },
  { id: "r3", titleKey: "dpages.reportEngagement", generatedAt: "2026-07-18T09:00:00Z", locked: true },
  { id: "r4", titleKey: "dpages.reportWeekly", generatedAt: "2026-07-11T09:00:00Z", locked: true },
];

export default function ReportsPage() {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">{t("dpages.reportsTitle")}</h1>
          <p className="mt-1 text-sm text-text-secondary">{t("dpages.reportsSubtitle")}</p>
        </div>
        <DemoBadge />
      </div>

      <div className="flex flex-col gap-3">
        {DEMO_REPORTS.map((report) => (
          <Card key={report.id}>
            <CardContent className="flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-surface-2">
                <FileText className="h-4.5 w-4.5 text-accent-secondary" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">{t(report.titleKey)}</p>
                <p className="text-xs text-text-secondary">
                  {t("dpages.generated", { time: formatRelativeTime(report.generatedAt) })}
                </p>
              </div>
              {report.locked ? (
                <Button size="sm" variant="secondary" onClick={() => router.push("/pricing")}>
                  <Lock className="h-3.5 w-3.5" />
                  {t("dpages.upgrade")}
                </Button>
              ) : (
                <Button size="sm" variant="secondary" disabled>
                  {t("dpages.view")}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

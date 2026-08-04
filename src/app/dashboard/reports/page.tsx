"use client";

import { useRouter } from "next/navigation";
import { FileText, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { formatRelativeTime } from "@/lib/utils";

const DEMO_REPORTS = [
  { id: "r1", title: "Weekly activity report", generatedAt: "2026-08-01T09:00:00Z", locked: false },
  { id: "r2", title: "Visitor interest summary", generatedAt: "2026-07-25T09:00:00Z", locked: true },
  { id: "r3", title: "Engagement pattern report", generatedAt: "2026-07-18T09:00:00Z", locked: true },
  { id: "r4", title: "Weekly activity report", generatedAt: "2026-07-11T09:00:00Z", locked: true },
];

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Reports</h1>
          <p className="mt-1 text-sm text-text-secondary">Generated summaries of your profile activity.</p>
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
                <p className="truncate text-sm font-medium text-text-primary">{report.title}</p>
                <p className="text-xs text-text-secondary">Generated {formatRelativeTime(report.generatedAt)}</p>
              </div>
              {report.locked ? (
                <Button size="sm" variant="secondary" onClick={() => router.push("/pricing")}>
                  <Lock className="h-3.5 w-3.5" />
                  Upgrade
                </Button>
              ) : (
                <Button size="sm" variant="secondary" disabled>
                  View
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

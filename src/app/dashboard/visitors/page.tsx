"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/dashboard/demo-badge";
import { VisitorRow } from "@/components/dashboard/visitor-row";
import { VisitorDetailDialog } from "@/components/dashboard/visitor-detail-dialog";
import { DEMO_VISITORS } from "@/data/demo-dashboard";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import type { VisitorInsight, VisitorStatus } from "@/types/visitor";

export default function VisitorsPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VisitorStatus | "all">("all");
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState<VisitorInsight | null>(null);

  const STATUS_FILTERS: { value: VisitorStatus | "all"; label: string }[] = [
    { value: "all", label: t("dpages.statusAll") },
    { value: "active-now", label: t("status.activeNow") },
    { value: "recently-active", label: t("status.recentlyActive") },
    { value: "returning-visitor", label: t("status.returningVisitor") },
    { value: "new-signal", label: t("status.newSignal") },
  ];

  const visitors = useMemo(() => {
    let list = [...DEMO_VISITORS];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (v) => v.username.toLowerCase().includes(q) || v.displayName.toLowerCase().includes(q),
      );
    }
    if (status !== "all") {
      list = list.filter((v) => v.status === status);
    }
    list.sort((a, b) => (sortDesc ? b.interestScore - a.interestScore : a.interestScore - b.interestScore));
    return list;
  }, [query, status, sortDesc]);

  const lockedCount = DEMO_VISITORS.filter((v) => v.isLocked).length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">{t("dpages.visitorsTitle")}</h1>
          <DemoBadge />
        </div>
        <p className="text-sm text-text-secondary">{t("dpages.visitorsSubtitle")}</p>
      </div>

      {lockedCount > 0 && (
        <div className="flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-accent-primary/30 bg-accent-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-primary">{t("dpages.lockedNotice", { count: lockedCount })}</p>
          <Button size="sm" onClick={() => router.push("/pricing")} className="w-full sm:w-auto">
            {t("dash.unlockAllVisitors")}
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("dpages.searchPlaceholder")}
            className="pl-10"
            aria-label={t("dpages.searchAria")}
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as VisitorStatus | "all")}
          aria-label={t("dpages.filterAria")}
          className="h-11 rounded-[var(--radius-md)] border border-border bg-surface-1 px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary"
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setSortDesc((v) => !v)}
          className={cn(
            "flex h-11 items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-border bg-surface-1 px-3.5 text-sm text-text-secondary hover:text-text-primary",
          )}
        >
          <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
          {t("dpages.sortInterest", { direction: sortDesc ? t("dpages.sortHighLow") : t("dpages.sortLowHigh") })}
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {visitors.length === 0 ? (
          <p className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-8 text-center text-sm text-text-secondary">
            {t("dpages.noVisitorsMatch")}
          </p>
        ) : (
          visitors.map((visitor) => (
            <VisitorRow
              key={visitor.id}
              visitor={visitor}
              onClick={() => setSelected(visitor)}
              onUnlockClick={() => router.push("/pricing")}
            />
          ))
        )}
      </div>

      <VisitorDetailDialog visitor={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}

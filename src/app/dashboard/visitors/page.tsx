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
import { cn } from "@/lib/utils";
import type { VisitorInsight, VisitorStatus } from "@/types/visitor";

const STATUS_FILTERS: { value: VisitorStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "active-now", label: "Active now" },
  { value: "recently-active", label: "Recently active" },
  { value: "returning-visitor", label: "Returning visitor" },
  { value: "new-signal", label: "New signal" },
];

export default function VisitorsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VisitorStatus | "all">("all");
  const [sortDesc, setSortDesc] = useState(true);
  const [selected, setSelected] = useState<VisitorInsight | null>(null);

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
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Visitors</h1>
          <DemoBadge />
        </div>
        <p className="text-sm text-text-secondary">
          Everyone showing activity signals connected to your profile.
        </p>
      </div>

      {lockedCount > 0 && (
        <div className="flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-accent-primary/30 bg-accent-primary/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-primary">
            {lockedCount} more visitors are locked on the free plan.
          </p>
          <Button size="sm" onClick={() => router.push("/pricing")} className="w-full sm:w-auto">
            Unlock All Visitors
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username"
            className="pl-10"
            aria-label="Search visitors"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as VisitorStatus | "all")}
          aria-label="Filter by status"
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
          Interest score {sortDesc ? "high → low" : "low → high"}
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {visitors.length === 0 ? (
          <p className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-8 text-center text-sm text-text-secondary">
            No visitors match your filters.
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

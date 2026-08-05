"use client";

import { Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { DASHBOARD_NAV } from "@/data/navigation";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

const HIGHLIGHTS: { href: string; number: number; titleKey: string; descKey: string }[] = [
  { href: "/dashboard/visitors", number: 1, titleKey: "mkt.tourVisitorsTitle", descKey: "mkt.tourVisitorsDesc" },
  { href: "/dashboard/activity", number: 2, titleKey: "mkt.tourActivityTitle", descKey: "mkt.tourActivityDesc" },
  { href: "/dashboard/analytics", number: 3, titleKey: "mkt.tourAnalyticsTitle", descKey: "mkt.tourAnalyticsDesc" },
  { href: "/dashboard/reports", number: 4, titleKey: "mkt.tourReportsTitle", descKey: "mkt.tourReportsDesc" },
];

export function PanelTour() {
  const { t } = useLocale();

  return (
    <section id="dashboard-preview" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading eyebrow={t("mkt.tourEyebrow")} title={t("mkt.tourTitle")} description={t("mkt.tourDesc")} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
        {/* Mini sidebar mockup — a non-interactive, illustrative echo of the
            real dashboard nav, so visitors see the actual tab list before
            ever connecting an account. */}
        <div
          aria-hidden="true"
          className="select-none rounded-[var(--radius-lg)] border border-border bg-surface-1 p-4"
        >
          <div className="mb-4 flex items-center gap-2 px-1 text-sm font-semibold text-text-primary">
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
              <Sparkles className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </span>
            Orbit
          </div>
          <ul className="flex flex-col gap-1">
            {DASHBOARD_NAV.map((item) => {
              const highlight = HIGHLIGHTS.find((h) => h.href === item.href);
              return (
                <li
                  key={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-sm",
                    highlight ? "bg-accent-primary/10 text-text-primary" : "text-text-secondary",
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1 truncate">{t(item.labelKey)}</span>
                  {highlight && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-primary text-[11px] font-bold text-white">
                      {highlight.number}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Legend explaining the four highlighted tabs */}
        <div className="grid gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.number}
              className="flex gap-3 rounded-[var(--radius-lg)] border border-border bg-surface-1 p-4 sm:p-5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-primary text-xs font-bold text-white">
                {h.number}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary">{t(h.titleKey)}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">{t(h.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

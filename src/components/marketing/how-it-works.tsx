"use client";

import { UserPlus, Link2, LayoutDashboard } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useLocale } from "@/lib/locale";

export function HowItWorks() {
  const { t } = useLocale();
  const STEPS = [
    { icon: UserPlus, titleKey: "mkt.step1Title", descKey: "mkt.step1Desc" },
    { icon: Link2, titleKey: "mkt.step2Title", descKey: "mkt.step2Desc" },
    { icon: LayoutDashboard, titleKey: "mkt.step3Title", descKey: "mkt.step3Desc" },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow={t("mkt.howItWorksEyebrow")}
        title={t("mkt.howItWorksTitle")}
        description={t("mkt.howItWorksDesc")}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.titleKey} className="relative rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
              <step.icon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <p className="mb-1 text-xs font-semibold text-accent-secondary">
              {t("mkt.step", { number: index + 1 })}
            </p>
            <h3 className="mb-1.5 text-base font-semibold text-text-primary">{t(step.titleKey)}</h3>
            <p className="text-sm text-text-secondary">{t(step.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

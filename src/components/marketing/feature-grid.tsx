"use client";

import { Activity, Users, LineChart, Bell, FileDown, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useLocale } from "@/lib/locale";

export function FeatureGrid() {
  const { t } = useLocale();
  const FEATURES = [
    { icon: Users, titleKey: "mkt.feat1Title", descKey: "mkt.feat1Desc" },
    { icon: Activity, titleKey: "mkt.feat2Title", descKey: "mkt.feat2Desc" },
    { icon: LineChart, titleKey: "mkt.feat3Title", descKey: "mkt.feat3Desc" },
    { icon: Bell, titleKey: "mkt.feat4Title", descKey: "mkt.feat4Desc" },
    { icon: FileDown, titleKey: "mkt.feat5Title", descKey: "mkt.feat5Desc" },
    { icon: ShieldCheck, titleKey: "mkt.feat6Title", descKey: "mkt.feat6Desc" },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow={t("mkt.featuresEyebrow")}
        title={t("mkt.featuresTitle")}
        description={t("mkt.featuresDesc")}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.titleKey}
            className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6 transition-colors hover:border-accent-primary/40"
          >
            <feature.icon className="mb-3 h-5 w-5 text-accent-secondary" aria-hidden="true" />
            <h3 className="mb-1.5 text-base font-semibold text-text-primary">{t(feature.titleKey)}</h3>
            <p className="text-sm text-text-secondary">{t(feature.descKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { ShieldCheck, KeyRound, Unplug } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useLocale } from "@/lib/locale";

export function PrivacySection() {
  const { t } = useLocale();
  const POINTS = [
    { icon: KeyRound, titleKey: "mkt.priv1Title", descKey: "mkt.priv1Desc" },
    { icon: ShieldCheck, titleKey: "mkt.priv2Title", descKey: "mkt.priv2Desc" },
    { icon: Unplug, titleKey: "mkt.priv3Title", descKey: "mkt.priv3Desc" },
  ];

  return (
    <section className="border-y border-border/60 bg-surface-1/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow={t("mkt.privacyEyebrow")}
          title={t("mkt.privacyTitle")}
          description={t("mkt.privacyDesc")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {POINTS.map((point) => (
            <div key={point.titleKey} className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6">
              <point.icon className="mb-3 h-5 w-5 text-accent-secondary" aria-hidden="true" />
              <h3 className="mb-1.5 text-base font-semibold text-text-primary">{t(point.titleKey)}</h3>
              <p className="text-sm text-text-secondary">{t(point.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

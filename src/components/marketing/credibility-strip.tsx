"use client";

import { useLocale } from "@/lib/locale";

export function CredibilityStrip() {
  const { t } = useLocale();
  const POINTS = [
    t("mkt.credBuiltFor"),
    t("mkt.credPrivate"),
    t("mkt.credPrototype"),
    t("mkt.credNotAffiliated"),
  ];
  return (
    <section className="border-y border-border/60 bg-surface-1/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-center sm:px-6 lg:px-8">
        {POINTS.map((point) => (
          <span key={point} className="text-xs font-medium text-text-secondary sm:text-sm">
            {point}
          </span>
        ))}
      </div>
    </section>
  );
}

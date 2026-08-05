"use client";

import { SectionHeading } from "./section-heading";
import { PricingCards } from "./pricing-cards";
import { useLocale } from "@/lib/locale";

export function PricingPreview() {
  const { t } = useLocale();
  return (
    <section id="pricing-preview" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow={t("mkt.pricingEyebrow")}
        title={t("mkt.pricingTitle")}
        description={t("mkt.pricingDesc")}
      />
      <div className="mt-12">
        <PricingCards compact />
      </div>
    </section>
  );
}

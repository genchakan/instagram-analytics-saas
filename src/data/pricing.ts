import type { PricingPlan } from "@/types/billing";

/**
 * Central pricing configuration. Prices are placeholders for the
 * prototype — never hardcode prices anywhere else in the app.
 *
 * Plan copy is translated: call getPricingPlans(t) / getTrialHeadline(t) /
 * getTrialSubline(t) with the current locale's `t` function rather than
 * importing static strings, since this module has no hook access.
 */
export const TRIAL_LENGTH_DAYS = 7;

export function getTrialHeadline(t: (key: string) => string) {
  return t("pricing.trialHeadline");
}

export function getTrialSubline(t: (key: string) => string) {
  return t("pricing.trialSubline");
}

export function getPricingPlans(t: (key: string) => string): PricingPlan[] {
  return [
    {
      id: "free",
      name: t("pricing.freeName"),
      tagline: t("pricing.freeTagline"),
      priceMonthly: 0,
      priceYearly: 0,
      emphasized: false,
      features: [
        t("pricing.freeFeat1"),
        t("pricing.freeFeat2"),
        t("pricing.freeFeat3"),
        t("pricing.freeFeat4"),
      ],
    },
    {
      id: "pro",
      name: t("pricing.proName"),
      tagline: t("pricing.proTagline"),
      priceMonthly: 2.99,
      priceYearly: 29.9,
      emphasized: true,
      features: [
        t("pricing.proFeat1"),
        t("pricing.proFeat2"),
        t("pricing.proFeat3"),
        t("pricing.proFeat4"),
      ],
    },
    {
      id: "unlimited",
      name: t("pricing.unlimitedName"),
      tagline: t("pricing.unlimitedTagline"),
      priceMonthly: 7.99,
      priceYearly: 79.9,
      emphasized: false,
      features: [
        t("pricing.unlimitedFeat1"),
        t("pricing.unlimitedFeat2"),
        t("pricing.unlimitedFeat3"),
        t("pricing.unlimitedFeat4"),
        t("pricing.unlimitedFeat5"),
        t("pricing.unlimitedFeat6"),
        t("pricing.unlimitedFeat7"),
      ],
    },
  ];
}

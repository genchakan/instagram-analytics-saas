import type { PricingPlan } from "@/types/billing";

/**
 * Central pricing configuration. Prices are placeholders for the
 * prototype — never hardcode prices anywhere else in the app.
 */
export const TRIAL_LENGTH_DAYS = 7;
export const TRIAL_HEADLINE = "1 week free trial";
export const TRIAL_SUBLINE = "No credit card needed";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For getting a first read on your profile",
    priceMonthly: 9,
    priceYearly: 90,
    emphasized: false,
    features: [
      "1 connected profile",
      "7-day activity history",
      "1 visible visitor result",
      "Basic dashboard",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators who track activity every week",
    priceMonthly: 24,
    priceYearly: 240,
    emphasized: true,
    features: [
      "Full visitor list",
      "90-day activity history",
      "Advanced filters",
      "Real-time alerts",
      "PDF & CSV export",
      "Priority support",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    tagline: "For teams managing multiple profiles",
    priceMonthly: 59,
    priceYearly: 590,
    emphasized: false,
    features: [
      "Everything in Pro",
      "Multiple connected profiles",
      "Unlimited activity history",
      "Detailed reports",
      "Team seats",
      "Dedicated support",
    ],
  },
];

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
    id: "free",
    name: "Free",
    tagline: "For getting a first read on your profile",
    priceMonthly: 0,
    priceYearly: 0,
    emphasized: false,
    features: [
      "1 visible visitor result",
      "7-day activity history",
      "Basic dashboard",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators who want more visibility",
    priceMonthly: 2.99,
    priceYearly: 29.9,
    emphasized: true,
    features: [
      "5 visible visitor profiles",
      "Push notifications for new visitors",
      "7-day activity history",
      "Email support",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    tagline: "For creators who want it all",
    priceMonthly: 7.99,
    priceYearly: 79.9,
    emphasized: false,
    features: [
      "Unlimited visible visitors",
      "Push notifications for new visitors",
      "90-day activity history",
      "Advanced filters",
      "Real-time alerts",
      "PDF & CSV export",
      "Priority support",
    ],
  },
];

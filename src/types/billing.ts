export type PlanId = "starter" | "pro" | "unlimited";

export type BillingPeriod = "monthly" | "yearly";

export type SubscriptionStatus = "active" | "trialing" | "canceled" | "none";

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanId;
  status: SubscriptionStatus;
  billingPeriod: BillingPeriod;
  renewalDate: string | null;
  trialEndsAt: string | null;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  emphasized: boolean;
  features: string[];
}

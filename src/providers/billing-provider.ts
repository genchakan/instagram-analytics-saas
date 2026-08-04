import type { BillingPeriod, PlanId, Subscription } from "@/types/billing";

export interface BillingProvider {
  readonly type: "mock" | "stripe";
  subscribe(userId: string, plan: PlanId, period: BillingPeriod): Promise<Subscription>;
  cancel(userId: string): Promise<Subscription>;
}

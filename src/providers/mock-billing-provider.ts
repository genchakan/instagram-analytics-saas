import type { BillingProvider } from "./billing-provider";
import type { BillingPeriod, PlanId, Subscription } from "@/types/billing";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** No real payment processing happens here — see docs/DEMO-MODE.md. */
export class MockBillingProvider implements BillingProvider {
  readonly type = "mock" as const;

  async subscribe(userId: string, plan: PlanId, period: BillingPeriod): Promise<Subscription> {
    await delay(600);
    const renewal = new Date();
    renewal.setMonth(renewal.getMonth() + (period === "yearly" ? 12 : 1));
    return {
      id: `sub_mock_${userId}`,
      userId,
      plan,
      status: "active",
      billingPeriod: period,
      renewalDate: renewal.toISOString(),
      trialEndsAt: null,
    };
  }

  async cancel(userId: string): Promise<Subscription> {
    await delay(400);
    return {
      id: `sub_mock_${userId}`,
      userId,
      plan: "free",
      status: "canceled",
      billingPeriod: "monthly",
      renewalDate: null,
      trialEndsAt: null,
    };
  }
}

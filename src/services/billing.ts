import type { BillingPeriod, PlanId, Subscription } from "@/types/billing";
import { MockBillingProvider } from "@/providers/mock-billing-provider";
import { readStorage, writeStorage, clearStorage } from "@/lib/storage";

const SUBSCRIPTION_KEY = "subscription";
const provider = new MockBillingProvider();

export async function subscribeToPlan(
  userId: string,
  plan: PlanId,
  period: BillingPeriod,
): Promise<Subscription> {
  const subscription = await provider.subscribe(userId, plan, period);
  writeStorage(SUBSCRIPTION_KEY, subscription);
  return subscription;
}

export async function cancelSubscription(userId: string): Promise<Subscription> {
  const subscription = await provider.cancel(userId);
  writeStorage(SUBSCRIPTION_KEY, subscription);
  return subscription;
}

export function getStoredSubscription(): Subscription | null {
  return readStorage<Subscription>(SUBSCRIPTION_KEY);
}

export function clearSubscription(): void {
  clearStorage(SUBSCRIPTION_KEY);
}

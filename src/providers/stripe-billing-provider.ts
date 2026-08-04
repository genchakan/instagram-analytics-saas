import type { BillingProvider } from "./billing-provider";

/**
 * Reserved for a future production integration with Stripe. Not
 * implemented in this prototype — do not add real Stripe keys or calls
 * here until a production billing flow is explicitly approved.
 */
export class StripeBillingProvider implements BillingProvider {
  readonly type = "stripe" as const;

  async subscribe(): Promise<never> {
    throw new Error("StripeBillingProvider is not implemented in this prototype.");
  }

  async cancel(): Promise<never> {
    throw new Error("StripeBillingProvider is not implemented in this prototype.");
  }
}

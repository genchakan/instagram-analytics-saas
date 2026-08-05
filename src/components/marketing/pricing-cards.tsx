"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPricingPlans, getTrialHeadline, getTrialSubline } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/locale";
import { PricingToggle } from "./pricing-toggle";
import { TrialNote } from "./trial-note";
import type { BillingPeriod, PlanId } from "@/types/billing";

export function PricingCards({
  compact = false,
  onSelectPlan,
}: {
  compact?: boolean;
  onSelectPlan?: (plan: PlanId, period: BillingPeriod) => void;
}) {
  const { t } = useLocale();
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const plans = getPricingPlans(t);

  return (
    <div className="flex flex-col items-center gap-8">
      <PricingToggle value={period} onChange={setPeriod} />

      <div className="grid w-full gap-5 sm:grid-cols-3">
        {plans.map((plan) => {
          const price = period === "monthly" ? plan.priceMonthly : plan.priceYearly / 12;
          return (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-[var(--radius-lg)] border p-6",
                plan.emphasized
                  ? "border-accent-primary/50 bg-surface-2 shadow-[0_0_0_1px_rgba(139,92,246,0.25),0_20px_60px_-20px_rgba(139,92,246,0.4)]"
                  : "border-border bg-surface-1",
              )}
            >
              {plan.emphasized && (
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-accent-primary-muted to-accent-highlight px-2.5 py-1 text-xs font-medium text-white">
                  <Sparkles className="h-3 w-3" /> {t("mkt.mostPopular")}
                </span>
              )}
              <h3 className="text-lg font-semibold text-text-primary">{plan.name}</h3>
              <p className="mt-1 text-sm text-text-secondary">{plan.tagline}</p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-text-primary">€{price.toFixed(2)}</span>
                <span className="text-sm text-text-secondary">{t("mkt.perMonth")}</span>
              </p>
              {period === "yearly" && plan.priceYearly > 0 && (
                <p className="text-xs text-text-secondary">
                  {t("mkt.billedYearly", { amount: plan.priceYearly.toFixed(2) })}
                </p>
              )}

              {/* On mobile, cards always stack vertically, so the feature
                  list is what tells plans apart — keep it visible there
                  even in "compact" mode. Only hide it at sm:+ when compact,
                  where cards sit side by side and stay short on purpose. */}
              <ul className={cn("mt-5 flex-1 space-y-2.5", compact && "sm:hidden")}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              {onSelectPlan ? (
                <Button
                  variant={plan.emphasized ? "primary" : "secondary"}
                  className="mt-6 w-full"
                  onClick={() => onSelectPlan(plan.id, period)}
                >
                  {t("mkt.choosePlan", { name: plan.name })}
                </Button>
              ) : (
                <Button
                  asChild
                  variant={plan.emphasized ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  <Link href="/dashboard">
                    {plan.priceMonthly === 0 ? t("mkt.getStartedFreeLower") : t("mkt.startFreeTrial")}
                  </Link>
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <TrialNote />
      <p className="text-center text-xs text-text-secondary">
        {t("mkt.pricingFooter", { headline: getTrialHeadline(t), subline: getTrialSubline(t) })}
      </p>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { BillingPeriod } from "@/types/billing";

interface PricingToggleProps {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}

export function PricingToggle({ value, onChange }: PricingToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-1 p-1"
    >
      {(["monthly", "yearly"] as const).map((period) => (
        <button
          key={period}
          type="button"
          role="radio"
          aria-checked={value === period}
          onClick={() => onChange(period)}
          className={cn(
            "min-h-9 rounded-full px-4 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary",
            value === period ? "bg-accent-primary text-white" : "text-text-secondary hover:text-text-primary",
          )}
        >
          {period}
          {period === "yearly" && <span className="ml-1 text-xs opacity-80">save 17%</span>}
        </button>
      ))}
    </div>
  );
}

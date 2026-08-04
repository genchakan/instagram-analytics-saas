"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { useAppState } from "@/lib/app-state";
import { subscribeToPlan, cancelSubscription } from "@/services/billing";
import { PRICING_PLANS } from "@/data/pricing";
import type { BillingPeriod, PlanId } from "@/types/billing";

export default function BillingPage() {
  const { user, subscription, setSubscription } = useAppState();
  const [loading, setLoading] = useState(false);

  const currentPlan = PRICING_PLANS.find((p) => p.id === subscription?.plan);

  async function handleCancel() {
    if (!user) return;
    setLoading(true);
    const updated = await cancelSubscription(user.id);
    setSubscription(updated);
    setLoading(false);
  }

  async function handleQuickUpgrade() {
    if (!user) return;
    setLoading(true);
    const updated = await subscribeToPlan(user.id, "pro", "monthly");
    setSubscription(updated);
    setLoading(false);
  }

  async function handleSelectPlan(plan: PlanId, period: BillingPeriod) {
    if (!user) return;
    setLoading(true);
    const updated = await subscribeToPlan(user.id, plan, period);
    setSubscription(updated);
    setLoading(false);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Billing</h1>
        <p className="mt-1 text-sm text-text-secondary">Manage your plan and billing details.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-text-primary">{currentPlan?.name ?? "Free trial"}</p>
            <Badge variant={subscription?.status === "active" ? "success" : "neutral"} className="mt-2">
              {subscription?.status === "active" ? "Active" : "No active subscription"}
            </Badge>
          </div>
          <div className="flex gap-2">
            {subscription?.status === "active" ? (
              <Button variant="danger" size="sm" onClick={handleCancel} disabled={loading}>
                {loading ? "Cancelling…" : "Cancel plan"}
              </Button>
            ) : (
              <Button size="sm" onClick={handleQuickUpgrade} disabled={loading}>
                {loading ? "Upgrading…" : "Upgrade to Pro"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-base font-semibold text-text-primary">Change plan</h2>
        <PricingCards onSelectPlan={handleSelectPlan} />
      </div>
    </div>
  );
}

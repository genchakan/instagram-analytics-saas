"use client";

import { useRouter } from "next/navigation";
import { Plus, Lock } from "lucide-react";
import { ConnectedAccountCard } from "@/components/dashboard/connected-account-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountsPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Connected Accounts</h1>
        <p className="mt-1 text-sm text-text-secondary">Manage the Instagram profiles linked to your dashboard.</p>
      </div>

      <ConnectedAccountCard />

      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-dashed border-border">
            <Plus className="h-4 w-4 text-text-secondary" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-text-primary">Add another profile</p>
            <p className="text-xs text-text-secondary">Available on the Unlimited plan.</p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => router.push("/pricing")}>
            <Lock className="h-3.5 w-3.5" />
            Upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

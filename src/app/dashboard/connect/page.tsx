"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectionForm } from "@/components/connection/connection-form";
import { OAuthRedirectingStep } from "@/components/connection/oauth-redirecting-step";
import { useAppState } from "@/lib/app-state";
import type { ConnectedAccount } from "@/types/account";

type Step = "redirecting" | "form";

export default function ConnectPage() {
  const router = useRouter();
  const { user, setAccount } = useAppState();
  const [step, setStep] = useState<Step>("redirecting");

  if (!user) return null;

  function handleSuccess(account: ConnectedAccount) {
    setAccount(account);
    router.push("/dashboard/connect/progress");
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6 sm:p-7">
        {step === "redirecting" && <OAuthRedirectingStep onDone={() => setStep("form")} />}
        {step === "form" && (
          <ConnectionForm userId={user.id} onSuccess={handleSuccess} onCancel={() => router.push("/dashboard")} />
        )}
      </div>
    </div>
  );
}

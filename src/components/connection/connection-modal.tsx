"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ConnectionForm } from "./connection-form";
import { OAuthIntroStep } from "./oauth-intro-step";
import { OAuthRedirectingStep } from "./oauth-redirecting-step";
import { useAppState } from "@/lib/app-state";
import type { ConnectedAccount } from "@/types/account";

type Step = "intro" | "redirecting" | "form";

export function ConnectionModal() {
  const router = useRouter();
  const { user, connectModalOpen, setConnectModalOpen, setAccount } = useAppState();
  const [step, setStep] = useState<Step>("intro");

  if (!user) return null;

  function handleSuccess(account: ConnectedAccount) {
    setAccount(account);
    setConnectModalOpen(false);
    setStep("intro");
    router.push("/dashboard/connect/progress");
  }

  function handleOpenChange(open: boolean) {
    setConnectModalOpen(open);
    if (!open) setStep("intro");
  }

  return (
    <Dialog open={connectModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        {step === "intro" && <OAuthIntroStep onContinue={() => setStep("redirecting")} />}
        {step === "redirecting" && <OAuthRedirectingStep onDone={() => setStep("form")} />}
        {step === "form" && (
          <ConnectionForm
            userId={user.id}
            onSuccess={handleSuccess}
            onCancel={() => setConnectModalOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

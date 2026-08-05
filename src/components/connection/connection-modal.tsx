"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ConnectionForm } from "./connection-form";
import { OAuthRedirectingStep } from "./oauth-redirecting-step";
import { useAppState } from "@/lib/app-state";
import type { ConnectedAccount } from "@/types/account";

type Step = "redirecting" | "form";

export function ConnectionModal() {
  const router = useRouter();
  const { user, connectModalOpen, setConnectModalOpen } = useAppState();
  const [step, setStep] = useState<Step>("redirecting");

  if (!user) return null;

  function handleSuccess(_account: ConnectedAccount) {
    // Intentionally not calling setAccount here: doing so before the route
    // transition finishes would flip the still-mounted /dashboard page to
    // its "connected" view for a frame before we navigate away. The
    // account is already persisted to storage by connectInstagramAccount();
    // the progress page picks it up on mount, once it's the only thing shown.
    setConnectModalOpen(false);
    setStep("redirecting");
    router.push("/dashboard/connect/progress");
  }

  function handleOpenChange(open: boolean) {
    setConnectModalOpen(open);
    if (!open) setStep("redirecting");
  }

  return (
    <Dialog open={connectModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
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

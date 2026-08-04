"use client";

import { AtSign, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OAuthIntroStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500">
        <AtSign className="h-6 w-6 text-white" aria-hidden="true" />
      </span>

      <div>
        <p className="text-base font-semibold text-text-primary">Connect your Instagram account</p>
        <p className="mt-1.5 text-sm text-text-secondary">
          You&apos;ll be securely connected through Instagram to start building your dashboard.
        </p>
      </div>

      <Button size="lg" onClick={onContinue} className="w-full">
        <AtSign className="h-4 w-4" />
        Continue with Instagram
      </Button>

      <p className="flex items-center gap-1.5 text-xs text-text-secondary">
        <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />
        You&apos;ll confirm access on Instagram&apos;s own connection screen.
      </p>
    </div>
  );
}

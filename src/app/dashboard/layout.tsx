"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { DesktopSidebar, MobileSidebarDrawer } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { OnboardingModal } from "@/components/onboarding/onboarding-modal";
import { ConnectionModal } from "@/components/connection/connection-modal";
import { useAppState } from "@/lib/app-state";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, hydrated, onboardingOpen, setOnboardingOpen } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (hydrated && user && !user.onboardingCompleted) {
      setOnboardingOpen(true);
    }
  }, [hydrated, user, setOnboardingOpen]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent-primary" />
        <span className="sr-only">Loading dashboard…</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <DesktopSidebar />
      <MobileSidebarDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onOpenMenu={() => setMobileOpen(true)} />

        {user && !user.emailVerified && (
          <div className="flex items-center gap-2 border-b border-warning/20 bg-warning/10 px-4 py-2.5 text-xs text-warning sm:px-6">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Verify your email to secure your account.
          </div>
        )}

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      <OnboardingModal open={onboardingOpen} onOpenChange={setOnboardingOpen} />
      <ConnectionModal />
    </div>
  );
}

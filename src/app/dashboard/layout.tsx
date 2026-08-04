"use client";

import { useState } from "react";
import { DesktopSidebar, MobileSidebarDrawer } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { ConnectionModal } from "@/components/connection/connection-modal";
import { useAppState } from "@/lib/app-state";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { hydrated } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);

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

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      <ConnectionModal />
    </div>
  );
}

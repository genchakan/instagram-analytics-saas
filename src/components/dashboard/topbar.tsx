"use client";

import Link from "next/link";
import { Menu, Bell, Sparkles, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useAppState } from "@/lib/app-state";

export function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { user, account } = useAppState();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-text-primary lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        {account ? (
          <div className="flex items-center gap-2">
            <Avatar name={account.displayName} src={account.avatarUrl} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">@{account.username}</p>
              <p className="hidden text-xs text-text-secondary sm:block">Last synced just now</p>
            </div>
          </div>
        ) : (
          <p className="truncate text-sm font-medium text-text-secondary">No profile connected</p>
        )}
      </div>

      <button
        type="button"
        className="hidden items-center gap-1.5 rounded-[var(--radius-md)] border border-border px-3 py-2 text-sm text-text-secondary hover:text-text-primary sm:flex"
      >
        Last 7 days
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:bg-surface-1 hover:text-text-primary"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-accent-highlight" />
      </button>

      <Link
        href="/pricing"
        className="gradient-cta hidden h-9 items-center gap-1.5 rounded-[var(--radius-md)] px-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Upgrade
      </Link>

      <Avatar name={user?.fullName ?? "You"} size="sm" />
    </header>
  );
}

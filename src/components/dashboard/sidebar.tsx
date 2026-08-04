"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, Sparkles, X } from "lucide-react";
import { DASHBOARD_NAV } from "@/data/navigation";
import { cn } from "@/lib/utils";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Dashboard">
      {DASHBOARD_NAV.map((item) => {
        const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm font-medium transition-colors",
              active
                ? "bg-accent-primary/15 text-text-primary"
                : "text-text-secondary hover:bg-surface-2 hover:text-text-primary",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBottom() {
  return (
    <div className="flex flex-col gap-1 border-t border-border pt-3">
      <Link
        href="/contact"
        className="flex min-h-11 items-center gap-3 rounded-[var(--radius-md)] px-3 text-sm text-text-secondary hover:bg-surface-2 hover:text-text-primary"
      >
        <HelpCircle className="h-4 w-4" aria-hidden="true" />
        Help
      </Link>
    </div>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-bg-raised p-4 lg:flex">
      <Link href="/" className="mb-6 flex items-center gap-2 px-1 font-semibold text-text-primary">
        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
          <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
        </span>
        Orbit
      </Link>
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>
      <SidebarBottom />
    </aside>
  );
}

export function MobileSidebarDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="absolute left-0 top-0 flex h-full w-[82%] max-w-xs flex-col border-r border-border bg-bg-raised p-4">
        <div className="mb-6 flex items-center justify-between px-1">
          <Link href="/" className="flex items-center gap-2 font-semibold text-text-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
            Orbit
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-text-secondary hover:bg-surface-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavLinks onNavigate={onClose} />
        </div>
        <SidebarBottom />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { MARKETING_NAV } from "@/data/navigation";
import { useLocale } from "@/lib/locale";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-text-primary">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-accent-primary-muted to-accent-secondary">
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
          Orbit
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {MARKETING_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button size="sm" asChild>
            <Link href="/dashboard">{t("header.getStarted")}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-text-primary lg:hidden"
          aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-border bg-bg px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {MARKETING_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[var(--radius-md)] px-3 py-3 text-base text-text-secondary hover:bg-surface-1 hover:text-text-primary"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <LanguageSwitcher className="self-start" />
            <Button asChild className="w-full">
              <Link href="/dashboard">{t("header.getStartedFree")}</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

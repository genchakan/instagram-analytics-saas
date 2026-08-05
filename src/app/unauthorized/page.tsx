"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";

export default function UnauthorizedPage() {
  const { t } = useLocale();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-1 border border-border">
        <ShieldAlert className="h-6 w-6 text-warning" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-semibold text-text-primary">{t("legal.noAccess")}</h1>
      <p className="max-w-sm text-sm text-text-secondary">{t("legal.noAccessBody")}</p>
      <div className="flex gap-3">
        <Button variant="secondary" asChild>
          <Link href="/login">{t("header.logIn")}</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">{t("legal.goToDashboard")}</Link>
        </Button>
      </div>
    </div>
  );
}

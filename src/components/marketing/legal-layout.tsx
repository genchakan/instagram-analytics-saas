"use client";

import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/locale";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{title}</h1>
          {updated && (
            <p className="mt-2 text-xs text-text-secondary">{t("mkt.lastUpdated", { date: updated })}</p>
          )}
          <div className="mt-4">
            <Badge variant="warning">{t("mkt.legalPlaceholder")}</Badge>
          </div>
          <div className="prose-legal mt-8 flex flex-col gap-5 text-sm leading-relaxed text-text-secondary [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-text-primary [&_p]:text-text-secondary">
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

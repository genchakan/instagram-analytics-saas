"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { InstructorPanel } from "@/components/simulation/instructor-panel";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLocale } from "@/lib/locale";

export default function InstructorPage() {
  const { t } = useLocale();
  return (
    <main className="min-h-screen bg-bg px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto mb-10 flex w-full max-w-5xl items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-accent-secondary">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            {t("instructorPage.safeMode")}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            {t("instructorPage.liveResults")}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">{t("instructorPage.subtitle")}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-3">
          <LanguageSwitcher />
          <Link href="/login" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("instructorPage.studentScreen")}
          </Link>
        </div>
      </div>
      <InstructorPanel />
    </main>
  );
}

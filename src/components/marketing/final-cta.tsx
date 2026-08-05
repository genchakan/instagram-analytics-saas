"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrialNote } from "./trial-note";
import { useLocale } from "@/lib/locale";

export function FinalCta() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-accent-primary/30 bg-gradient-to-br from-surface-2 via-surface-1 to-surface-2 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(217,70,239,0.15),transparent)]"
        />
        <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
          {t("mkt.finalCtaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-text-secondary sm:text-base">
          {t("mkt.finalCtaDesc")}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/dashboard">
              {t("header.getStartedFree")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <TrialNote />
        </div>
      </div>
    </section>
  );
}

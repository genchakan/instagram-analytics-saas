"use client";

import Link from "next/link";
import { ArrowRight, Eye, ShieldCheck, XCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroPanelPreview } from "./hero-panel-preview";
import { HeroVisitorTeaser } from "./hero-visitor-teaser";
import { TrialNote } from "./trial-note";
import { useLocale } from "@/lib/locale";

export function Hero() {
  const { t } = useLocale();
  const FEATURES = [t("mkt.trustFeat1"), t("mkt.trustFeat2"), t("mkt.trustFeat3"), t("mkt.trustFeat4")];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent)]"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:pt-20 lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 text-xs font-medium text-violet-300">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            {t("mkt.heroEyebrow")}
          </span>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {t("mkt.heroTitle")}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:text-lg lg:mx-0">
            {t("mkt.heroSubtitle")}
          </p>

          <ul className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:mx-0">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-center justify-center gap-1.5 text-sm text-text-secondary lg:justify-start">
                <Check className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center lg:justify-start">
            <HeroVisitorTeaser />
          </div>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/dashboard">
                {t("header.getStartedFree")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/#dashboard-preview">{t("mkt.viewDemo")}</Link>
            </Button>
          </div>

          <div className="mt-5 flex justify-center lg:justify-start">
            <TrialNote />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-secondary lg:justify-start">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
              {t("mkt.privateDashboard")}
            </span>
            <span className="flex items-center gap-1.5">
              <XCircle className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
              {t("mkt.disconnectAnytime")}
            </span>
          </div>
        </div>

        <HeroPanelPreview />
      </div>
    </section>
  );
}

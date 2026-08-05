"use client";

import { LegalLayout } from "@/components/marketing/legal-layout";
import { useLocale } from "@/lib/locale";

export default function TermsPage() {
  const { t } = useLocale();
  return (
    <LegalLayout title={t("legal.termsTitle")} updated={t("legal.updatedDate")}>
      <p>{t("legal.termsIntro")}</p>

      <h2>{t("legal.prototypeStatusTitle")}</h2>
      <p>{t("legal.prototypeStatusBody")}</p>

      <h2>{t("legal.notAffiliatedTitle")}</h2>
      <p>{t("legal.notAffiliatedBody")}</p>

      <h2>{t("legal.trialBillingTitle")}</h2>
      <p>{t("legal.trialBillingBody")}</p>

      <h2>{t("legal.acceptableUseTitle")}</h2>
      <p>{t("legal.acceptableUseBody")}</p>
    </LegalLayout>
  );
}

"use client";

import { LegalLayout } from "@/components/marketing/legal-layout";
import { useLocale } from "@/lib/locale";

export default function ImprintPage() {
  const { t } = useLocale();
  return (
    <LegalLayout title={t("legal.imprintTitle")}>
      <p>{t("legal.imprintIntro")}</p>

      <h2>{t("legal.providerTitle")}</h2>
      <p>{t("legal.companyPlaceholder")}</p>
      <p>{t("legal.addressPlaceholder")}</p>
      <p>{t("legal.emailPlaceholder")}</p>

      <h2>{t("legal.notAffiliatedTitle")}</h2>
      <p>{t("legal.notAffiliatedShort")}</p>
    </LegalLayout>
  );
}

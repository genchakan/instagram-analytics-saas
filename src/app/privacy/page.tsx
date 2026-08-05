"use client";

import { LegalLayout } from "@/components/marketing/legal-layout";
import { useLocale } from "@/lib/locale";

export default function PrivacyPage() {
  const { t } = useLocale();
  return (
    <LegalLayout title={t("legal.privacyTitle")} updated={t("legal.updatedDate")}>
      <p>{t("legal.privacyIntro")}</p>

      <h2>{t("legal.privacyWhatTitle")}</h2>
      <p>{t("legal.privacyWhatBody")}</p>

      <h2>{t("legal.privacyIgTitle")}</h2>
      <p>
        {t("legal.privacyIgBody")}{" "}
        <a href="/dashboard/connect" className="text-accent-secondary hover:underline">
          {t("legal.connectionFlowLink")}
        </a>{" "}
        {t("legal.forDetails")}
      </p>

      <h2>{t("legal.privacyDemoTitle")}</h2>
      <p>{t("legal.privacyDemoBody")}</p>

      <h2>{t("legal.contactTitle")}</h2>
      <p>
        {t("legal.privacyContactBody")}{" "}
        <a href="/contact" className="text-accent-secondary hover:underline">
          {t("legal.contactPageLink")}
        </a>
        .
      </p>
    </LegalLayout>
  );
}

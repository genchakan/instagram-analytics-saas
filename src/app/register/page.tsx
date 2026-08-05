"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { RegistrationForm } from "@/components/auth/registration-form";
import { TrialNote } from "@/components/marketing/trial-note";
import { useLocale } from "@/lib/locale";

export default function RegisterPage() {
  const { t } = useLocale();
  return (
    <AuthLayout title={t("authp.registerTitle")} description={t("authp.registerDesc")}>
      <RegistrationForm />
      <div className="mt-6 flex justify-center">
        <TrialNote />
      </div>
    </AuthLayout>
  );
}

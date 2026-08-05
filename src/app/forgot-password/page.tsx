"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { useLocale } from "@/lib/locale";

export default function ForgotPasswordPage() {
  const { t } = useLocale();
  return (
    <AuthLayout title={t("authp.resetTitle")} description={t("authp.resetDesc")}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

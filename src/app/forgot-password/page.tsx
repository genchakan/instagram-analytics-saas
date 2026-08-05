"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { useLocale } from "@/lib/locale";

export default function ForgotPasswordPage() {
  const { t } = useLocale();
  return (
    <AuthLayout
      title={t("authp.resetTitle")}
      description={t("authp.resetDesc")}
      footer={
        <Link href="/login" className="font-medium text-accent-secondary hover:underline">
          {t("authp.backToLogin")}
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

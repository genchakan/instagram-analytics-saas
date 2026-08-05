"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { useLocale } from "@/lib/locale";

export default function LoginPage() {
  const { t } = useLocale();
  return (
    <AuthLayout
      title={t("simLogin.title")}
      description={t("simLogin.description")}
      footer={
        <>
          {t("simLogin.instructorQuestion")}{" "}
          <Link href="/instructor" className="font-medium text-accent-secondary hover:underline">
            {t("simLogin.openPanel")}
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

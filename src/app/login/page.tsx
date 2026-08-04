import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Öğrenci Ekranı — Phishing Simülasyonu" };

export default function LoginPage() {
  return (
    <AuthLayout
      title="Phishing farkındalık simülasyonu"
      description="Öğretmenin tarafından verilen demo bilgileriyle kontrollü deneyi başlat."
      footer={
        <>
          Eğitmen misiniz?{" "}
          <Link href="/instructor" className="font-medium text-accent-secondary hover:underline">
            Canlı sonuç panelini açın
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

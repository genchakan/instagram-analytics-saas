import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { RegistrationForm } from "@/components/auth/registration-form";
import { TrialNote } from "@/components/marketing/trial-note";

export const metadata: Metadata = { title: "Create your account — Orbit" };

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Get started in seconds — no credit card, no waiting for email verification."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent-secondary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegistrationForm />
      <div className="mt-6 flex justify-center">
        <TrialNote />
      </div>
    </AuthLayout>
  );
}

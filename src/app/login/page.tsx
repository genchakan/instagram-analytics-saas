import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Student Screen — Phishing Simulation" };

export default function LoginPage() {
  return (
    <AuthLayout
      title="Phishing awareness simulation"
      description="Start the controlled exercise with the demo details your instructor gave you."
      footer={
        <>
          Are you the instructor?{" "}
          <Link href="/instructor" className="font-medium text-accent-secondary hover:underline">
            Open the live results panel
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

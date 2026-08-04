import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Log in — Orbit" };

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to see what's happening on your dashboard."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-accent-secondary hover:underline">
            Create one free
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}

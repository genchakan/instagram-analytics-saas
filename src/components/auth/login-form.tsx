"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "./password-field";
import { GoogleAuthButton } from "./google-auth-button";
import { loginSchema, type LoginInput } from "@/lib/validation";
import { loginWithEmail, continueWithGoogle } from "@/services/auth";
import { useAppState } from "@/lib/app-state";

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useAppState();
  const [serverError, setServerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    setServerError(null);
    try {
      const user = await loginWithEmail(values);
      setUser(user);
      router.push("/dashboard");
    } catch {
      setServerError("We couldn't sign you in. Please check your details and try again.");
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setServerError(null);
    try {
      const user = await continueWithGoogle();
      setUser(user);
      router.push("/dashboard");
    } catch {
      setServerError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <GoogleAuthButton onClick={handleGoogle} loading={googleLoading} label="Continue with Google" />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-text-secondary">or continue with email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-[var(--radius-md)] border border-danger/30 bg-danger/10 p-3 text-sm text-danger"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {serverError}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-accent-secondary hover:underline">
              Forgot password?
            </Link>
          </div>
          <PasswordField
            id="password"
            autoComplete="current-password"
            invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </div>
  );
}

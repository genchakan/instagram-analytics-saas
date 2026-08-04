import Link from "next/link";
import { ArrowRight, Eye, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FullDashboardPreview } from "./full-dashboard-preview";
import { HeroVisitorTeaser } from "./hero-visitor-teaser";
import { TrialNote } from "./trial-note";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent)]"
      />
      <div className="mx-auto max-w-3xl px-4 pb-10 pt-10 text-center sm:px-6 sm:pt-16 lg:pt-20">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 text-xs font-medium text-violet-300">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          Instagram Visitor Intelligence
        </span>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          See who&apos;s really watching your Instagram.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
          Connect your profile and instantly see recent visitors, repeat viewers and quiet
          admirers — ranked by how much attention they&apos;re paying you. All in one dashboard
          only you can see.
        </p>

        <div className="mt-6 flex justify-center">
          <HeroVisitorTeaser />
        </div>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/dashboard">
              Get Started Free
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild className="w-full sm:w-auto">
            <Link href="/#dashboard-preview">View Demo</Link>
          </Button>
        </div>

        <div className="mt-5 flex justify-center">
          <TrialNote />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
            Private dashboard
          </span>
          <span className="flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5 text-text-secondary" aria-hidden="true" />
            Disconnect anytime
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <FullDashboardPreview />
      </div>
    </section>
  );
}

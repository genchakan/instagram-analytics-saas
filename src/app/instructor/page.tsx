import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { InstructorPanel } from "@/components/simulation/instructor-panel";

export const metadata: Metadata = { title: "Instructor Panel — Phishing Simulation" };

export default function InstructorPage() {
  return (
    <main className="min-h-screen bg-bg px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto mb-10 flex w-full max-w-5xl items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-accent-secondary">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            Safe training mode
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
            Live simulation results
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Monitor what participants submit in this classroom exercise.
          </p>
        </div>
        <Link href="/login" className="flex shrink-0 items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Student screen
        </Link>
      </div>
      <InstructorPanel />
    </main>
  );
}

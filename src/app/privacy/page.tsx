import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal-layout";

export const metadata: Metadata = { title: "Privacy Policy — Orbit" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="August 3, 2026">
      <p>
        This is placeholder privacy policy content for a prototype product. It describes, at a
        high level, how this application is intended to handle data — it is not a substitute for
        a reviewed, jurisdiction-specific privacy policy.
      </p>

      <h2>What this prototype does</h2>
      <p>
        Orbit is currently a development prototype. Account information you provide (name, email)
        is stored only in your browser&apos;s local storage for the purpose of demonstrating the
        product. No data is transmitted to a production backend or third-party analytics service.
      </p>

      <h2>Instagram connection</h2>
      <p>
        The Instagram connection flow in this prototype is fully simulated. Any username or
        password you enter is used only to generate a mock response and is discarded immediately —
        it is never stored, logged, or sent to Instagram, Meta, or any other third party. See our{" "}
        <a href="/dashboard/connect" className="text-accent-secondary hover:underline">
          connection flow
        </a>{" "}
        for details.
      </p>

      <h2>Demo data</h2>
      <p>
        Dashboards, visitor lists, activity timelines and reports shown in this product use
        synthetic demo data. No real Instagram account data is collected, processed, or displayed.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through our{" "}
        <a href="/contact" className="text-accent-secondary hover:underline">
          contact page
        </a>
        .
      </p>
    </LegalLayout>
  );
}

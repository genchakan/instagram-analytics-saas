import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal-layout";

export const metadata: Metadata = { title: "Terms of Service — Orbit" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="August 3, 2026">
      <p>
        This is placeholder terms-of-service content for a prototype product, provided for
        demonstration purposes only.
      </p>

      <h2>Prototype status</h2>
      <p>
        Orbit is a development prototype and is not currently offered as a production service. No
        real payments are processed and no real Instagram accounts are connected.
      </p>

      <h2>Not affiliated with Instagram or Meta</h2>
      <p>
        This application is an independent product and is not affiliated with, endorsed by, or
        connected to Instagram or Meta in any way.
      </p>

      <h2>Trial and billing</h2>
      <p>
        Every plan includes a 1 week free trial and does not require a credit card to begin. In
        this prototype, all billing is simulated by a mock provider — no real charges occur. There
        are no hidden fees, and plans can be cancelled at any time.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse this prototype, including attempting to submit real third-party
        credentials or using it to interact with live Instagram accounts.
      </p>
    </LegalLayout>
  );
}

import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal-layout";

export const metadata: Metadata = { title: "Imprint — Orbit" };

export default function ImprintPage() {
  return (
    <LegalLayout title="Imprint">
      <p>
        This page is a structural placeholder for a legally required imprint / site notice. Real
        entity details (company name, registered address, register number, VAT ID, contact
        details of the responsible party) must be added before any production launch.
      </p>

      <h2>Provider</h2>
      <p>[Company name — placeholder]</p>
      <p>[Address — placeholder]</p>
      <p>[Contact email — placeholder]</p>

      <h2>Not affiliated with Instagram or Meta</h2>
      <p>This application is not affiliated with Instagram or Meta.</p>
    </LegalLayout>
  );
}

import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { FaqSection } from "@/components/marketing/faq-section";

export const metadata: Metadata = { title: "Pricing — Orbit" };

export default function PricingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing, start free"
            description="Every plan includes a 1 week free trial — no credit card needed. Cancel anytime."
          />
          <div className="mt-12">
            <PricingCards />
          </div>
        </section>
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}

import { SectionHeading } from "./section-heading";
import { PricingCards } from "./pricing-cards";

export function PricingPreview() {
  return (
    <section id="pricing-preview" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple pricing, start free"
        description="Every plan includes a 1 week free trial — no credit card needed."
      />
      <div className="mt-12">
        <PricingCards compact />
      </div>
    </section>
  );
}

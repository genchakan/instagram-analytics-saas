import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { CredibilityStrip } from "@/components/marketing/credibility-strip";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PanelTour } from "@/components/marketing/panel-tour";
import { VisitorInsightsShowcase } from "@/components/marketing/visitor-insights-showcase";
import { ActivityTimelineShowcase } from "@/components/marketing/activity-timeline-showcase";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { PrivacySection } from "@/components/marketing/privacy-section";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { Testimonials } from "@/components/marketing/testimonials";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <CredibilityStrip />
        <HowItWorks />
        <PanelTour />
        <VisitorInsightsShowcase />
        <ActivityTimelineShowcase />
        <FeatureGrid />
        <PrivacySection />
        <PricingPreview />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

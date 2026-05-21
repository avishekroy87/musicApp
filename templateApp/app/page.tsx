import { Hero } from "@/components/hero";
import { VelocityBand } from "@/components/velocity-band";
import { ServiceGrid } from "@/components/service-grid";
import { MetricsStrip } from "@/components/metrics-strip";
import { StickyStory } from "@/components/sticky-story";
import { CaseStudies } from "@/components/case-studies";
import { Testimonials } from "@/components/testimonials";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <VelocityBand />
      <ServiceGrid />
      <MetricsStrip />
      <StickyStory />
      <CaseStudies />
      <Testimonials />
      <CtaBand />
    </>
  );
}

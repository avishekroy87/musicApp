import { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CaseStudies } from "@/components/case-studies";
import { MetricsStrip } from "@/components/metrics-strip";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected fictional case studies showing NovaForge Studio's AI-native digital platforms and launch systems.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Launch stories built from original strategy and measurable outcomes.">
        Each engagement is shaped around a product truth, a buyer behavior, and a platform that keeps improving after the first release.
      </PageHero>
      <CaseStudies />
      <MetricsStrip />
      <CtaBand />
    </>
  );
}

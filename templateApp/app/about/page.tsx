import { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AnimatedSection, Reveal } from "@/components/animated-section";
import { Testimonials } from "@/components/testimonials";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about NovaForge Studio's senior, cross-functional model for AI-native brand and platform work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="A compact senior team for work that cannot feel assembled.">
        NovaForge is a fictional studio model designed around one belief: the best digital launches are not handed from strategy to design to engineering. They are shaped together.
      </PageHero>
      <AnimatedSection className="bg-[#05070d]">
        <div className="container-narrow grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-pulse">Operating principles</p>
          </Reveal>
          <div className="grid gap-6">
            {["Think in systems, not screens.", "Let motion clarify, never decorate.", "Ship fast, but leave durable architecture.", "Measure the story after it meets real users."].map((line) => (
              <Reveal key={line}>
                <p className="border-t border-white/10 pt-6 font-display text-3xl font-semibold">{line}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <Testimonials />
      <CtaBand />
    </>
  );
}

import { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ServiceGrid } from "@/components/service-grid";
import { StickyStory } from "@/components/sticky-story";
import { CtaBand } from "@/components/cta-band";
import { capabilities } from "@/lib/site-data";
import { iconMap, type IconName } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Services",
  description: "AI strategy, brand systems, experience engineering, and conversion platform services from NovaForge Studio.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Full-stack growth systems for category builders.">
        We combine market strategy, visual identity, interface design, motion engineering, and production development into one tightly managed launch track.
      </PageHero>
      <section className="section-pad bg-[#05070d]">
        <div className="container-narrow grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = iconMap[capability.icon as IconName];
            return (
              <div key={capability.label} className="rounded-[0.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-edge">
                <Icon className="text-cyan-pulse" size={24} />
                <p className="mt-8 font-display text-xl font-semibold">{capability.label}</p>
              </div>
            );
          })}
        </div>
      </section>
      <ServiceGrid />
      <StickyStory />
      <CtaBand />
    </>
  );
}

import { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { insights } from "@/lib/site-data";
import { CtaBand } from "@/components/cta-band";
import { iconMap, type IconName } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Insights",
  description: "NovaForge Studio writing on motion systems, AI product design, and conversion-native digital platforms.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights" title="Notes on building digital experiences with signal.">
        Short thinking for teams turning complex products into clear, cinematic, high-performing web systems.
      </PageHero>
      <section className="section-pad bg-[#05070d]">
        <div className="container-narrow grid gap-5 lg:grid-cols-3">
          {insights.map((item) => {
            const Icon = iconMap[item.icon as IconName];
            return (
              <article key={item.title} className="rounded-[0.5rem] border border-white/10 bg-white/[0.035] p-7 shadow-edge">
                <Icon className="text-cyan-pulse" size={26} />
                <h2 className="mt-16 font-display text-3xl font-semibold">{item.title}</h2>
                <p className="mt-5 text-sm leading-6 text-white/58">{item.excerpt}</p>
              </article>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

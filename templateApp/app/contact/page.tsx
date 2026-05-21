import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a NovaForge Studio strategy, design, and full-stack build conversation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what needs to become undeniable.">
        Share the market shift, launch window, or product moment you are preparing for. We will map the clearest path from ambition to shipped system.
      </PageHero>
      <section className="section-pad bg-[#05070d]">
        <div className="container-narrow grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[0.5rem] border border-white/10 bg-white/[0.035] p-8 shadow-edge">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-pulse">Response window</p>
            <p className="mt-6 font-display text-4xl font-semibold">Two business days for qualified builds.</p>
            <p className="mt-6 text-sm leading-6 text-white/58">
              Prefer email? Reach us at hello@novaforge.studio with your target launch date and the platform you need to move.
            </p>
          </div>
          <form className="grid gap-4" aria-label="Project inquiry form">
            {["Name", "Work email", "Company", "Launch window"].map((label) => (
              <label key={label} className="grid gap-2 text-sm text-white/58">
                {label}
                <input
                  className="h-14 rounded-[0.5rem] border border-white/10 bg-black/35 px-4 text-white outline-none transition placeholder:text-white/28 focus:border-cyan-pulse"
                  placeholder={label}
                />
              </label>
            ))}
            <label className="grid gap-2 text-sm text-white/58">
              What are you building?
              <textarea
                className="min-h-40 rounded-[0.5rem] border border-white/10 bg-black/35 p-4 text-white outline-none transition placeholder:text-white/28 focus:border-cyan-pulse"
                placeholder="Give us the context, constraints, and desired business outcome."
              />
            </label>
            <Button type="submit" size="lg" className="mt-2 w-full sm:w-fit">
              Send inquiry <ArrowRight size={18} />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

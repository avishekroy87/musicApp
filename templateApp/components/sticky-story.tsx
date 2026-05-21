"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/site-data";

gsap.registerPlugin(ScrollTrigger);

export function StickyStory() {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-step",
        { opacity: 0.22, filter: "blur(8px)", y: 40 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 68%",
            end: "bottom 48%",
            scrub: 0.8,
          },
        },
      );

      gsap.to(panel, {
        scale: 1.08,
        rotate: 2,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-pad relative overflow-hidden bg-[#080b10]">
      <div className="container-narrow grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
          <div ref={panelRef} className="relative h-[28rem] overflow-hidden rounded-[0.5rem] border border-white/10 bg-black shadow-edge">
            <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_50%_50%,rgba(39,244,255,.24),rgba(217,255,95,.12),rgba(255,107,95,.18),rgba(39,244,255,.24))] opacity-80" />
            <div className="absolute inset-8 border border-white/15" />
            <div className="absolute inset-x-10 bottom-10">
              <p className="text-xs uppercase tracking-[0.3em] text-black/70">Launch architecture</p>
              <p className="mt-3 font-display text-5xl font-semibold leading-none text-black">
                04 phase system
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-8 py-8 lg:py-24">
          {processSteps.map((item) => (
            <article key={item.title} className="story-step border-t border-white/12 pt-8">
              <p className="font-display text-sm text-cyan-pulse">{item.kicker}</p>
              <h3 className="mt-4 font-display text-4xl font-semibold tracking-normal">{item.title}</h3>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/58">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

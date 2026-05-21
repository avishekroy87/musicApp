"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { useRef } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { TextReveal } from "@/components/text-reveal";
import { MeshField } from "@/components/mesh-field";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8 lg:px-10">
      <MeshField />
      <motion.div
        aria-hidden="true"
        style={{ y, scale, opacity }}
        className="absolute inset-x-5 bottom-12 top-28 -z-0 rounded-[2rem] border border-white/10 bg-[linear-gradient(120deg,rgba(39,244,255,0.08),rgba(255,255,255,0.015),rgba(217,255,95,0.06))] shadow-edge"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),transparent_35%),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,64px_64px,64px_64px]" />
        <div className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-gradient-to-b from-transparent via-cyan-pulse/10 to-transparent" />
      </motion.div>

      <div className="container-narrow relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-end pb-12">
        <div className="max-w-6xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-pulse">
            AI-native digital transformation
          </div>
          <h1
            aria-label="Systems that make brands feel inevitable."
            className="font-display text-[clamp(3.4rem,11vw,10.8rem)] font-semibold leading-[0.86] tracking-normal text-balance"
          >
            <TextReveal>Systems that</TextReveal>
            <TextReveal>make brands</TextReveal>
            <TextReveal>feel inevitable.</TextReveal>
          </h1>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[0.8fr_1fr_0.4fr] lg:items-end">
          <p className="max-w-xl text-base leading-7 text-white/68 sm:text-lg">
            NovaForge Studio builds cinematic web platforms, AI product interfaces, and launch systems for companies moving faster than their category.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact">Start the system</MagneticButton>
            <a
              href="#studio"
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/15 px-5 text-sm text-white/75 transition hover:border-white/35 hover:text-white"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black">
                <Play size={14} fill="currentColor" />
              </span>
              Watch the motion
            </a>
          </div>
          <div className="hidden justify-self-end lg:block">
            <a href="#studio" aria-label="Scroll to studio section" className="grid h-14 w-14 place-items-center rounded-full border border-white/15 text-white/55 transition hover:text-white">
              <ArrowDown size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

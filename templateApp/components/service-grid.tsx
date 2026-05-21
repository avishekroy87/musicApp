"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { services } from "@/lib/site-data";
import { AnimatedSection, Reveal } from "@/components/animated-section";
import { iconMap, type IconName } from "@/lib/icons";

function TiltCard({ service }: { service: (typeof services)[number] }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18 });
  const glowX = useTransform(springY, [-8, 8], ["20%", "80%"]);
  const glowY = useTransform(springX, [-8, 8], ["80%", "20%"]);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(39,244,255,.18), transparent 36%)`,
  );
  const Icon = iconMap[service.icon as IconName];

  return (
    <motion.article
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(x * 10);
        rotateX.set(y * -10);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className="group relative min-h-72 overflow-hidden rounded-[0.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-edge transition hover:border-cyan-pulse/35"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{ background: glowBackground }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <Icon className="text-cyan-pulse" size={30} />
        <div>
          <h3 className="font-display text-2xl font-semibold">{service.title}</h3>
          <p className="mt-4 text-sm leading-6 text-white/58">{service.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

export function ServiceGrid() {
  return (
    <AnimatedSection id="studio" className="bg-[#05070d]">
      <div className="container-narrow">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-cyan-pulse">The studio model</p>
            <h2 className="font-display text-4xl font-semibold tracking-normal text-balance sm:text-6xl">
              Strategy, motion, and engineering built as one operating system.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <TiltCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

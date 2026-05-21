"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useScrollVelocity } from "@/hooks/use-scroll-velocity";

export function VelocityBand() {
  const velocity = useScrollVelocity();
  const spring = useSpring(velocity, { stiffness: 120, damping: 20 });
  const skew = useTransform(spring, [-80, 80], [-8, 8]);

  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
      <motion.div
        style={{ skewX: skew }}
        className="flex whitespace-nowrap font-display text-4xl font-semibold uppercase leading-none text-white/12 sm:text-6xl"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="px-5">
            Strategy / Motion / Engineering / Launch /
          </span>
        ))}
      </motion.div>
    </div>
  );
}

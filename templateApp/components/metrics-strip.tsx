"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { metrics } from "@/lib/site-data";
import { formatNumber } from "@/lib/utils";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const rounded = value % 1 === 0 ? formatNumber(Math.round(display)) : display.toFixed(1);

  return (
    <span ref={ref}>
      {rounded}
      {suffix}
    </span>
  );
}

export function MetricsStrip() {
  return (
    <section className="section-pad py-14">
      <div className="container-narrow grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            className="border-l border-white/12 px-5 py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="font-display text-5xl font-semibold text-white">
              <CountUp value={metric.value} suffix={metric.suffix} />
            </p>
            <p className="mt-3 max-w-48 text-sm leading-6 text-white/55">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

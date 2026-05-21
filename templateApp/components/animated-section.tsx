"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { containerStagger, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AnimatedSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={cn("section-pad", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={containerStagger}
    >
      {children}
    </motion.section>
  );
}

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

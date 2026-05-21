"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { motionConfig } from "@/lib/motion";

export function TextReveal({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%", filter: "blur(12px)" }}
        animate={{ y: "0%", filter: "blur(0px)" }}
        transition={{ duration: 0.95, ease: motionConfig.ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

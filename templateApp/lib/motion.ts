import type { Variants } from "framer-motion";

export const motionConfig = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: {
    fast: 0.35,
    base: 0.7,
    slow: 1.15,
  },
  stagger: {
    tight: 0.055,
    loose: 0.12,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.duration.base,
      ease: motionConfig.ease,
    },
  },
};

export const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.stagger.loose,
      delayChildren: 0.08,
    },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease,
    },
  },
};

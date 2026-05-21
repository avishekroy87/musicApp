import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        panel: "hsl(var(--panel))",
        cyan: {
          pulse: "#27f4ff",
        },
        signal: {
          lime: "#d9ff5f",
          coral: "#ff6b5f",
          violet: "#8d7aff",
          sky: "#4cc9f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgb(39 244 255 / 0.18)",
        edge: "inset 0 0 0 1px rgb(255 255 255 / 0.1)",
      },
      keyframes: {
        "mesh-drift": {
          "0%, 100%": { transform: "translate3d(-2%, -1%, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, 1%, 0) scale(1.04)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "mesh-drift": "mesh-drift 18s ease-in-out infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;

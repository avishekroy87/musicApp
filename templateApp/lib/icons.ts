import {
  Activity,
  Blocks,
  BrainCircuit,
  Braces,
  Compass,
  Cpu,
  Gauge,
  GitBranch,
  Layers3,
  LineChart,
  Orbit,
  ShieldCheck,
  Sparkles,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  Activity,
  Blocks,
  BrainCircuit,
  Braces,
  Compass,
  Cpu,
  Gauge,
  GitBranch,
  Layers3,
  LineChart,
  Orbit,
  ShieldCheck,
  Sparkles,
  Waypoints,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

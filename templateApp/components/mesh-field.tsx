"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function MeshField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let rafId = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      frame += 0.006;
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const fields = [
        ["rgba(39,244,255,0.16)", 0.18, 0.24, 240],
        ["rgba(217,255,95,0.1)", 0.78, 0.2, 280],
        ["rgba(255,107,95,0.08)", 0.48, 0.72, 330],
      ] as const;

      fields.forEach(([color, xFactor, yFactor, radius], index) => {
        const x = width * xFactor + Math.sin(frame + index) * 42;
        const y = height * yFactor + Math.cos(frame * 0.8 + index) * 36;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      });

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 opacity-90" />;
}

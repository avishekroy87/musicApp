"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cases } from "@/lib/site-data";
import { AnimatedSection, Reveal } from "@/components/animated-section";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  return (
    <AnimatedSection className="bg-[#03050a]">
      <div className="container-narrow">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-cyan-pulse">Selected systems</p>
              <h2 className="font-display text-4xl font-semibold sm:text-6xl">Original platforms with measurable force.</h2>
            </div>
          </Reveal>
          <Reveal>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm text-white/62 hover:text-white">
              View case studies <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              className="group relative min-h-[31rem] overflow-hidden rounded-[0.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-edge"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70 transition duration-700 group-hover:scale-110", item.palette)} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.82))]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.26em] text-white/55">
                  <span>{item.category}</span>
                  <ArrowUpRight size={16} />
                </div>
                <div>
                  <h3 className="font-display text-4xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-cyan-pulse">{item.result}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

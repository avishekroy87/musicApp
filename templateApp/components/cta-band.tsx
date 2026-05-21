import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="section-pad bg-cyan-pulse text-black">
      <div className="container-narrow flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <h2 className="max-w-4xl font-display text-5xl font-semibold leading-none tracking-normal text-balance sm:text-7xl">
          Bring us the ambition. We will forge the interface.
        </h2>
        <Link
          href="/contact"
          className="group inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-black px-7 font-medium text-white transition hover:bg-white hover:text-black"
        >
          Start now <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

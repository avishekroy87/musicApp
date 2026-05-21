import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section-pad min-h-[72vh] pt-36">
      <div className="container-narrow">
        <p className="mb-6 text-xs uppercase tracking-[0.32em] text-cyan-pulse">{eyebrow}</p>
        <h1 className="max-w-6xl font-display text-6xl font-semibold leading-[0.94] tracking-normal text-balance sm:text-8xl">
          {title}
        </h1>
        <div className="mt-8 max-w-3xl text-lg leading-8 text-white/62">{children}</div>
      </div>
    </section>
  );
}

import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="section-pad bg-[#07090f]">
      <div className="container-narrow grid gap-5 lg:grid-cols-2">
        {testimonials.map((item) => (
          <blockquote key={item.author} className="rounded-[0.5rem] border border-white/10 bg-white/[0.035] p-8 shadow-edge">
            <p className="font-display text-3xl font-semibold leading-tight text-balance">“{item.quote}”</p>
            <footer className="mt-8 text-sm text-white/55">
              <span className="text-white">{item.author}</span> / {item.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

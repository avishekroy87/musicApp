import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="section-pad border-t border-white/10 bg-[#03050a]">
      <div className="container-narrow grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Build the digital system your next market expects.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-cyan-pulse transition hover:text-white"
          >
            Open a launch conversation <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/35">Explore</p>
            <div className="grid gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/62 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/35">Contact</p>
            <div className="grid gap-3 text-sm text-white/62">
              <a className="hover:text-white" href="mailto:hello@novaforge.studio">
                hello@novaforge.studio
              </a>
              <span>New York / Remote</span>
              <span>© 2026 NovaForge Studio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

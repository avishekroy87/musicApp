"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 shadow-edge backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-3" aria-label="NovaForge Studio home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-pulse/40 bg-cyan-pulse/10">
            <span className="h-3 w-3 rotate-45 bg-cyan-pulse transition group-hover:scale-125" />
          </span>
          <span className="font-display text-sm font-semibold tracking-wide">NovaForge</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-white/62 transition hover:bg-white/[0.06] hover:text-white",
                pathname === item.href && "bg-white/[0.08] text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="secondary" size="sm">
            <Link href="/contact">Start a build</Link>
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}

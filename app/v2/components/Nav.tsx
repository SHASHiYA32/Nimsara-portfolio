"use client";

import type { MouseEvent } from "react";
import { lenisStore } from "@/lib/store";
import { navLinks } from "@/data/content";

export default function Nav() {
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = lenisStore.current;
    if (lenis) lenis.scrollTo(href === "#top" ? 0 : href, { duration: 1.6 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="nav">
      <a href="#top" className="nav-brand" onClick={(e) => go(e, "#top")}>
        SN<span>.</span>
      </a>
      <nav className="nav-links">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="nav-cta" onClick={(e) => go(e, "#contact")}>
        Hire me
      </a>
    </header>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, scrollToId } from "@/lib/lenis";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];
const sections = [{ id: "top", label: "Intro" }, ...links];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        refreshPriority: -10,
        onUpdate: (self) => setHidden(self.direction === 1 && self.scroll() > 200),
      });
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2, refreshPriority: -10 },
      });
      sections.forEach((s, i) =>
        ScrollTrigger.create({
          trigger: `#${s.id}`,
          start: "top 55%",
          end: "bottom 55%",
          refreshPriority: -10,
          onToggle: (self) => self.isActive && setActive(i),
        })
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else if (document.documentElement.dataset.ready) l?.start();
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  const num = String(active + 1).padStart(2, "0");

  return (
    <>
      <div className="progress" ref={bar} aria-hidden />
      <header className={`nav${hidden && !open ? " is-hidden" : ""}`}>
        <a href="#top" className="nav-logo" onClick={go("top")} data-cursor-link>
          <span className="logo-mark">SN</span>
          <span className="logo-text">Shashintha Nimsara</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} data-cursor-link>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <ThemeToggle />
          <a href="#resume" className="pill" onClick={go("resume")} data-cursor-link>
            Resume
          </a>
          <button
            className="icon-btn menu-btn"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={open ? "is-open" : ""} />
          </button>
        </div>
      </header>

      <div className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {links.map((l, i) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>
            <small>0{i + 2}</small>
            {l.label}
          </a>
        ))}
      </div>

      <div className="indicator" aria-hidden>
        <span className="indicator-num">{num}</span>
        <span className="indicator-sep" />
        <span className="indicator-total">0{sections.length}</span>
        <span className="indicator-label">{sections[active].label}</span>
      </div>
    </>
  );
}

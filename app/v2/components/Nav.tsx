"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const linkWrap = useRef<HTMLElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);
  activeRef.current = active;

  // Chromium can refract the backdrop through an SVG filter (real "liquid" glass);
  // other browsers keep the blur + saturate glass.
  useEffect(() => {
    if (/Chrome\//.test(navigator.userAgent)) document.documentElement.classList.add("refract");
    return () => document.documentElement.classList.remove("refract");
  }, []);

  // sliding glass bubble behind the active / hovered link
  const place = useCallback((el: HTMLElement | null, instant = false) => {
    const b = bubble.current;
    if (!b) return;
    if (!el) {
      gsap.to(b, { opacity: 0, duration: 0.3 });
      return;
    }
    gsap.to(b, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      duration: instant ? 0 : 0.9,
      ease: "elastic.out(1, 0.7)",
      overwrite: true,
    });
  }, []);
  const activeLink = useCallback(
    () => (activeRef.current > 0 ? linkWrap.current?.children[activeRef.current - 1 + 1] ?? null : null) as HTMLElement | null,
    []
  );

  useEffect(() => {
    place(activeLink(), !bubble.current?.style.opacity);
  }, [active, place, activeLink]);

  useEffect(() => {
    const ro = new ResizeObserver(() => place(activeLink(), true));
    if (linkWrap.current) ro.observe(linkWrap.current);
    document.fonts?.ready.then(() => place(activeLink(), true));
    return () => ro.disconnect();
  }, [place, activeLink]);

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
      {/* SVG filter used to refract whatever is behind the glass (Chromium) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="glass-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.03" numOctaves="2" seed="7" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2.2" result="soft" />
            <feDisplacementMap in="SourceGraphic" in2="soft" scale="34" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="progress" ref={bar} aria-hidden />
      <header className={`nav${hidden && !open ? " is-hidden" : ""}`}>
        <div className="nav-pill glass">
          <a href="#top" className="nav-logo" onClick={go("top")} data-cursor-link>
            <span className="logo-mark">SN</span>
            <span className="logo-text">Shashintha Nimsara</span>
          </a>
          <nav
            className="nav-links"
            aria-label="Primary"
            ref={linkWrap}
            onPointerLeave={() => place(activeLink())}
          >
            <span className="nav-bubble" ref={bubble} aria-hidden />
            {links.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={active === i + 1 ? "is-active" : ""}
                onClick={go(l.id)}
                onPointerEnter={(e) => place(e.currentTarget)}
                data-cursor-link
              >
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

"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      document.documentElement.dataset.ready = "1";
      window.dispatchEvent(new Event("app:ready"));
      setDone(true);
    };
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(counter, {
      v: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`;
      },
    })
      .to(".loader-in", { yPercent: -120, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
      .to(root.current, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.2");
    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;
  return (
    <div className="loader" ref={root} aria-hidden>
      <div className="loader-in">
        <span className="loader-label">Loading portfolio</span>
        <div className="loader-count">
          <span ref={num}>000</span>
          <i>%</i>
        </div>
        <div className="loader-bar">
          <div ref={bar} />
        </div>
      </div>
      <span className="loader-name">Shashintha Nimsara — Full-Stack Developer</span>
    </div>
  );
}

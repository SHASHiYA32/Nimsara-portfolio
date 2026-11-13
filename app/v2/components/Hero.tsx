"use client";
import { useEffect, useRef } from "react";
import { gsap, onReady } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";
import { profile, images } from "@/data/portfolio";
import LiquidImage from "./LiquidImage";

const FALLBACK: [string, string] = ["#1c2b3a", "#0a0f16"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Universal initial hidden states
      gsap.set(".hero .inner", { yPercent: 115, opacity: 1 });
      gsap.set(".hero-frame", { clipPath: "inset(100% 0% 0% 0% round 20px)" });
      gsap.set(".hero [data-in]", { y: 24, opacity: 0 });

      const off = onReady(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to(".hero-frame", { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.4, ease: "power4.inOut" })
          .to(".hero .inner", { yPercent: 0, duration: 1.2, stagger: 0.1 }, "-=0.9")
          .to(".hero [data-in]", { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, "-=0.7");
      });

      const mm = gsap.matchMedia();
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };

      // Desktop: Exactly your original scroll animations
      mm.add("(min-width: 768px)", () => {
        gsap.to(".hero-frame-inner", { scale: 1.35, ease: "none", scrollTrigger: st });
        gsap.to(".hero-frame", { yPercent: -12, ease: "none", scrollTrigger: st });
        gsap.to(".hero-title .line:nth-child(1)", { xPercent: -10, ease: "none", scrollTrigger: st });
        gsap.to(".hero-title .line:nth-child(2)", { xPercent: 10, ease: "none", scrollTrigger: st });
        gsap.to(".hero-foot, .hero-sub", { opacity: 0, y: -30, ease: "none", scrollTrigger: { ...st, end: "40% top" } });
      });

      // Mobile: Safe subtle scroll behavior without side-scrolling text breaks
      mm.add("(max-width: 767px)", () => {
        gsap.to(".hero-frame-inner", { scale: 1.15, ease: "none", scrollTrigger: st });
        gsap.to(".hero-foot", { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "30% top" } });
      });

      return off;
    }, root.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero-frame" data-cursor="Drag">
        <div className="hero-frame-inner">
          <LiquidImage src={images.hero} colors={FALLBACK} className="liquid" />
        </div>
      </div>

      <p className="hero-role mono" data-in>
        <span className="dot" /> {profile.role}
      </p>

      <h1 className="hero-title" aria-label={profile.name}>
        <span className="line">
          <span className="inner">{profile.first}</span>
        </span>
        <span className="line">
          <span className="inner">
            {profile.last}
            <em>.</em>
          </span>
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-sub" data-in>
          {profile.intro}
        </p>
        <div className="hero-cta" data-in>
          <button className="btn" data-magnetic onClick={() => scrollToId("work")} data-cursor-link>
            View projects <span aria-hidden>↓</span>
          </button>
          <button className="btn ghost" data-magnetic onClick={() => scrollToId("contact")} data-cursor-link>
            Hire me
          </button>
        </div>
      </div>

      <div className="hero-foot mono" data-in>
        <span>{profile.location}</span>
        <span className="scroll-cue">
          Scroll to explore <i />
        </span>
        <span>© 2026</span>
      </div>
    </section>
  );
}
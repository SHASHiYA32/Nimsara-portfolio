"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSceneTarget } from "@/hooks/useSceneTarget";
import { TARGETS } from "@/lib/store";
import { profile } from "@/data/content";

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  useSceneTarget(root, TARGETS.hero);

  // Initial hidden state + scroll-away parallax.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero .line-inner", { yPercent: 115 });
      gsap.set(".hero .hero-fade", { opacity: 0, y: 24 });

      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Intro plays when the loader curtain lifts.
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.25 })
        .to(".hero .line-inner", {
          yPercent: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.12,
        })
        .to(
          ".hero .hero-fade",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09 },
          "-=0.9"
        );
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} id="top" className="hero">
      <div className="hero-content">
        <p className="eyebrow hero-fade">
          <i className="pulse" /> Available for new projects
        </p>
        <h1 className="hero-title" aria-label={profile.name}>
          <span className="line">
            <span className="line-inner">{profile.first}</span>
          </span>
          <span className="line">
            <span className="line-inner">
              {profile.last}
              <em>.</em>
            </span>
          </span>
        </h1>
        <p className="hero-role hero-fade">{profile.role}</p>
        <p className="hero-lead hero-fade">{profile.lead}</p>
        <div className="hero-actions hero-fade">
          <a href="#work" className="btn btn-solid" data-scroll-to="#work">
            View projects
          </a>
          <a href="#contact" className="btn btn-ghost" data-scroll-to="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <div className="hero-scroll hero-fade">
        <span>Scroll</span>
        <i />
      </div>
      <div className="hero-corner hero-fade">
        <span>{profile.location}</span>
        <span>Est. 2024</span>
      </div>
    </section>
  );
}

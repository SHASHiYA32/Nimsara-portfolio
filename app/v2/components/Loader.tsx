"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/data/content";

type Props = { onReveal: () => void };

/** Suho-style loader: big counter, name build-in, curtain that lifts to reveal the hero. */
export default function Loader({ onReveal }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const state = { n: 0 };
      const letters = gsap.utils.toArray<HTMLElement>(".ld-letter");

      gsap.set(letters, { yPercent: 110 });
      gsap.set(".ld-meta", { opacity: 0, y: 12 });

      const tl = gsap.timeline();
      tl.to(letters, {
        yPercent: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.035,
      })
        .to(".ld-meta", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.7")
        .to(
          state,
          {
            n: 100,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current)
                counter.current.textContent = String(Math.round(state.n)).padStart(3, "0");
              if (bar.current) bar.current.style.transform = `scaleX(${state.n / 100})`;
            },
          },
          0.2
        );

      tl.eventCallback("onComplete", async () => {
        try {
          await document.fonts.ready;
        } catch {}
        const out = gsap.timeline({
          onComplete: () => {
            html.style.overflow = "";
            ScrollTrigger.refresh();
            setDone(true);
          },
        });
        out
          .to(".ld-content", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" })
          .add(() => onReveal(), "-=0.1")
          .to(
            root.current,
            { yPercent: -100, duration: 1.3, ease: "expo.inOut" },
            "<"
          )
          .to(
            ".ld-curve",
            { attr: { d: "M0 0 L100 0 L100 0 Q50 0 0 0 Z" }, duration: 1.3, ease: "expo.inOut" },
            "<"
          );
      });
    }, root);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
  }, [onReveal]);

  if (done) return null;

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div className="ld-content">
        <div className="ld-top ld-meta">
          <span>Portfolio — v2</span>
          <span>{profile.location}</span>
        </div>
        <div className="ld-name">
          {profile.name.split(" ").map((word, w) => (
            <span key={w} className="ld-word">
              {word.split("").map((c, i) => (
                <span key={i} className="ld-mask">
                  <span className="ld-letter">{c}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className="ld-bottom ld-meta">
          <span>Initializing experience</span>
          <span className="ld-count">
            <span ref={counter}>000</span>%
          </span>
        </div>
        <div className="ld-bar">
          <div ref={bar} />
        </div>
      </div>
      <svg className="ld-curve-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path className="ld-curve" d="M0 0 L100 0 L100 0 Q50 100 0 0 Z" />
      </svg>
    </div>
  );
}

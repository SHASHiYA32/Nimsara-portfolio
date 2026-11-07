"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSceneTarget } from "@/hooks/useSceneTarget";
import { TARGETS } from "@/lib/store";
import { pillars, profile } from "@/data/content";
import Words from "./Words";

export default function About() {
  const root = useRef<HTMLElement>(null);
  useSceneTarget(root, TARGETS.about);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Premotio-style scrubbed word fill.
      gsap.fromTo(
        ".statement .w",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".statement",
            start: "top 78%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );

      // 2. Sticky stacked cards that scale back as the next one arrives.
      const cards = gsap.utils.toArray<HTMLElement>(".pillar");
      cards.forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>(".pillar-inner");
        const next = cards[i + 1];
        gsap.from(inner, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
        if (next && inner) {
          gsap.to(inner, {
            scale: 0.9,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top 85%",
              end: "top 25%",
              scrub: true,
            },
          });
        }
      });

      // 3. Stat counters.
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.value ?? "0", 10);
        const suffix = el.dataset.suffix ?? "";
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(o.v) + suffix;
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="about">
      <div className="about-inner">
        <p className="eyebrow">( 01 ) About</p>
        <Words
          as="h2"
          className="statement"
          text={profile.statement}
          accent={profile.statementAccent}
        />

        <div className="stats">
          {profile.stats.map((s) => (
            <div key={s.label} className="stat">
              <span
                className="stat-num"
                data-value={parseInt(s.value, 10)}
                data-suffix={s.value.replace(/\d+/g, "")}
              >
                0
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="pillars">
          {pillars.map((p, i) => (
            <article key={p.title} className="pillar" style={{ ["--i" as string]: i }}>
              <div className="pillar-inner" data-cursor>
                <span className="pillar-no">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSceneTarget } from "@/hooks/useSceneTarget";
import { TARGETS } from "@/lib/store";
import { stackRows } from "@/data/content";

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  useSceneTarget(root, TARGETS.stack);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".marquee").forEach((row, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          row,
          { xPercent: dir === -1 ? 0 : -30 },
          {
            xPercent: dir === -1 ? -30 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      gsap.from(".stack-head > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stack-head", start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="stack" className="stack">
      <div className="stack-head">
        <p className="eyebrow">( 03 ) Stack</p>
        <h2>
          Tools I build <em>with</em>
        </h2>
      </div>
      <div className="marquees">
        {stackRows.map((row, i) => (
          <div key={i} className="marquee" aria-hidden={i > 0}>
            {[...row, ...row, ...row].map((item, j) => (
              <span key={j}>
                {item}
                <b>✦</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

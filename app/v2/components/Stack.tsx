"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import { stackGroups } from "@/data/portfolio";

const all = stackGroups.flatMap((g) => g.items);
const rowA = [...stackGroups[0].items, ...stackGroups[2].items];
const rowB = [...stackGroups[1].items, ...stackGroups[3].items];

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <div className={`mq${outline ? " outline" : ""}`}>
      <div className="mq-track">
        {[0, 1].map((k) => (
          <div className="mq-set" key={k} aria-hidden={k === 1}>
            {items.map((t) => (
              <span className="mq-item" key={t}>
                {t}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray<HTMLElement>(".mq-track");
      const tweens = tracks.map((t, i) =>
        gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 36, ease: "none", repeat: -1 })
      );
      let boost = 0;
      let target = 0;
      let skew = 0;
      let skewTarget = 0;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          target = Math.min(Math.abs(v) / 160, 14);
          skewTarget = Math.max(-6, Math.min(6, v / -350));
        },
      });
      // skew goes on the wrapper so it doesn't fight GSAP's transform on the track
      const wraps = gsap.utils.toArray<HTMLElement>(".mq");
      const tick = () => {
        boost += (target - boost) * 0.08;
        target *= 0.92;
        skew += (skewTarget - skew) * 0.1;
        skewTarget *= 0.9;
        tweens.forEach((t) => t.timeScale(1 + boost));
        wraps.forEach((w) => (w.style.transform = `skewX(${skew}deg)`));
      };
      gsap.ticker.add(tick);

      // spotlight on cards
      gsap.utils.toArray<HTMLElement>(".stack-card").forEach((c) => {
        c.addEventListener("pointermove", (e) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--mx", `${(e as PointerEvent).clientX - r.left}px`);
          c.style.setProperty("--my", `${(e as PointerEvent).clientY - r.top}px`);
        });
      });

      // counter
      const n = root.current!.querySelector<HTMLElement>(".stack-count");
      if (n) {
        const o = { v: 0 };
        gsap.to(o, {
          v: all.length,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => (n.textContent = String(Math.round(o.v))),
          scrollTrigger: { trigger: n, start: "top 90%", once: true },
        });
      }

      // chips pop in per card
      gsap.utils.toArray<HTMLElement>(".stack-card").forEach((c) => {
        gsap.from(c.querySelectorAll(".chips li"), {
          scale: 0.6,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.8)",
          stagger: 0.06,
          scrollTrigger: { trigger: c, start: "top 85%", once: true },
        });
      });

      return () => gsap.ticker.remove(tick);
    }, root.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section stack" ref={root}>
      <div className="stack-head">
        <p className="label mono reveal-lines">
          <span className="line">
            <span className="inner">
              <b>(03)</b> Tech stack
            </span>
          </span>
        </p>
        <h2 className="h2 reveal-lines">
          <span className="line">
            <span className="inner">
              Tools I <em>build</em>
            </span>
          </span>
          <span className="line">
            <span className="inner">
              with <span className="stack-count">0</span>
              <sup className="mono">tech</sup>
            </span>
          </span>
        </h2>
      </div>

      <div className="mq-wrap" aria-label={`Tech stack: ${all.join(", ")}`}>
        <Row items={rowA} />
        <Row items={rowB} outline />
      </div>

      <div className="stack-grid" data-stagger>
        {stackGroups.map((g, i) => (
          <div className="stack-card" key={g.title}>
            <div className="stack-card-top">
              <span className="mono">0{i + 1}</span>
              <span className="mono">{g.items.length} items</span>
            </div>
            <h3>{g.title}</h3>
            <ul className="chips">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

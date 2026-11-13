"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import { profile, stats, focus } from "@/data/portfolio";

export default function About() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // word-by-word scroll-scrubbed fill (the "premotio" feel)
      const words = gsap.utils.toArray<HTMLElement>(".sw");
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ".about-text", start: "top 78%", end: "bottom 50%", scrub: true },
        }
      );
      // counters
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((n) => {
        const target = Number(n.dataset.value);
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => (n.firstChild!.textContent = String(Math.round(o.v))),
          scrollTrigger: { trigger: n, start: "top 90%", once: true },
        });
      });
      // lines draw in
      gsap.utils.toArray<HTMLElement>(".focus-item").forEach((it) => {
        gsap.fromTo(
          it.querySelector(".focus-line"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: it, start: "top 88%", once: true } }
        );
      });
    }, root.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" ref={root}>
      <p className="label mono reveal-lines">
        <span className="line">
          <span className="inner">
            <b>(01)</b> About
          </span>
        </span>
      </p>

      <p className="about-text" aria-label={profile.about}>
        {profile.about.split(" ").map((w, i) => (
          <span key={i} className="sw" aria-hidden>
            {w}{" "}
          </span>
        ))}
      </p>

      <div className="stats" data-stagger>
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-num" data-value={s.value}>
              <span>0</span>
              <i>{s.suffix}</i>
            </div>
            <div className="stat-label mono">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="focus">
        {focus.map((f, i) => (
          <div className="focus-item" key={f.title}>
            <div className="focus-line" />
            <span className="mono focus-i">0{i + 1}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { sceneState, TARGETS } from "@/lib/store";
import { projects } from "@/data/content";

/**
 * Pinned section: vertical scroll drives a horizontal track of project cards
 * (Redoyanul-style), and the 3D object spins with the horizontal progress.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onEnter: () => (sceneState.target = TARGETS.work),
          onEnterBack: () => (sceneState.target = TARGETS.work),
          onLeaveBack: () => (sceneState.target = TARGETS.about),
          onLeave: () => (sceneState.target = TARGETS.stack),
          onUpdate: (self) => {
            sceneState.hProgress = self.progress;
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            if (count.current) {
              const n = Math.min(
                projects.length,
                Math.max(1, Math.round(self.progress * (projects.length - 1)) + 1)
              );
              count.current.textContent = String(n).padStart(2, "0");
            }
          },
        },
      });

      // Card visuals drift against the track for depth.
      gsap.utils.toArray<HTMLElement>(".card-visual i").forEach((vis) => {
        gsap.fromTo(
          vis,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + distance(),
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="work">
      <div className="work-head">
        <p className="eyebrow">( 02 ) Selected work</p>
        <p className="work-count">
          <span ref={count}>01</span> / {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div ref={track} className="work-track">
        <div className="work-intro">
          <h2>
            Selected
            <br />
            <em>work</em>
          </h2>
          <p>
            Products, platforms and systems I have designed and built. Keep scrolling — the
            gallery moves sideways.
          </p>
          <span className="arrow">→</span>
        </div>

        {projects.map((p, i) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            data-cursor
            style={{ ["--hue" as string]: 70 + ((i * 47) % 260) }}
          >
            <div className="card-visual">
              <i />
              <span className="card-no">{String(i + 1).padStart(2, "0")}</span>
              <span className="card-open">Open ↗</span>
            </div>
            <div className="card-body">
              <p className="card-cat">{p.category}</p>
              <h3>{p.title}</h3>
              <p className="card-desc">{p.description}</p>
              <ul>
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </a>
        ))}

        <div className="work-outro">
          <p>Want to see more?</p>
          <a href="https://github.com/SHASHiYA32" target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="work-progress">
        <div ref={bar} />
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { img, projects, type Project } from "@/data/portfolio";
import SafeImg from "./SafeImg";

type Props = { index: number; onClose: () => void; onChange: (i: number) => void };

const LEVELS = [1, 1.8, 2.6];

export default function ProjectModal({ index, onClose, onChange }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState(0);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const p: Project = projects[index];

  // open animation + scroll lock
  useEffect(() => {
    getLenis()?.stop();
    const ctx = gsap.context(() => {
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(".modal-panel", { y: 60, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power4.out" });
    }, root.current ?? undefined);
    return () => {
      ctx.revert();
      getLenis()?.start();
    };
  }, []);

  // animate content when switching project
  useEffect(() => {
    setLevel(0);
    gsap.fromTo(".modal-swap", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" });
  }, [index]);

  const close = () => {
    gsap.to(root.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };
  const step = (d: number) => onChange((index + d + projects.length) % projects.length);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (level === 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="modal" ref={root} role="dialog" aria-modal="true" aria-label={p.title} onClick={close}>
      <div className="modal-panel" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
        <div
          className={`modal-media${level ? " is-zoomed" : ""}`}
          style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}
          onClick={() => setLevel((l) => (l === 0 ? 1 : 0))}
          onPointerMove={onMove}
          data-cursor={level ? "Zoom out" : "Zoom in"}
        >
          <SafeImg
            key={p.image}
            src={img(p.image, 1800)}
            alt={`${p.title} preview`}
            style={{ scale: LEVELS[level], transformOrigin: `${origin.x}% ${origin.y}%` }}
          />
          <span className="modal-num mono">{p.index} / 0{projects.length}</span>
          <div className="zoom-ctrl" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Zoom out" onClick={() => setLevel((l) => Math.max(0, l - 1))}>
              −
            </button>
            <span className="mono">{Math.round(LEVELS[level] * 100)}%</span>
            <button aria-label="Zoom in" onClick={() => setLevel((l) => Math.min(LEVELS.length - 1, l + 1))}>
              +
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-top">
            <span className="mono modal-swap">{p.category}</span>
            <button className="icon-btn" onClick={close} aria-label="Close">
              ✕
            </button>
          </div>
          <h3 className="modal-title modal-swap">{p.title}</h3>
          <p className="modal-text modal-swap">{p.overview}</p>

          <dl className="modal-meta modal-swap">
            <div>
              <dt className="mono">Role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt className="mono">Type</dt>
              <dd>{p.category}</dd>
            </div>
          </dl>

          <ul className="chips modal-swap">
            {p.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="modal-actions modal-swap">
            <a className="btn" href={p.url} target="_blank" rel="noreferrer" data-cursor-link>
              Visit live site <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="modal-nav">
            <button onClick={() => step(-1)} data-cursor-link>
              ← Prev
            </button>
            <button onClick={() => step(1)} data-cursor-link>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

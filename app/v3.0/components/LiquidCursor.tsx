"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

const COUNT = 8;

/**
 * Liquid / gooey cursor (Obys style): a chain of lagging circles merged by an
 * SVG "goo" filter. The head grows over anything interactive.
 */
const QUERY = "(pointer: fine)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function LiquidCursor() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
  const dots = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = Array.from({ length: COUNT }, () => ({ ...mouse }));
    let headScale = 1;
    let targetScale = 1;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!shown) {
        shown = true;
        pos.forEach((p) => {
          p.x = mouse.x;
          p.y = mouse.y;
        });
        gsap.to(".liquid", { opacity: 1, duration: 0.4 });
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      targetScale = t?.closest("a, button, input, textarea, [data-cursor]") ? 3.4 : 1;
    };
    const onLeave = () => gsap.to(".liquid", { opacity: 0, duration: 0.3 });
    const onEnter = () => shown && gsap.to(".liquid", { opacity: 1, duration: 0.3 });

    const tick = () => {
      headScale += (targetScale - headScale) * 0.15;
      for (let i = 0; i < COUNT; i++) {
        const follow = i === 0 ? mouse : pos[i - 1];
        const ease = 0.42 - i * 0.04;
        pos[i].x += (follow.x - pos[i].x) * ease;
        pos[i].y += (follow.y - pos[i].y) * ease;
        const el = dots.current[i];
        if (!el) continue;
        const base = 1 - i * 0.07;
        const s = i === 0 ? base * headScale : base * (1 + (headScale - 1) * 0.35);
        el.style.transform = `translate3d(${pos[i].x}px, ${pos[i].y}px, 0) translate(-50%, -50%) scale(${s})`;
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      gsap.ticker.remove(tick);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>
      <div className="liquid" aria-hidden="true" style={{ opacity: 0 }}>
        {Array.from({ length: COUNT }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              dots.current[i] = el;
            }}
            className="liquid-dot"
          />
        ))}
      </div>
    </>
  );
}

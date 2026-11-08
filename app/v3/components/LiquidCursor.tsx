"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SIZES = [22, 20, 17, 14, 11, 8];

/** Gooey trail of blobs following the pointer (SVG goo filter). */
export default function LiquidCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(pointer: coarse)").matches) return;

    const blobs = Array.from(root.querySelectorAll<HTMLElement>("[data-blob]"));
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pts = blobs.map(() => ({ x: target.x, y: target.y }));

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("a, button, input, textarea, [data-cursor]");
      gsap.to(root, { "--s": hit ? 2.4 : 1, duration: 0.4, ease: "power3.out" });
    };

    const tick = () => {
      let tx = target.x;
      let ty = target.y;
      blobs.forEach((b, i) => {
        const p = pts[i];
        const k = 0.34 - i * 0.045;
        p.x += (tx - p.x) * k;
        p.y += (ty - p.y) * k;
        b.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(var(--s, 1))`;
        tx = p.x;
        ty = p.y;
      });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("mouseover", onOver);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="v3-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </defs>
      </svg>
      <div
        ref={ref}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 100,
          filter: "url(#v3-goo)",
          mixBlendMode: "difference",
        }}
      >
        {SIZES.map((s) => (
          <div
            key={s}
            data-blob
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: s,
              height: s,
              borderRadius: "50%",
              background: "#fff",
              willChange: "transform",
            }}
          />
        ))}
      </div>
    </>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const N = 7;

/** Gooey "liquid" cursor: a chain of circles trailing the pointer, merged by an SVG goo filter. */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = root.current!;
    document.documentElement.classList.add("has-cursor");
    const dots = Array.from(el.querySelectorAll<HTMLElement>(".c"));
    const label = el.querySelector<HTMLElement>(".cursor-label")!;
    const m = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = dots.map(() => ({ x: m.x, y: m.y }));

    const move = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      el.style.opacity = "1";
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        el.dataset.hover = "1";
        label.textContent = labelled.dataset.cursor || "";
      } else if (t.closest("a,button,[data-cursor-link]")) {
        el.dataset.hover = "link";
        label.textContent = "";
      } else {
        delete el.dataset.hover;
        label.textContent = "";
      }
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    const tick = () => {
      pos.forEach((p, i) => {
        const tx = i === 0 ? m.x : pos[i - 1].x;
        const ty = i === 0 ? m.y : pos[i - 1].y;
        const k = i === 0 ? 0.4 : 0.42;
        p.x += (tx - p.x) * k;
        p.y += (ty - p.y) * k;
        dots[i].style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
      });
      label.style.transform = `translate3d(${pos[0].x}px,${pos[0].y}px,0) translate(-50%,-50%)`;
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    gsap.ticker.add(tick);

    // Magnetic buttons
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
      const mv = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const lv = () => {
        xTo(0);
        yTo(0);
      };
      btn.addEventListener("pointermove", mv);
      btn.addEventListener("pointerleave", lv);
      cleanups.push(() => {
        btn.removeEventListener("pointermove", mv);
        btn.removeEventListener("pointerleave", lv);
      });
    });

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      gsap.ticker.remove(tick);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
            />
          </filter>
        </defs>
      </svg>
      <div className="cursor-goo">
        {Array.from({ length: N }).map((_, i) => (
          <div className="c" key={i}>
            <i style={{ ["--s" as string]: `${22 - i * 2.2}px` }} />
          </div>
        ))}
      </div>
      <div className="cursor-label" />
    </div>
  );
}

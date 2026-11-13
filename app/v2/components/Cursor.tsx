"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = root.current!;
    const glass = el.querySelector<HTMLElement>(".cursor-glass")!;
    const label = el.querySelector<HTMLElement>(".cursor-label")!;

    document.documentElement.classList.add("has-cursor");

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const vel = { x: 0, y: 0 };
    let isVisible = false;

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) {
        pos.x = mouse.x;
        pos.y = mouse.y;
        isVisible = true;
        el.style.opacity = "1";
      }
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

    // Only hide when actually leaving the browser window
    const out = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        isVisible = false;
        el.style.opacity = "0";
      }
    };

    const tick = () => {
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;

      pos.x += dx * 0.28;
      pos.y += dy * 0.28;

      vel.x = dx * 0.28;
      vel.y = dy * 0.28;

      const speed = Math.hypot(vel.x, vel.y);
      const angle = Math.atan2(vel.y, vel.x) * (180 / Math.PI);

      // Liquid stretch based on speed (clamped so it never breaks)
      const stretch = Math.min(speed * 0.035, 0.85);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch * 0.35;

      glass.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      label.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("mouseout", out);
    gsap.ticker.add(tick);

    // Magnetic buttons (preserved from your original code)
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
      document.removeEventListener("mouseout", out);
      gsap.ticker.remove(tick);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden>
      <div className="cursor-glass" />
      <div className="cursor-label" />
    </div>
  );
}
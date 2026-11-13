"use client";
import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Scroll-triggered entrance animations for everything inside `scope`:
 *  .reveal-lines  → masked line reveal on its `.inner` children
 *  [data-fade]    → fade + rise
 *  [data-stagger] → children fade + rise in sequence
 */
export function useReveals(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-lines").forEach((el) => {
        const inner = el.querySelectorAll(".inner");
        gsap.set(inner, { yPercent: 115, opacity: 1 });
        gsap.to(inner, {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.fromTo(
          Array.from(el.children),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      });
    }, scope.current ?? undefined);
    return () => ctx.revert();
  }, [scope]);
}

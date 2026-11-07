"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore, sceneState } from "@/lib/store";

/** Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisStore.current = lenis;

    const onScroll = () => {
      ScrollTrigger.update();
      sceneState.velocity = lenis.velocity;
    };
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  return null;
}

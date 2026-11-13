"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore, sceneState } from "@/lib/store";
import SmoothScroll from "./SmoothScroll";
import Loader from "./Loader";
import LiquidCursor from "./LiquidCursor";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Work from "./Work";
import Stack from "./Stack";
import Contact from "./Contact";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Experience() {
  const [ready, setReady] = useState(false);
  const progress = useRef<HTMLDivElement>(null);

  const onReveal = useCallback(() => {
    sceneState.ready = true;
    setReady(true);
  }, []);

  useEffect(() => {
    // Layout shifts once fonts/images settle: re-measure all triggers.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    const tween = gsap.to(progress.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
    });

    // Smooth-scroll for any in-page button marked with data-scroll-to.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-scroll-to]");
      if (!a) return;
      e.preventDefault();
      lenisStore.current?.scrollTo(a.dataset.scrollTo!, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      <SmoothScroll />
      <LiquidCursor />
      <Loader onReveal={onReveal} />
      <div ref={progress} className="progress" />
      <Scene />
      <Nav />
      <main className="main">
        <Hero ready={ready} />
        <About />
        <Work />
        <Stack />
        <Contact />
      </main>
    </>
  );
}

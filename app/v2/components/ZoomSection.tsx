"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { images } from "@/data/portfolio";
import SafeImg from "./SafeImg";

/** Pinned scroll-zoom: a small framed photo opens up to fill the screen while the headline flies past the camera. */
export default function ZoomSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });
      tl.fromTo(
        ".zoom-media",
        { clipPath: "inset(30% 36% 30% 36% round 22px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
        0
      )
        .fromTo(".zoom-media img", { scale: 1.7 }, { scale: 1, duration: 1 }, 0)
        .fromTo(".zoom-text", { scale: 1, opacity: 1 }, { scale: 3.2, opacity: 0, duration: 0.8 }, 0.15)
        .fromTo(".zoom-caption", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3 }, 0.75);
    }, root.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <section className="zoom" ref={root}>
      <div className="zoom-media">
        <SafeImg src={images.zoom} alt="" />
        <div className="zoom-shade" />
      </div>
      <h2 className="zoom-text">
        Zoom in
        <br />
        on the <em>details</em>
      </h2>
      <p className="zoom-caption">
        <span className="mono">Typography · Spacing · Motion · Accessibility</span>
        Pixel-perfect at every scale.
      </p>
    </section>
  );
}

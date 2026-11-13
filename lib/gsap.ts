import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run `cb` once the loader has finished (or immediately if it already has). */
export function onReady(cb: () => void) {
  if (document.documentElement.dataset.ready) {
    cb();
    return () => {};
  }
  window.addEventListener("app:ready", cb, { once: true });
  return () => window.removeEventListener("app:ready", cb);
}

import type Lenis from "lenis";

/** Shared Lenis instance so nav / footer can trigger smooth scrolling. */
export const lenisStore: { current: Lenis | null } = { current: null };

export type SceneTarget = { x: number; y: number; s: number };

/**
 * Where the 3D object should sit for each section.
 * x is a fraction of half the viewport width (-1 = left edge, 1 = right edge),
 * y is in world units, s is scale.
 */
export const TARGETS = {
  hero: { x: 0.52, y: 0, s: 1 },
  about: { x: -0.55, y: 0, s: 0.8 },
  work: { x: 0.78, y: 0.6, s: 0.42 },
  stack: { x: 0.55, y: 0.5, s: 1.15 },
  contact: { x: 0, y: -0.1, s: 1 },
} satisfies Record<string, SceneTarget>;

/** Mutable state shared between GSAP/ScrollTrigger and the R3F render loop. */
export const sceneState = {
  target: { ...TARGETS.hero } as SceneTarget,
  /** scroll velocity in px/s (decays when scrolling stops) */
  velocity: 0,
  /** 0..1 progress of the horizontal "work" section */
  hProgress: 0,
  /** normalised pointer position, -1..1 */
  pointer: { x: 0, y: 0 },
  /** flips to true when the loader curtain starts lifting */
  ready: false,
};

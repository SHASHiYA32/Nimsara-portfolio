import type Lenis from "lenis";

/** Shared Lenis instance so nav / footer can trigger smooth scrolling. */
export const lenisStore: { current: Lenis | null } = { current: null };

export type PoseName = "hero" | "about" | "work" | "stack" | "contact";

export type SceneTarget = { x: number; y: number; s: number; pose: PoseName };

/**
 * Where the 3D character sits (and what he is doing) for each section.
 * x is a fraction of half the viewport width (-1 = left edge, 1 = right edge),
 * y is in world units, s is scale. In "work" the character walks along the
 * progress bar, so x / y are computed in Scene.tsx instead.
 */
export const TARGETS = {
  hero: { x: 0.52, y: 0, s: 1.1, pose: "hero" },
  about: { x: -0.62, y: 0, s: 0.86, pose: "about" },
  work: { x: 0, y: 0, s: 0.2, pose: "work" },
  stack: { x: 0.55, y: 0.2, s: 1, pose: "stack" },
  contact: { x: 0.74, y: 0.65, s: 0.7, pose: "contact" },
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

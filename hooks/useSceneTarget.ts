"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { sceneState, type SceneTarget } from "@/lib/store";

/** Moves the 3D object to `target` while `ref` is in the middle of the viewport. */
export function useSceneTarget(
  ref: RefObject<HTMLElement | null>,
  target: SceneTarget
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => {
        if (self.isActive) sceneState.target = target;
      },
    });
    return () => st.kill();
  }, [ref, target]);
}

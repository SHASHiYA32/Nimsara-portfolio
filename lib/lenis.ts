import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export function scrollToId(id: string) {
  const l = getLenis();
  if (id === "top") {
    if (l) l.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (l) {
    l.scrollTo(`#${id}`, { duration: 1.8, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

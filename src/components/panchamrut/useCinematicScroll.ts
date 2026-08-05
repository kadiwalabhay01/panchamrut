import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Lenis smooth scroll wired into the GSAP ticker + ScrollTrigger. */
export function useCinematicScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

/** Scoped gsap.context helper — animations are auto-reverted on unmount. */
export function useSceneContext(
  scope: RefObject<HTMLElement | null>,
  build: (ctx: { gsap: typeof gsap }) => void,
) {
  const buildRef = useRef(build);
  buildRef.current = build;

  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => buildRef.current({ gsap }), scope.current);
    return () => ctx.revert();
  }, [scope]);
}

export { gsap, ScrollTrigger };
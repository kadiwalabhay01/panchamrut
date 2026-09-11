import { useEffect, useRef, useState } from "react";
import kalashVideo from "@/assets/kalash2.mp4";
import { useSceneContext } from "./useCinematicScroll";

export function SceneOpening() {
  const root = useRef<HTMLDivElement>(null);
  const [showHeading, setShowHeading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowHeading(false);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  useSceneContext(root, ({ gsap }) => {
    // Scene 01 — the diya lights, darkness lifts, the kalash arrives.
    gsap
      .timeline({ defaults: { ease: "power2.out" } })
      .from(".open-line span", { yPercent: 130, opacity: 0, stagger: 0.09, duration: 1.6 }, 0.3)
      .from(".scroll-cue", { opacity: 0, duration: 1.4 }, 1.7);

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1024px)", () => {
      gsap.to(".kalash-img", {
        scale: 1.04,
        filter: "blur(2px)",
        ease: "none",
        scrollTrigger: { trigger: ".scene-01", start: "top top", end: "bottom top", scrub: true },
      });
    });

    mm.add("(min-width: 1025px)", () => {
      gsap.to(".kalash-img", {
        scale: 1.5,
        yPercent: -6,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: { trigger: ".scene-01", start: "top top", end: "bottom top", scrub: true },
      });
    });

    gsap.to(".open-line", {
      opacity: 0,
      yPercent: -60,
      ease: "none",
      scrollTrigger: { trigger: ".scene-01", start: "top top", end: "60% top", scrub: true },
    });
  });

  return (
    <div ref={root}>
      {/* ---------- Scene 01 ---------- */}
      <section className="scene-01 relative h-auto lg:h-[180vh]">
        <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen overflow-hidden grain flex items-center justify-center bg-transparent lg:bg-black">
          {/* Main Video: Fits naturally horizontally on mobile with no black bars on top/bottom, full-bleed cover on desktop */}
          <video
            src={kalashVideo}
            aria-label="A handcrafted brass kalash lit by a single oil lamp"
            width={1024}
            height={1280}
            className="kalash-img w-full h-auto block lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover object-center z-10"
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
      </section>
    </div>
  );
}
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

    gsap.to(".kalash-img", {
      scale: 1.5,
      yPercent: -6,
      filter: "blur(6px)",
      ease: "none",
      scrollTrigger: { trigger: ".scene-01", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".open-line", {
      opacity: 0,
      yPercent: -60,
      ease: "none",
      scrollTrigger: { trigger: ".scene-01", start: "top top", end: "60% top", scrub: true },
    });

    // The mandala forms, rotates, then breaks into five droplets.
    gsap
      .timeline({
        scrollTrigger: { trigger: ".mandala-stage", start: "top top", end: "bottom top", scrub: 1, pin: true },
      })
      .fromTo(".mandala", { scale: 0.35, opacity: 0, rotate: -60 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.4 })
      .to(".mandala", { rotate: 180, duration: 2 }, "<0.4")
      .fromTo(".mandala-ring", { opacity: 0.15, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "<0.2")
      .fromTo(".soul", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 1 }, "<0.2")
      .fromTo(".soul-label", { opacity: 1, y: 18 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8 }, "<0.2");
  });

  return (
    <div ref={root}>
      {/* ---------- Scene 01 ---------- */}
      <section className="scene-01 relative h-[180vh]">
        <div className="sticky top-0 h-screen overflow-hidden grain">
          <video
            src={kalashVideo}
            aria-label="A handcrafted brass kalash lit by a single oil lamp"
            width={1024}
            height={1280}
            className="kalash-img absolute inset-0 h-full w-full object-cover object-center opacity-999"
            muted
            autoPlay
            loop
            playsInline
          />

          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-end pb-24 px-6 text-center">
            <div className="scroll-cue mt-12 flex flex-col items-center gap-3 text-ivory/50">
              <span className="eyebrow">Scroll</span>
              <span className="h-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
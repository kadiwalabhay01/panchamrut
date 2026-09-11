import { useRef } from "react";
import tasteImg from "@/assets/taste.jpg";
import { useSceneContext } from "./useCinematicScroll";

export function SceneTaste() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    // Smooth fade & gentle reveal with no overshoot
    gsap.fromTo(
      ".taste-content",
      {
        scale: 0.94,
        y: 24,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 60%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });

  return (
    <section
      ref={root}
      className="taste-scene relative h-[400px] sm:h-[600px] md:h-screen w-full overflow-hidden flex items-center justify-center bg-ink"
    >
      {/* Stable image with no scroll movement */}
      <img
        src={tasteImg}
        alt="Taste"
        className="taste-img absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-ink/25 pointer-events-none" />

      {/* Text coming like a popup from the middle */}
      <div className="taste-content relative z-10 flex flex-col items-center text-center text-ivory origin-center px-4">
        <h2 className="font-display text-[clamp(4rem,15vw,8rem)] leading-[0.85] tracking-widest drop-shadow-2xl">
          TASTE
        </h2>
        <div className="mt-6 md:mt-8 space-y-1.5 font-display text-base sm:text-lg md:text-2xl drop-shadow-lg text-ivory/90 tracking-wide max-w-4xl">
          <p>At Panchamrut, taste is an invitation to experience South India in its most soulful form. The aroma of curry leaves, the warmth of freshly ground spices, the tang of tamarind and the richness of coconut come together in dishes that are vibrant yet balanced. Rooted in tradition and crafted with care, every plate at Panchamrut is a celebration of flavour, memory and the joy of eating together.</p>
        </div>
      </div>
    </section>
  );
}
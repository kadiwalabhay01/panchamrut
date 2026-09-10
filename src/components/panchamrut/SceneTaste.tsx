import { useRef } from "react";
import tasteImg from "@/assets/taste.jpg";
import { useSceneContext } from "./useCinematicScroll";

export function SceneTaste() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    // Text pops up from the middle on scroll
    gsap.fromTo(
      ".taste-content",
      {
        scale: 0,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "back.out(1.4)",
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
        <div className="mt-6 md:mt-8 space-y-1.5 font-display text-base sm:text-lg md:text-2xl drop-shadow-lg text-ivory/90 tracking-wide">
          <p>Taste is more than flavour.</p>
          <p>It is a memory, felt with every bite.</p>
        </div>
      </div>
    </section>
  );
}
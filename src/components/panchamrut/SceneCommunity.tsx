import { useRef, useState } from "react";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const MEMORIES = [
  { src: m1, caption: "Three generations." },
  { src: m2, caption: "First coffee date." },
  { src: m3, caption: "Every festival begins here." },
  { src: m1, caption: "Sunday mornings." },
  { src: m3, caption: "Office lunch, stretched to an hour." },
  { src: m2, caption: "Weekend breakfast." },
];

export function SceneCommunity() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideOffset, setSlideOffset] = useState(0);

  const slide = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const maxScroll = trackRef.current.scrollWidth - window.innerWidth + 80;
    const step = Math.min(window.innerWidth * 0.4, 460);

    let newOffset = direction === "right" ? slideOffset + step : slideOffset - step;
    if (newOffset < 0) newOffset = 0;
    if (newOffset > maxScroll) newOffset = maxScroll;

    setSlideOffset(newOffset);

    gsap.to(trackRef.current, {
      x: -newOffset,
      duration: 0.9,
      ease: "power2.out",
    });

    const progress = maxScroll > 0 ? newOffset / maxScroll : 0;
    gsap.utils.toArray<HTMLElement>(".polaroid-card").forEach((card, i) => {
      const baseRotate = i % 3 === 0 ? 2.8 : -2.2;
      const baseY = i % 2 ? 14 : -14;
      gsap.to(card, {
        y: baseY + Math.sin(progress * Math.PI * 2 + i) * 12,
        rotate: baseRotate + Math.cos(progress * Math.PI + i) * 2,
        duration: 0.9,
        ease: "power2.out",
      });
    });
  };

  return (
    <section className="community-scene relative bg-[#DCC8AA] text-ink select-none">
      <div className="community-stage relative h-screen overflow-hidden grain flex flex-col justify-between p-6 sm:p-12">
        {/* Top Header & Desktop Subtext */}
        <div className="relative z-20 flex flex-col justify-center items-center text-center">
          <h2 className="font-display text-[clamp(3rem,10vw,4.75rem)] text-white leading-[0.9] mb-4 uppercase">Community</h2>
          <p className="text-center text-white max-w-3xl">At Panchamrut, sharing goes beyond the table. We share the richness of culture, the joy of food, stories, experiences and traditions—creating connections that bring people a little closer, while everyone enjoys their own space.</p>
        </div>

        {/* Sliding Memory Track */}
        <div className="relative z-10 w-full overflow-visible my-auto py-6">
          <div
            ref={trackRef}
            className="flex items-center gap-10 pl-2 pr-24 will-change-transform mt-2"
          >
            {MEMORIES.map((memory, i) => (
              <figure
                key={i}
                style={{
                  transform: `translateY(${i % 2 ? "14px" : "-14px"}) rotate(${i % 3 === 0 ? "2.8deg" : "-2.2deg"})`,
                }}
                className="polaroid-card polaroid w-[78vw] shrink-0 bg-coconut p-4 pb-14 shadow-[0_30px_70px_-30px_oklch(0.2_0.03_60/0.55)] sm:w-[36vw] lg:w-[22vw] transition-shadow duration-500 hover:shadow-[0_35px_80px_-25px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={memory.src}
                  alt={memory.caption}
                  loading="lazy"
                  width={800}
                  height={1008}
                  className="h-[36vh] w-full object-cover"
                />
                <figcaption className="mt-6 text-center font-display text-lg md:text-xl italic text-ink/70">
                  {memory.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Bottom Section: Mobile subtext on left, Square Slide Buttons always on the bottom right */}
        <div className="z-20 flex items-center justify-between sm:justify-end gap-6 mt-4">

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => slide("left")}
              disabled={slideOffset <= 0}
              aria-label="Previous memory"
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-none border border-ink/30 bg-white/80 hover:bg-white text-ink flex items-center justify-center transition-all duration-200 hover:border-ink hover:scale-105 active:scale-95 shadow-sm cursor-pointer ${slideOffset <= 0 ? "opacity-35 cursor-not-allowed hover:scale-100" : ""
                }`}
            >
              <ChevronLeft className="w-5 h-5 text-ink" />
            </button>
            <button
              onClick={() => slide("right")}
              aria-label="Next memory"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-none border border-ink/30 bg-white/80 hover:bg-white text-ink flex items-center justify-center transition-all duration-200 hover:border-ink hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-ink" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SceneCommunity;
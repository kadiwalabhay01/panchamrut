import { useRef, useState, useEffect } from "react";
import m1 from "@/assets/coummunity/family_eating_together.jpeg";
import m2 from "@/assets/coummunity/children_sharing_food.jpeg";
import m3 from "@/assets/coummunity/friends_laughing.jpeg";
import m4 from "@/assets/coummunity/birthday_celebration.jpeg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const MEMORIES = [
  { src: m1, caption: "Family Eating Together" },
  { src: m2, caption: "Children Sharing Food" },
  { src: m3, caption: "Friends Laughing" },
  { src: m4, caption: "Birthday Celebration" },
  { src: m2, caption: "Office lunch, stretched to an hour." },
  { src: m3, caption: "Weekend breakfast." },
];

export function SceneCommunity() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [slideOffset, setSlideOffset] = useState(0);

  // keep a ref in sync so useEffect closure never reads stale state
  const slideOffsetRef = useRef(0);
  const syncOffset = (v: number) => {
    slideOffsetRef.current = v;
    setSlideOffset(v);
  };

  // ── Native touch listeners (passive:false so we can preventDefault) ──
  useEffect(() => {
    const el = wrapperRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    let dragging = false;
    let startX = 0;
    let startOffset = 0;

    const wobbleCards = (progress: number) => {
      gsap.utils.toArray<HTMLElement>(".polaroid-card").forEach((card, i) => {
        const baseRotate = i % 3 === 0 ? 2.8 : -2.2;
        const baseY = i % 2 ? 14 : -14;
        gsap.set(card, {
          y: baseY + Math.sin(progress * Math.PI * 2 + i) * 12,
          rotate: baseRotate + Math.cos(progress * Math.PI + i) * 2,
        });
      });
    };

    let startTime = 0;

    const onStart = (e: TouchEvent) => {
      if (window.innerWidth >= 1024) return; // desktop — skip
      dragging = true;
      startX = e.touches[0].clientX;
      startTime = Date.now();
      startOffset = slideOffsetRef.current;
      gsap.killTweensOf(track);
    };

    const onMove = (e: TouchEvent) => {
      if (!dragging) return;
      // prevent vertical page scroll while swiping horizontally
      e.preventDefault();
      const delta = startX - e.touches[0].clientX;
      const maxScroll = track.scrollWidth - window.innerWidth + 80;
      const newOffset = Math.max(0, Math.min(startOffset + delta, maxScroll));
      gsap.set(track, { x: -newOffset });
      slideOffsetRef.current = newOffset; // update ref live (no re-render during drag)
      wobbleCards(maxScroll > 0 ? newOffset / maxScroll : 0);
    };

    const onEnd = (e: TouchEvent) => {
      if (!dragging) return;
      dragging = false;

      const endX = e.changedTouches[0].clientX;
      const velocity = (startX - endX) / Math.max(Date.now() - startTime, 1); // px/ms, + = swiped left
      const FLICK = 0.25;
      const currentOffset = slideOffsetRef.current;
      const maxScroll = track.scrollWidth - window.innerWidth + 80;

      // Use real card positions from DOM for pixel-perfect snap
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".polaroid-card"));

      // Find which card is currently closest to the left viewport edge
      let closestIdx = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - currentOffset);
        if (dist < minDist) { minDist = dist; closestIdx = i; }
      });

      // Flick adjusts by 1
      let targetIdx = closestIdx;
      if (velocity > FLICK) targetIdx = Math.min(closestIdx + 1, cards.length - 1);
      if (velocity < -FLICK) targetIdx = Math.max(closestIdx - 1, 0);

      // Snap offset = card's offsetLeft (left-aligns it), clamped to maxScroll
      const snapOffset = Math.max(0, Math.min(cards[targetIdx].offsetLeft, maxScroll));

      syncOffset(snapOffset);
      wobbleCards(maxScroll > 0 ? snapOffset / maxScroll : 0);
      gsap.to(track, { x: -snapOffset, duration: 0.55, ease: "power3.out" });
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false }); // ← key fix
    el.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, []); // runs once — stale closure avoided via slideOffsetRef

  const slide = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const maxScroll = trackRef.current.scrollWidth - window.innerWidth + 80;
    const step = Math.min(window.innerWidth * 0.4, 460);

    let newOffset = direction === "right" ? slideOffset + step : slideOffset - step;
    if (newOffset < 0) newOffset = 0;
    if (newOffset > maxScroll) newOffset = maxScroll;

    syncOffset(newOffset);

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
        <div
          ref={wrapperRef}
          className="relative z-10 w-full overflow-visible my-auto py-6"
        >
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
                className="polaroid-card polaroid w-[78vw] shrink-0 bg-coconut p-4 pb-10 shadow-[0_30px_70px_-30px_oklch(0.2_0.03_60/0.55)] sm:w-[36vw] lg:w-[22vw] transition-shadow duration-500 hover:shadow-[0_35px_80px_-25px_rgba(0,0,0,0.45)]"
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
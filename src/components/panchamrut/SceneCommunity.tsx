import { useRef } from "react";
import m1 from "@/assets/memory-1.jpg";
import m2 from "@/assets/memory-2.jpg";
import m3 from "@/assets/memory-3.jpg";
import { useSceneContext } from "./useCinematicScroll";

const MEMORIES = [
  { src: m1, caption: "Three generations." },
  { src: m2, caption: "First coffee date." },
  { src: m3, caption: "Every festival begins here." },
  { src: m1, caption: "Sunday mornings." },
  { src: m3, caption: "Office lunch, stretched to an hour." },
  { src: m2, caption: "Weekend breakfast." },
];

export function SceneCommunity() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    const track = root.current?.querySelector<HTMLElement>(".memory-track");
    if (track) {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 64),
        ease: "none",
        scrollTrigger: {
          trigger: ".community-stage",
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }

    gsap.utils.toArray<HTMLElement>(".polaroid").forEach((p, i) => {
      gsap.to(p, {
        yPercent: i % 2 ? 8 : -8,
        rotate: i % 3 === 0 ? 2.4 : -1.8,
        ease: "none",
        scrollTrigger: { trigger: ".community-stage", start: "top top", end: "bottom top", scrub: true },
      });
    });
  });

  return (
    <section ref={root} className="community-scene relative bg-sandstone text-ink">
      <div className="community-stage relative h-screen overflow-hidden grain">
        <div className="absolute left-6 top-8 z-10 sm:left-12">
          {/* <p className="eyebrow text-copper">Scene Six</p> */}
          <h2 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.9]">Community</h2>
        </div>

        <div className="memory-track absolute left-0 top-[55%] flex -translate-y-1/2 items-center gap-10 pl-8 pr-24 will-change-transform">
          {MEMORIES.map((memory, i) => (
            <figure
              key={i}
              className="polaroid w-[78vw] shrink-0 bg-coconut p-4 pb-14 shadow-[0_30px_70px_-30px_oklch(0.2_0.03_60/0.55)] sm:w-[36vw] lg:w-[26vw]"
            >
              <img
                src={memory.src}
                alt={memory.caption}
                loading="lazy"
                width={800}
                height={1008}
                className="h-[42vh] w-full object-cover"
              />
              <figcaption className="mt-6 text-center font-display text-lg md:text-xl italic text-ink/70">
                {memory.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="absolute bottom-4 right-8 max-w-xs text-right text-xs uppercase tracking-[0.28em] text-ink/45">
          No testimonials.<br /> Only memories.
        </p>
      </div>
    </section>
  );
}
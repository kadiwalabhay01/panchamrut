import { useRef } from "react";
import kalash from "@/assets/kalash2.jpeg";
import { useSceneContext } from "./useCinematicScroll";

export function SceneFinal() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    // 1. Pinned image stage: droplets merge into the kalash
    gsap
      .timeline({
        scrollTrigger: { trigger: ".final-stage", start: "top top", end: "+=120%", scrub: 1, pin: true },
      })
      .fromTo(".droplet", { scale: 1, opacity: 0.9 }, { x: 0, y: 0, scale: 0.4, opacity: 0, duration: 1.2 })
      .fromTo(".final-kalash", { scale: 1.35, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4 }, "<0.5");

    // 2. Just after image: text and buttons animate when scrolling down
    gsap.from(".final-line", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".final-content", start: "top 75%" },
    });

    gsap.from(".final-buttons", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: ".final-content", start: "top 75%" },
    });
  });

  const radius = 150;

  return (
    <div ref={root} className="bg-night text-ivory">
      {/* Pinned Image Stage */}
      <section className="final-stage relative h-screen overflow-hidden grain">
        <img
          src={kalash}
          alt="The brass kalash, returned, with soft steam rising"
          loading="lazy"
          width={1024}
          height={1280}
          className="final-kalash absolute inset-0 h-full w-full object-cover opacity-0"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent_0%,var(--night)_72%)]" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
            return (
              <span
                key={i}
                className="droplet absolute h-16 w-16 rounded-full bg-[radial-gradient(circle_at_32%_28%,var(--coconut),var(--gold)_45%,var(--copper))] shadow-[0_0_60px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
                style={{
                  transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
                }}
              />
            );
          })}
        </div>

        <span className="animate-steam pointer-events-none absolute bottom-1/2 left-1/2 h-48 w-20 -translate-x-1/2 rounded-full bg-coconut/20 blur-3xl" />
      </section>

      {/* Text and Buttons Section: appears when scrolling down just after the image */}
      <section className="final-content relative py-10 sm:py-12 md:py-16 flex flex-col items-center justify-center px-6 text-center bg-[#060301]">
        <p className="final-line font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1.19]">
          Come for the meal.
          <span className="block italic gold-text">Stay for the feeling.</span>
        </p>
        <div className="final-buttons mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-full bg-gold border border-transparent px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.24em] text-night transition-all duration-300 hover:scale-[1.04]"
          >
            Explore our menu
          </a>
          <a
            href="#visit"
            className="inline-flex items-center justify-center rounded-full border border-gold px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.24em] text-ivory/90 transition-all duration-300 hover:bg-gold hover:text-night hover:scale-[1.04]"
          >
            Visit Panchamrut
          </a>
        </div>
      </section>

    </div>
  );
}
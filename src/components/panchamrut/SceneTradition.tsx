import { useRef } from "react";
import temple from "@/assets/temple.jpg";
import { useSceneContext } from "./useCinematicScroll";

export function SceneTradition() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    // The temple draws itself out of the dust.
    gsap.utils.toArray<SVGPathElement>(".draw").forEach((path) => {
      const len = path.getTotalLength?.() ?? 1200;
      gsap.fromTo(
        path,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: ".tradition-stage", start: "top top", end: "+=140%", scrub: 1 },
        },
      );
    });

    gsap.to(".temple-photo", {
      opacity: 0.55,
      scale: 1.12,
      ease: "none",
      scrollTrigger: { trigger: ".tradition-stage", start: "top top", end: "+=180%", scrub: true },
    });

    gsap.from(".tradition-item", {
      opacity: 0,
      y: 60,
      stagger: 0.18,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ".tradition-list", start: "top 78%" },
    });

    gsap.to(".dust", {
      yPercent: -220,
      ease: "none",
      scrollTrigger: { trigger: ".tradition-scene", start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  const items = [
    { title: "The bell", note: "Rung once, heard all morning." },
    { title: "The stone grinder", note: "Batter, ground slow, never heated." },
    { title: "The banana leaf", note: "Washed, unfolded, never reused." },
    { title: "The kolam", note: "Drawn at dawn, gone by dusk." },
  ];

  return (
    <section ref={root} className="tradition-scene relative bg-night text-ivory">
      <div className="tradition-stage sticky top-0 h-screen overflow-hidden grain">
        <img
          src={temple}
          alt="A South Indian stone temple corridor lit by brass lamps at dawn"
          loading="lazy"
          width={1600}
          height={1200}
          className="temple-photo absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="rays absolute inset-0 opacity-60" />

        <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" fill="none">
          <g stroke="oklch(0.82 0.12 80)" strokeWidth="1.4" strokeOpacity="0.75">
            <path className="draw" d="M120 460 L680 460" />
            <path className="draw" d="M200 460 L200 250 L400 120 L600 250 L600 460" />
            <path className="draw" d="M250 460 L250 300 L400 190 L550 300 L550 460" />
            <path className="draw" d="M340 460 L340 340 Q400 290 460 340 L460 460" />
            <path className="draw" d="M400 120 L400 70" />
            <path className="draw" d="M370 70 Q400 30 430 70 Z" />
            <path className="draw" d="M280 250 L280 200 M320 250 L320 200 M480 250 L480 200 M520 250 L520 200" />
          </g>
          <g className="animate-swing" style={{ transformOrigin: "400px 120px" }}>
            <path className="draw" d="M386 128 Q400 170 414 128 Z" stroke="oklch(0.86 0.13 82)" strokeWidth="1.6" />
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="dust absolute h-1 w-1 rounded-full bg-gold/40 animate-drift"
              style={{ left: `${(i * 41) % 98}%`, top: `${(i * 29) % 96}%`, animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-16 px-6 text-center">
          <p className="eyebrow text-gold/70">Scene Five</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9] gold-text">Tradition</h2>
        </div>
      </div>

      <div className="tradition-list relative mx-auto max-w-4xl px-6 py-[22vh]">
        {items.map((item) => (
          <div key={item.title} className="tradition-item border-b border-ivory/10 py-12">
            <h3 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-none">{item.title}</h3>
            <p className="mt-4 text-sm tracking-[0.14em] text-ivory/50">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import kalash from "@/assets/kalash.jpg";
import kalashVideo from "@/assets/kalash.mp4";
import { useSceneContext } from "./useCinematicScroll";

const INGREDIENTS = [
  { name: "Milk", note: "Purity", color: "oklch(0.96 0.01 90)" },
  { name: "Ghee", note: "Nourishment", color: "oklch(0.86 0.11 88)" },
  { name: "Honey", note: "Sweetness of speech", color: "oklch(0.78 0.14 70)" },
  { name: "Curd", note: "Prosperity", color: "oklch(0.94 0.02 80)" },
  { name: "Khand", note: "Bliss", color: "oklch(0.88 0.05 60)" },
  { name: "Tulsi", note: "Devotion", color: "oklch(0.62 0.12 150)" },
];

const SOULS = ["Taste", "Tradition", "Wellness", "Community", "Culture"];

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
      .to(".diya-glow", { opacity: 1, scale: 1, duration: 2.4 }, 0.3)
      .to(".veil", { opacity: 0, duration: 3.2 }, 1.2)
      .from(".kalash-img", { opacity: 0, scale: 1.14, duration: 3.4 }, 1.4)
      .from(".open-line span", { yPercent: 130, opacity: 0, stagger: 0.09, duration: 1.6 }, 2.6)
      .from(".scroll-cue", { opacity: 0, duration: 1.4 }, 4);

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

    // Scene 02 — ingredients pour, each with its own ripple.
    gsap.utils.toArray<HTMLElement>(".pour-row").forEach((row) => {
      gsap
        .timeline({
          scrollTrigger: { trigger: row, start: "top 85%", end: "top 35%", scrub: 1 },
        })
        .fromTo(row.querySelector(".pour-label"), { opacity: 0, y: 60 }, { opacity: 1, y: 0 })
        .fromTo(
          row.querySelector(".ripple"),
          { scale: 0.2, opacity: 0 },
          { scale: 1, opacity: 1 },
          0,
        )
        .to(row.querySelector(".ripple"), { scale: 1.6, opacity: 0.25 });
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
            poster={kalash}
            aria-label="A handcrafted brass kalash lit by a single oil lamp"
            width={1024}
            height={1280}
            className="kalash-img absolute inset-0 h-full w-full object-cover object-center opacity-90"
            muted
            autoPlay
            loop
            playsInline
          />
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,transparent_0%,var(--night)_78%)]" />
          <div className="diya-glow pointer-events-none absolute left-1/2 top-[62%] h-[36vw] w-[36vw] -translate-x-1/2 -translate-y-1/2 scale-50 rounded-full opacity-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_45%,transparent)_0%,transparent_65%)] blur-2xl animate-breathe" /> */}

          <div className="absolute inset-0 bg-black/30" />

          <div className="veil absolute inset-0 bg-night" />

          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-end pb-24 px-6 text-center">
            <p
              className={`open-line font-display text-[clamp(2rem,5.4vw,4.6rem)] leading-[1.19] text-ivory transition-opacity duration-500 ${showHeading ? "opacity-100" : "opacity-0 hidden"
                }`}>

              {["Every meal begins", "with a blessing."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span className="block">{line}</span>
                </span>
              ))}
            </p>
            <div className="scroll-cue mt-12 flex flex-col items-center gap-3 text-ivory/50">
              <span className="eyebrow">Scroll</span>
              <span className="h-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Scene 02 ---------- */}
      <section className="relative bg-night py-[18vh] hidden">
        <div className="mx-auto max-w-5xl px-6">
          <p className="eyebrow text-gold/70">Scene Two — The Making</p>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[1] text-ivory">
            Five offerings,
            <span className="block italic text-gold">poured slowly.</span>
          </h2>

          <div className="mt-[14vh] space-y-[16vh]">
            {INGREDIENTS.map((ing, i) => (
              <div key={ing.name} className="pour-row relative flex items-center justify-center">
                <span
                  className="ripple absolute h-[52vw] max-h-[520px] w-[52vw] max-w-[520px] rounded-full blur-2xl"
                  style={{
                    background: `radial-gradient(circle, color-mix(in oklab, ${ing.color} 30%, transparent) 0%, transparent 68%)`,
                  }}
                />
                <div className="pour-label relative text-center">
                  <span className="eyebrow text-ivory/40">0{i + 1}</span>
                  <p
                    className="mt-3 font-display text-[clamp(3rem,10vw,8rem)] leading-none"
                    style={{ color: ing.color }}
                  >
                    {ing.name}
                  </p>
                  <p className="mt-4 text-sm tracking-[0.3em] uppercase text-ivory/45">{ing.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Scene 03 ---------- */}
      <section className="mandala-stage relative h-screen overflow-hidden bg-night grain">
        <div className="rays absolute inset-0 opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="mandala h-[74vmin] w-[74vmin] animate-spin-slow">
            <defs>
              <radialGradient id="mg" cx="50%" cy="50%">
                <stop offset="0%" stopColor="oklch(0.92 0.09 88)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="oklch(0.62 0.13 60)" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="120" fill="url(#mg)" />
            {Array.from({ length: 24 }).map((_, i) => (
              <ellipse
                key={i}
                className="mandala-ring"
                cx="200"
                cy="120"
                rx="16"
                ry="72"
                fill="none"
                stroke="oklch(0.82 0.12 80)"
                strokeOpacity="0.42"
                transform={`rotate(${i * 15} 200 200)`}
              />
            ))}
            <circle cx="200" cy="200" r="158" fill="none" stroke="oklch(0.78 0.13 78)" strokeOpacity="0.3" className="mandala-ring" />
          </svg>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {SOULS.map((soul) => (
              <div key={soul} className="flex flex-col items-center gap-4">
                <span className="soul h-16 w-16 rounded-full bg-[radial-gradient(circle_at_32%_28%,var(--coconut),var(--gold)_45%,var(--copper))] shadow-[0_0_50px_color-mix(in_oklab,var(--gold)_55%,transparent)] sm:h-24 sm:w-24 animate-breathe" />
                <span className="soul-label eyebrow text-ivory/70">{soul}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
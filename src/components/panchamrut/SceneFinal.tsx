import { useRef } from "react";
import kalash from "@/assets/kalash.jpg";
import { useSceneContext } from "./useCinematicScroll";

export function SceneFinal() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    gsap
      .timeline({
        scrollTrigger: { trigger: ".final-stage", start: "top top", end: "+=200%", scrub: 1, pin: true },
      })
      .fromTo(".droplet", { scale: 1, opacity: 0.9 }, { x: 0, y: 0, scale: 0.4, opacity: 0, duration: 1.2 })
      .fromTo(".final-kalash", { scale: 1.35, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4 }, "<0.5")
      .fromTo(".final-line", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2 }, "<0.6")
      .fromTo(".final-cta", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15, duration: 1 }, "<0.5");

    gsap.from(".footer-col", {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".site-footer", start: "top 88%" },
    });
  });

  const radius = 150;

  return (
    <div ref={root} className="bg-night text-ivory">
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

        <div className="absolute inset-0 flex items-center justify-center">
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

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="final-line font-display text-[clamp(2rem,6vw,5rem)] leading-[1.05] opacity-0">
            Come for the meal.
            <span className="block italic gold-text">Stay for the feeling.</span>
          </p>
          <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#menu"
              className="final-cta rounded-full bg-gold px-10 py-4 text-sm font-medium uppercase tracking-[0.24em] text-night opacity-0 transition-transform duration-500 hover:scale-[1.04]"
            >
              Explore our menu
            </a>
            <a
              href="#visit"
              className="final-cta rounded-full border border-ivory/30 px-10 py-4 text-sm font-medium uppercase tracking-[0.24em] text-ivory/80 opacity-0 transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              Visit Panchamrut
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer relative border-t border-ivory/10 px-6 py-24">
        <p className="footer-col mx-auto mb-20 max-w-6xl font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-tight text-ivory/80">
          Eat slowly. <span className="italic gold-text">Stay longer.</span> Come again.
        </p>
        <div className="mx-auto grid max-w-6xl gap-14 sm:grid-cols-3">
          <div className="footer-col">
            <p className="font-display text-4xl gold-text">Panchamrut</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/50">
              Five elements. One soulful meal. Served since the first lamp was lit.
            </p>
          </div>
          <div className="footer-col text-sm text-ivory/55">
            <p className="eyebrow text-ivory/35">Visit</p>
            <p className="mt-5 leading-relaxed">
              14, Temple Street
              <br />
              Basavanagudi, Bengaluru
            </p>
          </div>
          <div className="footer-col text-sm text-ivory/55">
            <p className="eyebrow text-ivory/35">Hours</p>
            <p className="mt-5 leading-relaxed">
              Breakfast 6:30 — 11:00
              <br />
              Meals 12:00 — 15:00
              <br />
              Evening 16:00 — 21:30
            </p>
          </div>
        </div>
        <p className="mx-auto mt-20 max-w-6xl text-xs uppercase tracking-[0.28em] text-ivory/25">
          © {new Date().getFullYear()} Panchamrut
        </p>
      </footer>
    </div>
  );
}
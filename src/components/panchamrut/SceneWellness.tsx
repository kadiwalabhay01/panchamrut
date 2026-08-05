import { useRef } from "react";
import wellness from "@/assets/wellness.jpg";
import { useSceneContext } from "./useCinematicScroll";

const INGREDIENTS = [
  { name: "Turmeric", stat: "Curcumin", detail: "Anti-inflammatory root, broken fresh each morning." },
  { name: "Black pepper", stat: "+2000% uptake", detail: "Piperine carries turmeric into the blood." },
  { name: "Coconut", stat: "MCT fats", detail: "Cooling, scraped by hand, never bottled." },
  { name: "Fermented rice", stat: "Live cultures", detail: "Twelve hours of gut-friendly fermentation." },
  { name: "Drumstick", stat: "7× Vitamin C", detail: "Grown at the edge of the kitchen garden." },
  { name: "Curry leaf", stat: "Iron + folate", detail: "Tempered in ghee, never discarded." },
  { name: "Lentils", stat: "Plant protein", detail: "Toor, moong and urad — the spine of every meal." },
  { name: "Tamarind", stat: "Antioxidants", detail: "Soaked, squeezed, souring the rasam at the end." },
];

const PLATE = [
  { label: "Carbohydrate", value: 45, note: "Rice, millet, fermented batter" },
  { label: "Protein", value: 22, note: "Lentils, curd, coconut" },
  { label: "Healthy fat", value: 18, note: "Ghee, sesame, coconut oil" },
  { label: "Micronutrients", value: 15, note: "Chutneys, greens, tempering" },
];

export function SceneWellness() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    gsap.to(".wellness-photo", {
      yPercent: 16,
      ease: "none",
      scrollTrigger: { trigger: ".wellness-scene", start: "top bottom", end: "bottom top", scrub: true },
    });

    gsap.utils.toArray<HTMLElement>(".seed").forEach((card, i) => {
      gsap
        .timeline({ scrollTrigger: { trigger: card, start: "top 88%", end: "top 45%", scrub: 1 } })
        .fromTo(card, { scale: 0.86, opacity: 0, rotate: i % 2 ? 3 : -3 }, { scale: 1, opacity: 1, rotate: 0 })
        .fromTo(card.querySelector(".seed-bar"), { scaleX: 0 }, { scaleX: 1 }, "<0.2");
    });

    gsap.from(".wellness-title span", {
      yPercent: 120,
      opacity: 0,
      stagger: 0.08,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: { trigger: ".wellness-title", start: "top 82%" },
    });

    gsap.utils.toArray<HTMLElement>(".plate-row").forEach((row) => {
      gsap.fromTo(
        row.querySelector(".plate-fill"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        },
      );
    });
  });

  return (
    <section ref={root} className="wellness-scene relative overflow-hidden bg-forest py-[18vh] text-coconut grain">
      <img
        src={wellness}
        alt="Turmeric, pepper, coconut, rice, drumsticks and curry leaves arranged on dark stone"
        loading="lazy"
        width={1600}
        height={1200}
        className="wellness-photo absolute inset-0 h-[120%] w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--night),transparent_28%,transparent_72%,var(--night))]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow text-coconut/60">Scene Six</p>
        <h2 className="wellness-title mt-6 overflow-hidden font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9]">
          <span className="block">Wellness</span>
        </h2>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-coconut/65">
          Nothing here was designed in a lab. Every ingredient has been prescribed by a grandmother
          long before it was measured by a nutritionist.
        </p>

        <div className="mt-[12vh] grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INGREDIENTS.map((ing) => (
            <article
              key={ing.name}
              className="seed rounded-3xl border border-coconut/15 bg-night/40 p-8 backdrop-blur-sm"
            >
              <h3 className="font-display text-3xl">{ing.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">{ing.stat}</p>
              <span className="seed-bar mt-6 block h-px w-full origin-left bg-gradient-to-r from-gold to-transparent" />
              <p className="mt-6 text-sm leading-relaxed text-coconut/60">{ing.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-[16vh] max-w-3xl">
          <p className="eyebrow text-coconut/60">The balanced plate</p>
          <p className="mt-6 text-sm leading-relaxed text-coconut/65">
            A South Indian meal is already a nutrition plan: fermented carbohydrate for slow energy,
            lentils for complete protein, a spoon of ghee for fat-soluble vitamins, and chutneys that
            carry the micronutrients. Eaten early, eaten warm, eaten together — the timing does as
            much work as the ingredients.
          </p>
          <div className="mt-12 space-y-8">
            {PLATE.map((p) => (
              <div key={p.label} className="plate-row">
                <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.24em]">
                  <span className="text-coconut/80">{p.label}</span>
                  <span className="text-gold">{p.value}%</span>
                </div>
                <div className="mt-3 h-px w-full bg-coconut/15">
                  <span
                    className="plate-fill block h-px origin-left bg-gold"
                    style={{ width: `${p.value}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-coconut/45">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
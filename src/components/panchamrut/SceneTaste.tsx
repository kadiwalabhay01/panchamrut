import { useRef } from "react";
import dosa from "@/assets/dish-dosa.jpg";
import coffee from "@/assets/dish-coffee.jpg";
import { useSceneContext } from "./useCinematicScroll";

const DISHES = [
  {
    name: "Masala Dosa",
    origin: "Udupi, Karnataka",
    story: "Fermented overnight, spread thin at dawn, folded around a potato memory.",
    ingredients: "Rice · Urad dal · Fenugreek · Potato · Curry leaf",
    image: dosa,
  },
  {
    name: "Filter Coffee",
    origin: "Kumbakonam, Tamil Nadu",
    story: "Decoction drips for an hour. The pour between tumbler and davara is the ritual.",
    ingredients: "Peaberry · Chicory · Milk · Patience",
    image: coffee,
  },
];

const MORE = [
  { name: "Medu Vada", origin: "Crisp ring, cloud centre" },
  { name: "Pongal", origin: "Ghee, pepper, and cumin" },
  { name: "Meals", origin: "Banana leaf, twelve bowls" },
  { name: "Kesari", origin: "Saffron, semolina, warmth" },
  { name: "Idli", origin: "Steam, and nothing else" },
  { name: "Rava Upma", origin: "Roasted coarse, stirred once" },
  { name: "Bisi Bele Bath", origin: "Mysore, in one pot" },
  { name: "Payasam", origin: "Milk reduced till dusk" },
];

export function SceneTaste() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    gsap.utils.toArray<HTMLElement>(".dish").forEach((dish) => {
      gsap.fromTo(
        dish.querySelector(".dish-media"),
        { clipPath: "inset(18% 18% 18% 18% round 999px)", scale: 1.2 },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: dish, start: "top 82%", end: "top 24%", scrub: 1 },
        },
      );
      gsap.to(dish.querySelector(".dish-img"), {
        yPercent: -14,
        rotate: 4,
        ease: "none",
        scrollTrigger: { trigger: dish, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(dish.querySelectorAll(".dish-copy > *"), {
        opacity: 0,
        y: 44,
        stagger: 0.14,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: dish, start: "top 70%" },
      });
    });

    gsap.utils.toArray<HTMLElement>(".spice").forEach((s, i) => {
      gsap.to(s, {
        yPercent: -140 - i * 30,
        xPercent: i % 2 ? 60 : -60,
        ease: "none",
        scrollTrigger: { trigger: ".taste-scene", start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    gsap.from(".more-dish", {
      opacity: 0,
      yPercent: 40,
      stagger: 0.12,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".more-grid", start: "top 78%" },
    });

    // The plate dissolves into spices that fly away.
    gsap.to(".dissolve", {
      opacity: 0,
      scale: 1.35,
      filter: "blur(22px)",
      ease: "none",
      scrollTrigger: { trigger: ".dissolve", start: "top 30%", end: "bottom top", scrub: true },
    });
  });

  return (
    <section ref={root} className="taste-scene relative overflow-hidden bg-ivory py-[16vh] text-ink grain">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="spice absolute h-1.5 w-1.5 rounded-full bg-copper/40"
            style={{ left: `${(i * 37) % 96}%`, top: `${(i * 53) % 92}%` }}
          />
        ))}
      </div>

      <header className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow text-copper">Scene Four</p>
        <h2 className="mt-6 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9]">Taste</h2>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-ink/60">
          Six plates, each one a small autobiography of the coast, the ghats and the kitchen fire.
        </p>
      </header>

      <div className="relative mx-auto mt-[14vh] max-w-6xl space-y-[18vh] px-6">
        {DISHES.map((dish, i) => (
          <article
            key={dish.name}
            className={`dish grid items-center gap-12 md:grid-cols-2 ${i % 2 ? "md:[direction:rtl]" : ""}`}
          >
            <div className="dish-media relative overflow-hidden md:[direction:ltr]">
              <img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
                width={1200}
                height={1200}
                className="dish-img h-[62vh] w-full scale-110 object-cover"
              />
              <span className="animate-steam pointer-events-none absolute bottom-1/2 left-1/2 h-40 w-16 -translate-x-1/2 rounded-full bg-coconut/25 blur-2xl" />
            </div>
            <div className="dish-copy md:[direction:ltr]">
              <span className="eyebrow text-copper">{dish.origin}</span>
              <h3 className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]">{dish.name}</h3>
              <p className="mt-6 max-w-sm font-display text-2xl italic leading-snug text-ink/70">{dish.story}</p>
              <p className="mt-8 text-xs uppercase tracking-[0.28em] text-ink/45">{dish.ingredients}</p>
            </div>
          </article>
        ))}

        <div className="more-grid grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {MORE.map((d) => (
            <div key={d.name} className="more-dish bg-ivory p-10">
              <h4 className="font-display text-4xl">{d.name}</h4>
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-ink/45">{d.origin}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dissolve relative mx-auto mt-[16vh] max-w-3xl px-6 text-center">
        <p className="font-display text-[clamp(1.6rem,4vw,3rem)] italic leading-snug text-ink/70">
          And then the plate dissolves into spice, and the spice into stone dust.
        </p>
      </div>
    </section>
  );
}
import { useRef } from "react";
import breakfast from "@/assets/menu-breakfast.jpg";
import meals from "@/assets/menu-meals.jpg";
import sweets from "@/assets/menu-sweets.jpg";
import dosa from "@/assets/dish-dosa.jpg";
import coffee from "@/assets/dish-coffee.jpg";
import { useSceneContext } from "./useCinematicScroll";

const CATEGORIES = [
  {
    name: "Breakfast",
    hours: "6:30 — 11:00",
    image: breakfast,
    line: "Idli. Vada. Pongal. Upma.",
    note: "Steamed before the street wakes up.",
  },
  {
    name: "Dosa",
    hours: "All day",
    image: dosa,
    line: "Benne. Masala. Rava. Set.",
    note: "Batter ground on stone, rested overnight.",
  },
  {
    name: "Meals",
    hours: "12:00 — 15:00",
    image: meals,
    line: "Rice. Sambar. Rasam. Poriyal.",
    note: "Served on leaf, refilled without asking.",
  },
  {
    name: "Filter Coffee",
    hours: "6:30 — 21:30",
    image: coffee,
    line: "Decoction. Milk. Brass tumbler.",
    note: "Poured from a foot above, twice.",
  },
  {
    name: "Sweets",
    hours: "Until they finish",
    image: sweets,
    line: "Kesari. Mysore pak. Payasam.",
    note: "Ghee measured by memory, not spoon.",
  },
];

export function SceneMenu() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    gsap.from(".menu-word span", {
      yPercent: 120,
      opacity: 0,
      stagger: 0.06,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ".menu-intro", start: "top 80%" },
    });

    gsap.utils.toArray<HTMLElement>(".menu-panel").forEach((panel) => {
      gsap.fromTo(
        panel.querySelector(".menu-img"),
        { scale: 1.28, filter: "brightness(0.5)" },
        {
          scale: 1.02,
          filter: "brightness(0.78)",
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(panel.querySelectorAll(".menu-copy > *"), {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 65%" },
      });
    });
  });

  return (
    <section ref={root} id="menu" className="relative bg-night text-ivory">
      <div className="menu-intro mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        {/* <p className="eyebrow text-gold/70">Scene Eight — The Journey</p> */}
        {/* <h2 className="menu-word mt-6 overflow-hidden font-display text-[72px] md:text-[96px] lg:text-[120px] leading-[0.82]">
          <span className="block">Menu</span>
        </h2>
        <p className="mt-10 max-w-md text-sm leading-relaxed text-ivory/55">
          Not a list. Not a PDF. Five doorways, each one opening onto a time of day.
        </p> */}


        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:gap-12">
          <h2 className="menu-word overflow-hidden font-display text-[72px] md:text-[96px] lg:text-[120px] leading-[0.82]">
            <span className="block">Menu</span>
          </h2>

          <p className="max-w-md text-sm leading-relaxed text-ivory/55 md:pt-4">
            Not a list. Not a PDF. Five doorways, each one opening onto a time of day.
          </p>
        </div>

      </div>

      {CATEGORIES.map((cat, i) => (
        <article key={cat.name} className="menu-panel relative h-[60vh] sm:h-[92vh] overflow-hidden grain">
          <img
            src={cat.image}
            alt={`${cat.name} at Panchamrut`}
            loading="lazy"
            width={1600}
            height={1200}
            className="menu-img absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--night),transparent_58%)]" />
          <div
            className={`menu-copy absolute inset-x-0 bottom-0 flex flex-col px-4 sm:px-6 pb-10 sm:pb-12 md:pb-16 mx-auto max-w-7xl ${i % 2 ? "items-end text-right" : "items-start"
              }`}
          >
            <span className="eyebrow text-gold/80">{cat.hours}</span>
            <h3 className="mt-4 font-display text-[clamp(3rem,12vw,9rem)] leading-[0.85]">{cat.name}</h3>
            <p className="mt-6 max-w-sm font-display text-2xl italic text-ivory/75">{cat.line}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-ivory/45">{cat.note}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

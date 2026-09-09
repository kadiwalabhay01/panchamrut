import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import cultureKolam from "@/assets/culture_kolam.jpeg";
import cultureBananaLeaf from "@/assets/culture_banana_leaf.jpeg";
import cultureCoffeeRoasting from "@/assets/culture_coffee_roasting.jpeg";
import cultureCoffeeBrewing from "@/assets/culture_coffee_brewing.jpeg";
import cultureCoffeeBrewing2 from "@/assets/culture_coffee_brewing2.jpeg";
import cultureMusic from "@/assets/culture_music.jpeg";
import bhojan from "@/assets/bhojan.png";

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const EXPERIENCES = [
  {
    id: "kolam",
    number: "01",
    category: "KOLAM",
    title: "The Art of Welcome",
    description:
      "Kolam is more than decoration. It is a quiet daily ritual of greeting — drawn with patience, geometry, and sacred rhythm to bless the threshold.",
    tag: "RITUAL AND INTENTION",
    image: cultureKolam,
    layout: "top",
    dotLabel: "KOLAM",
  },
  {
    id: "banana-leaf",
    number: "02",
    category: "BANANA LEAF",
    title: "A Ritual Served on a Leaf",
    description:
      "The banana leaf is part of the experience — simple, generous, clean, and deeply rooted in South Indian tradition. Washing and serving upon it is a sacred gesture of care.",
    tag: "THE EARTHEN PLATE",
    image: cultureBananaLeaf,
    layout: "top",
    dotLabel: "BANANA LEAF",
  },
  {
    id: "coffee-roasting",
    number: "03",
    category: "COFFEE ROASTING",
    title: "The Aroma Before the First Sip",
    description:
      "Coffee at Panchamrut begins long before it reaches the traditional tumbler. Hand-selected Western Ghat beans are slowly roasted to draw out the deep notes of chicory and rich caramel.",
    tag: "WESTERN GHATS SELECTION",
    image: cultureCoffeeRoasting,
    layout: "full",
    dotLabel: "ROAST",
  },
  {
    id: "coffee-brewing",
    number: "04",
    category: "BREWING",
    title: "Brewed With Patience",
    description:
      "Every single cup is prepared through a meticulous decoction process, allowing the warmth and chicory-enriched strength to concentrate over hours.",
    tag: "DECOCTION PROCESS",
    image: cultureCoffeeBrewing,
    layout: "top",
    dotLabel: "BREW",
  },
  {
    id: "serving",
    number: "05",
    category: "SERVING",
    title: "Hospitality, Served Warm",
    description:
      "The final touch is our hospitality. Poured gracefully from tumbler to davara and back to raise a creamy frothy crown, the gesture is as beautiful as it is comforting.",
    tag: "THE DEGREE POUR",
    image: cultureCoffeeBrewing2,
    layout: "top",
    dotLabel: "SERVE",
  },
  {
    id: "music",
    number: "06",
    category: "MUSICAL EVENING",
    title: "When the Evening Comes Alive",
    description:
      "Some evenings are meant to linger. Gentle, resonant sounds of the Veena and classic Carnatic ragas float through our courtyard, binding conversation and culture over filter coffee.",
    tag: "WEEKEND RAGA ASSEMBLIES",
    image: cultureMusic,
    layout: "full",
    dotLabel: "MUSIC",
  },
] as const;

type ExpLayout = "top" | "full" | "left" | "right";

function ExperienceCard({
  exp,
  index,
  onVisible,
}: {
  exp: (typeof EXPERIENCES)[number];
  index: number;
  onVisible: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) onVisible(index); },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onVisible]);

  const layout = exp.layout as ExpLayout;

  // ── Full-bleed dark overlay (coffee roasting, music)
  if (layout === "full") {
    return (
      <div ref={ref} className="relative w-full overflow-hidden" style={{ minHeight: "72vh" }}>
        <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(5,12,8,0.90)_0%,rgba(5,12,8,0.68)_35%,rgba(5,12,8,0.45)_58%,rgba(5,12,8,0.72)_100%)]" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          className="relative z-10 flex flex-col justify-center mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 text-ivory max-w-7xl"
          style={{ minHeight: "104vh" }}
        >
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
            {exp.category}
          </span>
          <h3 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-normal max-w-lg">
            {exp.title}
          </h3>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-ivory/80 max-w-xl">
            {exp.description}
          </p>
          <span className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
            {exp.tag}
          </span>
        </motion.div>
      </div>
    );
  }

  // ── Image top, frosted text overlay panel (top layout cards)
  if (layout === "top") {
    return (
      <div ref={ref} className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          className="relative overflow-hidden rounded-[14px] sm:rounded-2xl border border-forest/10 shadow-xl h-[420px] sm:h-[480px] md:h-[520px] lg:h-auto lg:aspect-[16/9] flex flex-col justify-end"
        >
          <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="relative z-10 bg-[#EFEAE1] opacity-[89%] backdrop-blur-sm border-t border-white/20 px-4 sm:px-10 lg:px-12 py-5 sm:py-7 lg:py-8 text-center flex flex-col items-center justify-center">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-gold-deep font-semibold">
              {exp.category}
            </span>
            <h3 className="mt-1.5 sm:mt-2 font-display text-xl sm:text-2xl lg:text-[clamp(1.8rem,4vw,2.8rem)] leading-tight font-normal text-ink">
              {exp.title}
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-ink/80 max-w-sm sm:max-w-md mx-auto">
              {exp.description}
            </p>
            <div className="w-8 h-[1px] bg-gold-deep/40 mt-3 mb-1.5 sm:mt-4 sm:mb-2" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gold-deep font-semibold">
              {exp.tag}
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Split: image left (brewing)
  if (layout === "left") {
    return (
      <div ref={ref} className="w-full max-w-5xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: SMOOTH_EASE }}
          className="grid md:grid-cols-2 overflow-hidden border border-forest/10 shadow-lg"
        >
          <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
            <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="bg-sandstone px-7 sm:px-10 py-10 sm:py-14 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold">
              {exp.category}
            </span>
            <h3 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] leading-tight font-normal text-ink">
              {exp.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/65 max-w-xs">
              {exp.description}
            </p>
            <span className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              {exp.tag}
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Split: text left, image right (serving)
  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: SMOOTH_EASE }}
        className="grid md:grid-cols-2 overflow-hidden border border-forest/10 shadow-lg"
      >
        <div className="bg-sandstone px-7 sm:px-10 py-10 sm:py-14 flex flex-col justify-center order-2 md:order-1">
          <span className="text-[11px] uppercase tracking-[0.28em] text-gold font-semibold">
            {exp.category}
          </span>
          <h3 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] leading-tight font-normal text-ink">
            {exp.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink/65 max-w-xs">
            {exp.description}
          </p>
          <span className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
            {exp.tag}
          </span>
        </div>
        <div className="relative overflow-hidden order-1 md:order-2" style={{ minHeight: "340px" }}>
          <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      </motion.div>
    </div>
  );
}

export function CultureSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleVisible = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <div id="culture" className="w-full">

      {/* ─── Dark Green Hero Intro ─── */}
      <section className="relative w-full bg-forest text-ivory py-10 sm:py-12 md:py-16 text-center overflow-hidden grain">
        {/* <div className="pointer-events-none absolute inset-0 opacity-[0.04] select-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            <circle cx="400" cy="250" r="300" fill="none" stroke="var(--ivory)" strokeWidth="1" strokeDasharray="6 12" />
            <circle cx="400" cy="250" r="180" fill="none" stroke="var(--gold)" strokeWidth="1" />
          </svg>
        </div> */}
        <div className="relative mx-auto max-w-3xl px-6">
          {/* <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            className="text-[11px] uppercase tracking-[0.35em] text-gold font-semibold"
          >
            Scene Seven
          </motion.p> */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: SMOOTH_EASE }}
            className="font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] font-normal tracking-tight"
          >
            More Than a Meal.
            <br />
            A Living <span className="text-gold">Culture.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: SMOOTH_EASE }}
            className="mt-8 text-sm sm:text-base leading-relaxed text-ivory/70 max-w-xl mx-auto"
          >
            At Panchamrut, every visit is an invitation to slow down, experience something familiar,
            and discover something new. From the quiet art of kolam making to the aroma of freshly
            roasted coffee, from banana-leaf rituals to evenings filled with music — culture is part of
            every experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: SMOOTH_EASE }}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-semibold">
              Scroll to Experience Panchamrut
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-gold text-xl"
            >
              ↓
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ─── Scroll Experiences + Right Dot Nav ─── */}
      <div className="relative bg-ivory">

        {/* Right-side vertical dot navigation */}
        {/* <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-3 pointer-events-auto">
          {EXPERIENCES.map((exp, i) => (
            <button
              key={exp.id}
              onClick={() =>
                document.getElementById(`exp-${exp.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="group flex items-center gap-2 focus:outline-none"
              aria-label={`Go to ${exp.dotLabel}`}
            >
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.22 }}
                    className="text-[10px] uppercase tracking-widest text-gold font-semibold"
                  >
                    {exp.dotLabel}
                  </motion.span>
                )}
              </AnimatePresence>
              <span
                className={`block rounded-full transition-all duration-300 ${activeIndex === i
                  ? "w-2 h-2 bg-gold"
                  : "w-1.5 h-1.5 bg-forest/25 group-hover:bg-gold/60"
                  }`}
              />
            </button>
          ))}
        </div> */}

        {/* Cards */}
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-16 pt-10 sm:pt-12 md:pt-16">
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.id} id={`exp-${exp.id}`}>
              <ExperienceCard exp={exp} index={i} onVisible={handleVisible} />
            </div>
          ))}
        </div>

        {/* ─── Dark Closing Section ─── */}
        <div className="relative w-full overflow-hidden text-center py-10 sm:py-12 md:py-16 bg-ink">
          <img src={bhojan} alt="Closing" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SMOOTH_EASE }}
            className="relative z-10 mx-auto max-w-2xl px-6"
          >
            <h3 className="font-display text-[clamp(2rem,6vw,4rem)] leading-tight font-normal text-ivory">
              Come for the food.
              <br />
              Return for the feeling.
            </h3>
            <p className="mt-6 text-sm leading-relaxed text-ivory/65 max-w-xl mx-auto">
              Because at Panchamrut, every visit offers something beyond the plate — a ritual, a story,
              a sound, an aroma, an organic moment of conversation.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export const SceneCulture = CultureSection;
export default CultureSection;

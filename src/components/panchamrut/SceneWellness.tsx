import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wellnessStillLife from "@/assets/wellness_still_life.jpg";

interface Ingredient {
  id: string;
  name: string;
  benefit: string;
  x: number; // percentage X position on photo
  y: number; // percentage Y position on photo
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const INGREDIENTS: Ingredient[] = [
  {
    id: "turmeric",
    name: "Turmeric",
    benefit: "Known for its vibrant colour and naturally occurring curcumin.",
    x: 37,
    y: 69,
    tooltipPosition: "left",
  },
  {
    id: "curry-leaves",
    name: "Curry Leaves",
    benefit: "Aromatic leaves traditionally used to add flavour and character to everyday meals.",
    x: 26,
    y: 48,
    tooltipPosition: "left",
  },
  {
    id: "pepper",
    name: "Pepper",
    benefit: "A classic spice that adds warmth and depth to South Indian cooking.",
    x: 72,
    y: 28,
    tooltipPosition: "top",
  },
  {
    id: "coconut",
    name: "Coconut",
    benefit: "A versatile ingredient used across dishes for texture, flavour and nourishment.",
    x: 43,
    y: 24,
    tooltipPosition: "top",
  },
  {
    id: "drumsticks",
    name: "Drumsticks",
    benefit: "A traditional vegetable valued for its distinctive flavour and nutritional profile.",
    x: 56,
    y: 35,
    tooltipPosition: "top",
  },
  {
    id: "lentils",
    name: "Lentils",
    benefit: "A plant-based source of protein and fibre.",
    x: 68,
    y: 52,
    tooltipPosition: "right",
  },
  {
    id: "rice",
    name: "Rice",
    benefit: "A staple source of carbohydrates and everyday energy.",
    x: 56,
    y: 70,
    tooltipPosition: "bottom",
  },
  {
    id: "tamarind",
    name: "Tamarind",
    benefit: "A naturally tangy ingredient that brings brightness and depth to traditional recipes.",
    x: 84,
    y: 40,
    tooltipPosition: "right",
  },
];

const PILLARS = [
  {
    title: "PROTEIN",
    subtitle: "Plant-based nourishment",
  },
  {
    title: "CARBOHYDRATES",
    subtitle: "Everyday energy",
  },
  {
    title: "HEALTHY FATS",
    subtitle: "Balance & satiety",
  },
  {
    title: "VITAMINS + MINERALS",
    subtitle: "Nourishment from ingredients",
  },
];

const TIMINGS = [
  {
    period: "MORNING",
    desc: "Light, nourishing beginnings",
    time: "07:00 – 09:30",
  },
  {
    period: "MIDDAY",
    desc: "A balanced, satisfying meal",
    time: "12:00 – 15:00",
  },
  {
    period: "EVENING",
    desc: "Comforting, lighter choices",
    time: "18:30 – 21:30",
  },
];

// Fluid transition curve
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export function WellnessSection() {
  const [activeId, setActiveId] = useState<string | null>("turmeric");
  // hoveredId is ONLY for the floating tooltip on the image — does NOT affect description or buttons
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Delay clearing hoveredId so tooltip doesn't snap away instantly
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDotEnter = (id: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredId(id);
  };
  const handleDotLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredId(null), 600);
  };

  const activeIngredient = INGREDIENTS.find((i) => i.id === activeId) || INGREDIENTS[0];
  const activeIndex = INGREDIENTS.findIndex((i) => i.id === activeIngredient.id);
  // Tooltip shows the hovered ingredient while hovering, falls back to active
  const tooltipIngredient = (hoveredId ? INGREDIENTS.find((i) => i.id === hoveredId) : null) ?? activeIngredient;

  return (
    <section
      id="wellness"
      aria-labelledby="wellness-heading"
      className="relative w-full overflow-hidden bg-ivory py-10 sm:py-12 md:py-16 text-forest grain border-t border-forest/10"

    >
      {/* Background Subtle Organic Texture Details */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] select-none overflow-hidden">
        <svg className="absolute -right-24 -top-24 w-96 h-96 text-forest" viewBox="0 0 100 100">
          <path d="M50 0 C20 30 20 70 50 100 C80 70 80 30 50 0 Z" fill="currentColor" />
        </svg>
        <svg className="absolute -left-32 bottom-12 w-80 h-80 text-gold" viewBox="0 0 100 100">
          <path d="M0 50 Q 50 0 100 50 Q 50 100 0 50 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Eyebrow Animation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          className="flex items-center gap-3 transform-gpu"
        >
          {/* <span className="h-px w-8 bg-gold/60"></span> */}
          {/* <p className="eyebrow text-gold tracking-[0.35em] text-xs font-semibold">
            Scene Five
          </p> */}
        </motion.div>

        {/* Main Two-Column Desktop / Stacked Mobile Layout */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Typography & Wellness Story (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Main Headline */}
              <motion.h2
                id="wellness-heading"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.05, ease: SMOOTH_EASE }}
                className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.98] tracking-tight font-normal text-forest transform-gpu"
              >
                Good Ingredients.
                <br />
                <span className="italic font-light text-gold">A Healthier You.</span>
              </motion.h2>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1, ease: SMOOTH_EASE }}
                className="mt-5 sm:mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-forest/75 font-normal max-w-xl transform-gpu"
              >
                Our meals bring together a thoughtful balance of proteins, carbohydrates and healthy
                fats, complemented by essential vitamins and minerals from natural ingredients,
                chutneys and side dishes. Rooted in tradition, these wholesome combinations nourish
                the body and make every meal both satisfying and purposeful.
              </motion.p>
            </div>

            {/* Core Concept Banner */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: SMOOTH_EASE }}
              className="mt-6 sm:mt-8 p-4 sm:p-5 border-l-2 border-gold bg-forest/[0.03] transform-gpu"
            >
              <span className="block text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">
                Core Concept
              </span>
              <p className="mt-1 font-display text-lg sm:text-xl md:text-2xl text-forest italic">
                “Unfolding the ingredients behind the meal.”
              </p>
            </motion.div>

            {/* 4 Wellness Pillars Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.2, ease: SMOOTH_EASE }}
              className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-forest/15 transform-gpu"
            >
              <h3 className="text-xs uppercase tracking-[0.28em] text-gold font-semibold mb-4 sm:mb-6">
                Wholesome Pillars
              </h3>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 sm:gap-x-6">
                {PILLARS.map((pillar, idx) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.05, ease: SMOOTH_EASE }}
                    className="relative pl-3 sm:pl-4 border-l border-forest/20 transition-colors duration-300 hover:border-gold transform-gpu"
                  >
                    <span className="text-[10px] font-mono text-gold tracking-widest block mb-0.5">
                    </span>
                    <h4 className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-semibold text-forest">
                      {pillar.title}
                    </h4>
                    <p className="mt-1 text-[11px] sm:text-xs text-forest/50 leading-normal">{pillar.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Still-Life Composition (7 Cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: SMOOTH_EASE }}
            className="lg:col-span-7 flex flex-col transform-gpu"
          >
            {/* Interactive Still-Life Photo Frame */}
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/3] rounded-none border border-forest/15 bg-sandstone shadow-xl overflow-hidden group select-none"
            >
              {/* Main High-Quality Editorial Image */}
              <img
                src={wellnessStillLife}
                alt="South Indian culinary ingredients still life featuring turmeric, curry leaves, pepper, coconut, drumsticks, lentils, rice, and tamarind"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
              />

              {/* Gentle Natural Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent pointer-events-none"></div>

              {/* Botanical Frame Watermark Line */}
              <div className="absolute inset-3 sm:inset-4 border border-gold/30 pointer-events-none"></div>

              {/* Instruction Hint */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 hidden sm:flex items-center gap-2 bg-ivory/90 backdrop-blur-md px-3 py-1.5 border border-forest/10 text-[11px] uppercase tracking-wider text-forest/80 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                Tap ingredient to discover
              </div>

              {/* Hotspot Indicators on Photo — dots only highlight on hover, never on activeId */}
              {INGREDIENTS.map((ing) => {
                const isHovered = ing.id === hoveredId;
                return (
                  <button
                    key={ing.id}
                    onClick={() => setActiveId(ing.id)}
                    onMouseEnter={() => handleDotEnter(ing.id)}
                    onMouseLeave={handleDotLeave}
                    aria-label={`Inspect ${ing.name}`}
                    style={{ left: `${ing.x}%`, top: `${ing.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none p-2 cursor-pointer touch-manipulation"
                  >
                    <span className="relative flex items-center justify-center">
                      {/* Outer animated ring */}
                      <motion.span
                        animate={
                          isHovered
                            ? { scale: 1.4, opacity: 0.7 }
                            : { scale: 1, opacity: 0.4 }
                        }
                        transition={{ duration: 0.25 }}
                        className={`absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-colors duration-300 ${isHovered
                          ? "border-gold bg-gold/10"
                          : "border-white/70"
                          }`}
                      ></motion.span>
                      {/* Center dot */}
                      <motion.span
                        animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
                        transition={{ duration: 0.25, ease: SMOOTH_EASE }}
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-colors duration-300 ${isHovered
                          ? "bg-gold border-white"
                          : "bg-forest/80 border-white/80"
                          }`}
                      ></motion.span>
                    </span>
                  </button>
                );
              })}

              {/* Dynamic Floating Tooltip Card — driven by hoveredId on hover, falls back to activeId */}
              <AnimatePresence>
                {tooltipIngredient && (
                  <motion.div
                    key={tooltipIngredient.id + (hoveredId ? "-hover" : "-active")}
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                    className="absolute z-30 pointer-events-none max-w-[220px] sm:max-w-[260px] transform-gpu hidden sm:block"
                    style={{
                      left: `${Math.min(Math.max(tooltipIngredient.x, 30), 70)}%`,
                      top: tooltipIngredient.y > 60 ? `${tooltipIngredient.y - 20}%` : `${tooltipIngredient.y + 12}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="bg-ivory/95 backdrop-blur-md p-3.5 sm:p-4 border border-gold/40 shadow-2xl relative text-left">
                      {/* Corner Accent */}
                      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gold"></span>
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gold"></span>

                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                        <h4 className="font-display text-base sm:text-xl font-normal text-forest">
                          {tooltipIngredient.name}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-forest/75 leading-relaxed font-normal">
                        "{tooltipIngredient.benefit}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Ingredient Selector Grid & Mobile Active Benefit Spotlight */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-forest/15">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-forest font-semibold">
                    Explore Ingredients
                  </span>
                </div>
                <span className="text-xs text-gold font-serif italic font-medium">
                  {activeIngredient.name}
                </span>
              </div>

              {/* 4x2 Grid: All 8 Ingredients 100% Visible at Once */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5"
                role="tablist"
                aria-label="Ingredients selector"
              >
                {INGREDIENTS.map((ing, idx) => {
                  const isActive = ing.id === activeIngredient.id;
                  return (
                    <button
                      key={ing.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(ing.id)}
                      onFocus={() => setActiveId(ing.id)}
                      className={`group relative flex items-center justify-between px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs transition-all duration-300 border focus:outline-none cursor-pointer text-left transform-gpu ${isActive
                        ? "bg-forest text-ivory border-forest shadow-md -translate-y-0.5"
                        : "bg-sandstone/50 text-forest/75 border-forest/15 hover:border-gold hover:bg-ivory hover:-translate-y-0.5"
                        }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
                        <span
                          className={`text-[9px] font-mono tracking-tighter ${isActive ? "text-gold" : "text-forest/50"
                            }`}
                        >
                        </span>
                        <span
                          className={`truncate text-[11px] sm:text-xs font-medium tracking-wide uppercase ${isActive ? "text-ivory" : "text-forest"
                            }`}
                        >
                          {ing.name}
                        </span>
                      </div>

                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 ${isActive
                          ? "bg-gold scale-125"
                          : "bg-forest/20 group-hover:bg-gold"
                          }`}
                      ></span>
                    </button>
                  );
                })}
              </div>

              {/* Active Ingredient Spotlight Card (Fully Visible on All Screen Sizes) */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIngredient.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                  className="mt-4 p-4 border border-gold/35 bg-forest/[0.03] relative transform-gpu shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-mono tracking-widest text-gold uppercase font-semibold">
                      {/* 0{activeIndex + 1} / 08 —  */}
                      {activeIngredient.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-forest/50 font-medium shrink-0">
                      Traditional Wisdom
                    </span>
                  </div>
                  <p className="mt-2 font-display text-base sm:text-lg text-forest italic leading-snug">
                    “{activeIngredient.benefit}”
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Meal Timing Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: SMOOTH_EASE }}
          className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-forest/15 transform-gpu"
        >
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block">
              Nourishment Rhythm
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-forest mt-2 tracking-tight">
              WHEN YOU EAT MATTERS TOO.
            </h3>
            <p className="mt-2 sm:mt-3 text-xs md:text-sm text-forest/50 leading-relaxed max-w-xl">
              Traditional South Indian dining aligns meals with natural bodily rhythms to foster optimum digestion and sustained vitality.
            </p>
          </div>

          {/* Refined Timeline Composition */}
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-3 relative">
            {/* Connecting Timeline Hairline (Desktop) */}
            <div className="hidden md:block absolute top-[22px] left-0 right-0 h-px bg-forest/15 z-0"></div>

            {TIMINGS.map((timing, idx) => (
              <motion.div
                key={timing.period}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.08, ease: SMOOTH_EASE }}
                className="relative z-10 flex flex-col pt-3 md:pt-8 border-l border-forest/20 md:border-l-0 pl-3.5 md:pl-0 transform-gpu"
              >
                {/* Timeline Node Dot (Desktop) */}
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-ivory border-2 border-gold absolute -top-2 left-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest"></span>
                </div>

                <span className="text-[11px] font-mono text-gold tracking-widest block">
                  {timing.time}
                </span>
                <h4 className="font-display text-lg sm:text-xl md:text-2xl text-forest mt-1">
                  {timing.period}
                </h4>
                <p className="mt-1 text-xs md:text-sm text-forest/75 font-normal leading-relaxed">
                  {timing.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: SMOOTH_EASE }}
          className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-forest/10 text-center flex flex-col items-center justify-center transform-gpu"
        >
          <div className="flex items-center gap-4 text-gold opacity-60">
            <span className="h-px w-12 bg-current"></span>
            <span className="text-xs">✦</span>
            <span className="h-px w-12 bg-current"></span>
          </div>
          <p className="mt-4 font-display text-xl sm:text-2xl md:text-3xl italic text-forest/90 font-light">
            “Rooted in nature. Nourished by tradition.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Export SceneWellness alias so existing imports match seamlessly
export const SceneWellness = WellnessSection;
export default WellnessSection;
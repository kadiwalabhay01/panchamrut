import { motion } from "framer-motion";
import wellnessStillLife from "@/assets/wellness_still_life.jpg";

// Fluid transition curve
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export function WellnessSection() {
  return (
    <section
      id="wellness"
      aria-labelledby="wellness-heading"
      className="relative w-full overflow-hidden bg-ivory py-10 sm:py-12 md:py-16 text-forest grain border-t border-forest/10">

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

        {/* Main Two-Column Desktop / Stacked Mobile Layout */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Column: Typography & Wellness Story (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Main Headline - Slides in from left with blur clear */}
              <motion.h2
                id="wellness-heading"
                initial={{ opacity: 0, x: -70, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.85, delay: 0.1, ease: SMOOTH_EASE }}
                className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.98] tracking-tight font-normal text-forest transform-gpu"
              >
                Wellness
              </motion.h2>

              {/* Supporting Copy - Follows with smooth staggered entrance */}
              <motion.p
                initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.85, delay: 0.25, ease: SMOOTH_EASE }}
                className="mt-5 sm:mt-8 text-sm sm:text-base md:text-lg leading-relaxed text-forest/75 font-normal max-w-xl transform-gpu"
              >
                Our meals bring together a thoughtful balance of proteins, carbohydrates and healthy
                fats, complemented by essential vitamins and minerals from natural ingredients,
                chutneys and side dishes. Rooted in tradition, these wholesome combinations nourish
                the body and make every meal both satisfying and purposeful.
              </motion.p>
            </div>

          </div>

          {/* Right Column: Still-Life Composition (7 Cols on Desktop) - Slides in from side & pops up */}
          <motion.div
            initial={{ opacity: 0, x: 80, y: 30, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.95, delay: 0.15, ease: SMOOTH_EASE }}
            className="lg:col-span-7 flex flex-col transform-gpu"
          >
            {/* Still-Life Photo Frame */}
            <div className="relative w-full aspect-[4/3] rounded-none border border-forest/15 bg-sandstone shadow-2xl overflow-hidden group select-none">
              {/* Main High-Quality Editorial Image with settling zoom */}
              <motion.img
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1.0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 1.1, ease: SMOOTH_EASE }}
                src={wellnessStillLife}
                alt="South Indian culinary ingredients still life featuring turmeric, curry leaves, pepper, coconut, drumsticks, lentils, rice, and tamarind"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Gentle Natural Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent pointer-events-none" />

              {/* Botanical Frame Watermark Line with subtle expansion */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.8, delay: 0.4, ease: SMOOTH_EASE }}
                className="absolute inset-3 sm:inset-4 border border-gold/30 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}


export const SceneWellness = WellnessSection;
export default WellnessSection;
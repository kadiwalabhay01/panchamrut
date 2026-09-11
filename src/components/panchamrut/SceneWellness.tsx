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
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            <div>
              {/* Main Headline */}
              <motion.h2
                id="wellness-heading"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-display text-[clamp(4rem,15vw,8rem)] leading-[0.98] tracking-tight font-normal text-forest transform-gpu"
              >
                Wellness
              </motion.h2>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-forest/75 font-normal max-w-xl transform-gpu"
              >
                Our meals are more than a celebration of flavour—they are a thoughtful balance on a plate. Rice and grains bring wholesome carbohydrates, lentils add protein, vegetables and greens nourish with essential micronutrients, while carefully chosen fats and traditional spices complete the meal. From tempering to fermentation, every element has a purpose—creating food that is comforting, nourishing and deeply rooted in tradition.
              </motion.p>
            </div>

          </div>

          {/* Right Column: Still-Life Composition (7 Cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col transform-gpu"
          >
            {/* Still-Life Photo Frame */}
            <div className="relative w-full aspect-[4/3] rounded-none border border-forest/15 bg-sandstone shadow-2xl overflow-hidden group select-none">
              {/* Main High-Quality Editorial Image */}
              <img
                src={wellnessStillLife}
                alt="South Indian culinary ingredients still life featuring turmeric, curry leaves, pepper, coconut, drumsticks, lentils, rice, and tamarind"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Gentle Natural Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent pointer-events-none" />

              {/* Botanical Frame Watermark Line */}
              <div className="absolute inset-3 sm:inset-4 border border-gold/30 pointer-events-none" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}


export const SceneWellness = WellnessSection;
export default WellnessSection;
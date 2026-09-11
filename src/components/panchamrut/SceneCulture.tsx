import { motion } from "framer-motion";

import cultureKolam from "@/assets/culture_kolam.jpeg";
import cultureBananaLeaf from "@/assets/culture_banana_leaf.jpeg";
import cultureCoffeeRoasting from "@/assets/culture_coffee_brewing.jpeg";
import cultureMusic from "@/assets/culture_coffee_brewing2.jpeg";
import bhojan from "@/assets/bhojan.png";

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

const CULTURE_CARDS = [
  {
    id: "kolam",
    category: "KOLAM",
    title: "The Art of Welcome",
    description:
      "Kolam is more than decoration. It is a quiet daily ritual of greeting — drawn with patience, geometry, and sacred rhythm to bless the threshold.",
    tag: "RITUAL AND INTENTION",
    image: cultureKolam,
  },
  {
    id: "banana-leaf",
    category: "BANANA LEAF",
    title: "A Ritual Served on a Leaf",
    description:
      "The banana leaf is part of the experience — simple, generous, clean, and deeply rooted in South Indian tradition. Washing and serving upon it is a sacred gesture of care.",
    tag: "THE EARTHEN PLATE",
    image: cultureBananaLeaf,
  },
  {
    id: "coffee-roasting",
    category: "BREWING",
    title: "Brewed With Patience",
    description:
      "Every single cup is prepared through a meticulous decoction process, allowing the warmth and chicory-enriched strength to concentrate over hours.",
    tag: "WESTERN GHATS SELECTION",
    image: cultureCoffeeRoasting,
  },
  {
    id: "music",
    category: "SERVING",
    title: "Hospitality, Served Warm",
    description:
      "The final touch is our hospitality. Poured gracefully from tumbler to davara and back to raise a creamy frothy crown, the gesture is as beautiful as it is comforting.",
    tag: "WEEKEND RAGA ASSEMBLIES",
    image: cultureMusic,
  },
];

export function CultureSection() {
  return (
    <div id="culture" className="relative w-full overflow-hidden bg-forest text-ivory">
      {/* ─── Top Intro Section ─── */}
      <section className="relative overflow-hidden bg-forest py-10 sm:py-12 md:py-16 text-center text-ivory">
        {/* Subtle decorative background circles */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] select-none overflow-hidden flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border border-ivory" />
          <div className="w-[600px] h-[600px] rounded-full border border-gold" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease: SMOOTH_EASE }}
            className="mt-4 font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] font-normal tracking-tight text-ivory"
          >
            More Than a Meal.
            <br />
            A Living Culture.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: SMOOTH_EASE }}
            className="mt-8 text-sm sm:text-base leading-relaxed text-ivory/70 max-w-2xl mx-auto"
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
            className="mt-12 flex flex-col items-center gap-2"
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

      {/* ─── Middle Section: Compact Culture Cards with Bottom 40% Frosted Blur ─── */}
      <section className="relative bg-[#f5f0e6] py-10 sm:py-12 md:py-16 grain">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {CULTURE_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: (i % 2) * 0.1,
                  ease: SMOOTH_EASE,
                }}
                className="group relative overflow-hidden rounded-[4px] border border-forest/15 bg-[#eae4d8] shadow-md transition-all duration-500 hover:shadow-xl transform-gpu select-none"
              >
                {/* Full-Cover Background Image with Compact Height */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] md:aspect-[16/9] min-h-[240px] sm:min-h-[260px] md:min-h-[290px] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  />

                  {/* Bottom ~40% Frosted Blur Layer with text directly over image */}
                  <div className="absolute bottom-0 inset-x-0 min-h-[40%] sm:min-h-[42%] bg-[#EFEAE1] opacity-89 backdrop-blur-sm border-t border-white/40 px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 text-center flex flex-col items-center justify-center">
                    {/* Category */}
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.25em] text-gold mb-1 sm:mb-1.5">
                      {card.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl text-forest tracking-tight font-normal leading-tight mb-1 sm:mb-1.5">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[10px] sm:text-[11px] md:text-xs leading-snug sm:leading-relaxed text-forest/75 max-w-sm sm:max-w-md mx-auto">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom Section: Dark Closing with Bhojan & Call to Action ─── */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden text-center py-10 sm:py-12 md:py-16 bg-night select-none">
        {/* Background Bhojan Image */}
        <img
          src={bhojan}
          alt="Panchamrut Meal and Feast"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70 pointer-events-none"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/75 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 flex flex-col items-center">
          <motion.h3
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: SMOOTH_EASE }}
            className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.08] font-normal text-ivory tracking-tight"
          >
            Come for the food.
            <br />
            Return for the feeling.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.12, ease: SMOOTH_EASE }}
            className="mt-6 text-sm sm:text-base leading-relaxed text-ivory/70 max-w-2xl mx-auto"
          >
            Because at Panchamrut, every visit offers something beyond the plate — a ritual, a story,
            a sound, an aroma, an organic moment of conversation.
          </motion.p>

          {/* Button & Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.25, ease: SMOOTH_EASE }}
            className="mt-10 flex flex-col items-center gap-3.5"
          >
            <button
              onClick={() => {
                document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-gold/60 hover:border-gold bg-black/50 hover:bg-gold/15 text-ivory text-xs sm:text-sm tracking-[0.25em] font-medium py-3.5 px-8 transition-all duration-300 uppercase cursor-pointer backdrop-blur-sm"
            >
              Experience Panchamrut +
            </button>
            <span className="text-xs text-gold/85 italic font-display tracking-wide">
              There is always something waiting to be discovered.
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const SceneCulture = CultureSection;
export default CultureSection;

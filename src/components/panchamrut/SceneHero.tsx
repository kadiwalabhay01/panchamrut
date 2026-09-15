import { useEffect, useState } from "react";
import slide1 from "@/assets/hero/1st.jpg";
import slide2 from "@/assets/hero/2nd.jpg";
import slide3 from "@/assets/hero/3rd.jpg";

import mSlide1 from "@/assets/hero/m1.jpeg";
import mSlide2 from "@/assets/hero/m2.jpeg";
import mSlide3 from "@/assets/hero/m3.jpeg";

const slides = [
  { desktop: slide1, mobile: mSlide1 },
  { desktop: slide2, mobile: mSlide2 },
  { desktop: slide3, mobile: mSlide3 },
];

export function SceneHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="scene-hero"
      aria-label="Panchamrut Hero Slider"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── Slide layers ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 639px)" srcSet={slide.mobile} />
            <img
              src={slide.desktop}
              alt="Hero background"
              className="w-full h-full object-cover block select-none"
              draggable={false}
            />
          </picture>

        </div>
      ))}

      {/* ── Stable Text overlay ── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-8 md:pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,10vw,4.25rem)] leading-[0.85] tracking-widest drop-shadow-2xl text-[#D6A43D] font-regular">
              Where Tradition Welcomes You
            </h2>
            <p className="mt-3 text-sm md:text-base text-white leading-relaxed max-w-[36ch]">
              Step into Panchamrut, where South Indian heritage meets modern warmth — crafted through fine woodwork, sterling spaces, and soulful details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


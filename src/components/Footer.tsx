import { useRef } from "react";
import { useSceneContext } from "./panchamrut/useCinematicScroll";
import logo from "@/assets/logo.png";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useSceneContext(root, ({ gsap }) => {
    gsap.from(".footer-col", {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 88%" },
    });
  });

  return (
    <footer
      ref={root}
      className="site-footer relative border-t border-ivory/10 px-4 sm:px-6 py-10 sm:py-12 md:py-16 bg-[#060301] text-ivory select-none"
    >
      <p className="footer-col mx-auto mb-10 sm:mb-12 md:mb-16 max-w-7xl font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-tight text-ivory/80">
        Eat slowly. <span className="italic gold-text">Stay longer.</span> Come again.
      </p>

      <div className="mx-auto grid max-w-7xl gap-12 md:gap-14 sm:grid-cols-3">
        {/* Brand Summary */}
        <div className="footer-col">
          <div className="flex items-center gap-2.5 mb-3">
            <img
              src={logo}
              alt="Panchamrut"
              className="h-12 w-40 sm:h-16 sm:w-56 object-contain"
            />
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/50">
            Five elements. One soulful meal. Served since the first lamp was lit.
          </p>
        </div>

        {/* Location / Address */}
        <div className="footer-col text-sm text-ivory/55">
          <p className="eyebrow text-ivory/35">Visit</p>
          <p className="mt-4 leading-relaxed text-ivory/75">
            14, Temple Street
            <br />
            Basavanagudi, Bengaluru
          </p>
          <a
            href="#visit"
            className="inline-block mt-3 text-xs uppercase tracking-[0.2em] text-gold hover:underline"
          >
            Get Directions →
          </a>
        </div>

        {/* Operating Hours */}
        <div className="footer-col text-sm text-ivory/55">
          <p className="eyebrow text-ivory/35">Hours</p>
          <p className="mt-4 leading-relaxed text-ivory/75">
            Breakfast: 6:30 — 11:00
            <br />
            Meals: 12:00 — 15:00
            <br />
            Evening: 16:00 — 21:30
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 sm:mt-12 md:mt-16 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ivory/5 pt-8 text-xs uppercase tracking-[0.25em] text-ivory/30">
        <p>© {new Date().getFullYear()} Panchamrut South Indian Cafe</p>
        <div className="flex gap-6">
          <a href="#menu" className="hover:text-gold transition-colors">
            Menu
          </a>
          <a href="#culture" className="hover:text-gold transition-colors">
            Culture
          </a>
          <a href="#visit" className="hover:text-gold transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

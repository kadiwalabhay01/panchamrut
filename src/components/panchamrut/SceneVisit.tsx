import { useRef } from "react";
import culture from "@/assets/culture.jpg";
import { useSceneContext } from "./useCinematicScroll";

const LINKS = [
  { label: "Reserve a table", href: "https://wa.me/919000000000", accent: true },
  { label: "Google Maps", href: "https://maps.google.com/?q=Basavanagudi+Bengaluru" },
  { label: "Instagram", href: "https://instagram.com" },
];

export function SceneVisit() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    gsap.to(".visit-photo", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: ".visit-scene", start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.from(".visit-block", {
      opacity: 0,
      y: 46,
      stagger: 0.14,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".visit-scene", start: "top 72%" },
    });
  });

  return (
    <section ref={root} id="visit" className="visit-scene relative overflow-hidden bg-night text-ivory">
      <img
        src={culture}
        alt="Evening lamps outside Panchamrut as guests arrive"
        loading="lazy"
        width={1600}
        height={1200}
        className="visit-photo absolute inset-0 h-[118%] w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--night),transparent_35%,transparent_65%,var(--night))]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        {/* <p className="eyebrow text-gold/70">Scene Ten</p> */}
        <h2 className="visit-block font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9] gold-text">
          Visit Panchamrut
        </h2>

        <div className="mt-10 md:mt-16 grid gap-10 md:gap-14 sm:grid-cols-2">
          <div className="visit-block">
            <p className="eyebrow text-ivory/40">Where</p>
            <p className="mt-5 font-display text-3xl leading-snug text-ivory/85">
              14, Temple Street
              <br />
              Basavanagudi, Bengaluru
            </p>
          </div>
          <div className="visit-block">
            <p className="eyebrow text-ivory/40">When</p>
            <p className="mt-5 text-sm leading-loose text-ivory/60">
              Breakfast 6:30 — 11:00
              <br />
              Meals 12:00 — 15:00
              <br />
              Coffee & evening 16:00 — 21:30
            </p>
          </div>
        </div>

        <div className="visit-block mt-10 md:mt-16 flex flex-wrap gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={
                l.accent
                  ? "rounded-full bg-gold px-9 py-4 text-xs font-medium uppercase tracking-[0.24em] text-night transition-transform duration-500 hover:scale-[1.04]"
                  : "rounded-full border border-ivory/25 px-9 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ivory/75 transition-colors duration-500 hover:border-gold hover:text-gold"
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="visit-block mt-10 md:mt-16 overflow-hidden rounded-sm border border-ivory/10">
          <iframe
            title="Panchamrut location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.56%2C12.93%2C77.60%2C12.96&layer=mapnik"
            loading="lazy"
            className="h-[45vh] w-full opacity-70 grayscale"
          />
        </div>
      </div>
    </section>
  );
}

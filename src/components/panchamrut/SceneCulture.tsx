import { useRef } from "react";
import culture from "@/assets/culture.jpg";
import { useSceneContext } from "./useCinematicScroll";

const MOMENTS = [
  "Kolam, drawn before sunrise",
  "Beans roasting, dark and slow",
  "The pour, from a foot above",
  "Banana leaves, washed at noon",
  "Carnatic evening, three ragas deep",
  "Incense, and the last lamp lit",
];

const EVENTS = [
  { title: "Music Evenings", when: "Every Friday", note: "Two hours of Carnatic, no microphone." },
  { title: "Kolam Workshop", when: "First Sunday", note: "Rice flour, one dot, then eight." },
  { title: "Coffee Roasting", when: "Saturday, 7am", note: "Peaberry, turned by hand until it cracks." },
  { title: "Brewing Class", when: "Saturday, 9am", note: "Decoction, dilution, the perfect pour." },
  { title: "Banana Leaf Etiquette", when: "Monthly", note: "Which corner to fold, and why." },
  { title: "Temple Food Festival", when: "Seasonal", note: "Prasadam recipes, cooked at scale." },
  { title: "Regional Weeks", when: "Rotating", note: "Chettinad, Udupi, Kongunadu, Malnad." },
  { title: "Chef Stories", when: "Last Thursday", note: "One dish, one memory, told aloud." },
];

export function SceneCulture() {
  const root = useRef<HTMLDivElement>(null);

  useSceneContext(root, ({ gsap }) => {
    // Morning light turns to golden hour, then night.
    gsap.fromTo(
      ".daylight",
      { background: "linear-gradient(to bottom, oklch(0.92 0.05 88), oklch(0.86 0.08 74))" },
      {
        background: "linear-gradient(to bottom, oklch(0.42 0.11 48), oklch(0.11 0.014 50))",
        ease: "none",
        scrollTrigger: { trigger: ".culture-scene", start: "top top", end: "bottom bottom", scrub: true },
      },
    );

    gsap.fromTo(
      ".culture-photo",
      { clipPath: "inset(35% 12% 35% 12%)", scale: 1.2 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: ".culture-stage", start: "top bottom", end: "center center", scrub: 1 },
      },
    );

    gsap.from(".moment", {
      opacity: 0,
      x: -50,
      stagger: 0.14,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".moment-list", start: "top 80%" },
    });

    gsap.to(".fairy", {
      opacity: 1,
      stagger: { each: 0.05, from: "random" },
      scrollTrigger: { trigger: ".culture-scene", start: "60% center", end: "bottom bottom", scrub: true },
    });

    const rail = root.current?.querySelector<HTMLElement>(".event-rail");
    if (rail) {
      gsap.to(rail, {
        x: () => -(rail.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: {
          trigger: ".event-stage",
          start: "top top",
          end: () => `+=${rail.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }
  });

  return (
    <section ref={root} className="culture-scene relative overflow-hidden text-ivory">
      <div className="daylight absolute inset-0" />
      <div className="grain absolute inset-0" />

      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="fairy absolute h-1.5 w-1.5 rounded-full bg-gold opacity-0 shadow-[0_0_14px_var(--gold)] animate-breathe"
            style={{ left: `${(i * 23) % 99}%`, top: `${(i * 61) % 90}%`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-[18vh]">
        <p className="eyebrow text-ivory/60">Scene Eight</p>
        <h2 className="mt-6 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9]">Culture</h2>

        <div className="culture-stage mt-[10vh] overflow-hidden rounded-sm">
          <img
            src={culture}
            alt="A kolam drawn at a doorstep surrounded by oil lamps and fairy lights at dusk"
            loading="lazy"
            width={1600}
            height={1200}
            className="culture-photo h-[70vh] w-full object-cover"
          />
        </div>

        <ul className="moment-list mt-[12vh] space-y-8">
          {MOMENTS.map((moment) => (
            <li key={moment} className="moment font-display text-[clamp(1.6rem,4.5vw,3.4rem)] leading-tight text-ivory/85">
              {moment}
            </li>
          ))}
        </ul>
      </div>

      <div className="event-stage relative h-screen overflow-hidden">
        <p className="absolute left-6 top-16 z-10 eyebrow text-gold/70 sm:left-12">Reasons to return</p>
        <div className="event-rail absolute left-0 top-1/2 flex -translate-y-1/2 items-stretch gap-8 pl-6 pr-24 will-change-transform sm:pl-12">
          {EVENTS.map((e) => (
            <article
              key={e.title}
              className="flex w-[74vw] shrink-0 flex-col justify-end border border-ivory/12 bg-night/40 p-10 backdrop-blur-sm sm:w-[42vw] lg:w-[30vw]"
            >
              <span className="eyebrow text-gold/70">{e.when}</span>
              <h3 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]">{e.title}</h3>
              <p className="mt-5 text-sm leading-relaxed text-ivory/55">{e.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
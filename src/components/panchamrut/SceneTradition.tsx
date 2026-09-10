import { useEffect, useRef } from "react";
import { useSceneContext } from "./useCinematicScroll";

// Import all 240 image frames from src/assets/frames
const frameModules = import.meta.glob<string>("/src/assets/frames/*.jpg", {
  eager: true,
  import: "default",
});

const frameUrls = Object.keys(frameModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => frameModules[key]);

export function SceneTradition() {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  // Render a frame onto canvas maintaining cover aspect ratio on desktop & responsive fit on mobile
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    ctx.clearRect(0, 0, width, height);

    // Mobile & Tablet view: screens with width <= 1024px or aspect ratio < 1.4 (portrait & tablet landscape)
    const isMobileOrTablet =
      canvasRatio < 1.4 || (typeof window !== "undefined" && window.innerWidth <= 1024);

    if (isMobileOrTablet) {
      // Mobile & Tablet view: render full width/height fit with ambient background so content is never cropped

      // 1. Ambient background fill
      const bgW = height * imgRatio;
      const bgX = (width - bgW) / 2;
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.drawImage(img, bgX, 0, bgW, height);
      ctx.restore();

      // 2. Main frame centered & fitted nicely within screen
      let fgW = width * 0.96;
      let fgH = fgW / imgRatio;
      if (fgH > height * 0.92) {
        fgH = height * 0.92;
        fgW = fgH * imgRatio;
      }
      const fgX = (width - fgW) / 2;
      const fgY = (height - fgH) / 2;

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 24 * (width / 700);
      ctx.drawImage(img, fgX, fgY, fgW, fgH);
      ctx.restore();
    } else {
      // Desktop / Landscape view: cover full screen
      let renderWidth = width;
      let renderHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderHeight = width / imgRatio;
        offsetY = (height - renderHeight) / 2;
      } else {
        renderWidth = height * imgRatio;
        offsetX = (width - renderWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    }
  };

  // Canvas size and image preloading setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      renderFrame(currentFrameRef.current);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Preload frame images
    const loadedImages: HTMLImageElement[] = [];
    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (i === 0 || i === currentFrameRef.current) {
          renderFrame(currentFrameRef.current);
        }
      };
      loadedImages.push(img);
    });
    imagesRef.current = loadedImages;

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useSceneContext(root, ({ gsap }) => {
    // Scrub through 240 frames over 5 scroll count duration (pin 400% extra height)
    const frameObj = { frame: 0 };
    gsap.to(frameObj, {
      frame: frameUrls.length - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".tradition-stage",
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.5,
        onUpdate: () => {
          const idx = Math.min(Math.max(0, Math.round(frameObj.frame)), frameUrls.length - 1);
          currentFrameRef.current = idx;
          renderFrame(idx);
        },
      },
    });

    gsap.from(".tradition-item", {
      opacity: 0,
      y: 60,
      stagger: 0.18,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: ".tradition-list", start: "top 78%" },
    });

    gsap.to(".dust", {
      yPercent: -220,
      ease: "none",
      scrollTrigger: { trigger: ".tradition-scene", start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  const items = [
    { title: "The bell", note: "Rung once, heard all morning." },
    { title: "The stone grinder", note: "Batter, ground slow, never heated." },
    { title: "The banana leaf", note: "Washed, unfolded, never reused." },
    { title: "The kolam", note: "Drawn at dawn, gone by dusk." },
  ];

  return (
    <section ref={root} className="tradition-scene relative bg-night text-ivory">
      <div className="tradition-stage sticky top-0 h-screen overflow-hidden grain">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover opacity-100 pointer-events-none"
        />
        <div className="rays absolute inset-0 opacity-40 pointer-events-none" />

        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="dust absolute h-1 w-1 rounded-full bg-gold/40 animate-drift"
              style={{ left: `${(i * 41) % 98}%`, top: `${(i * 29) % 96}%`, animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
      </div>

      <div className="tradition-list relative mx-auto max-w-4xl px-6 py-[22vh] hidden">
        {items.map((item) => (
          <div key={item.title} className="tradition-item border-b border-ivory/10 py-12">
            <h3 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-none">{item.title}</h3>
            <p className="mt-4 text-sm tracking-[0.14em] text-ivory/50">{item.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
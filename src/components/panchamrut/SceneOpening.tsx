import { useEffect, useRef, useState, useCallback } from "react";
import kalashVideo from "@/assets/kalash.mp4";
import { useSceneContext, gsap, ScrollTrigger } from "./useCinematicScroll";

export function SceneOpening() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHeading, setShowHeading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowHeading(false);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  // Play video only when it enters the viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = 0.1;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.warn("Autoplay was prevented by browser:", err);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth volume fade via ScrollTrigger (runs once video is mounted)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    gsap.registerPlugin(ScrollTrigger);

    // Max volume capped at 10% — ambient background audio, not jarring
    const MAX_VOL = 0.1;

    const st = ScrollTrigger.create({
      trigger: ".scene-01",
      start: "60% top",   // start fading when 60% of scene-01 has scrolled past top
      end: "bottom top",  // fully silent when scene-01 bottom hits viewport top
      scrub: 0.6,
      onUpdate: (self) => {
        if (video.muted) return; // honour user mute choice
        // Fade from MAX_VOL → 0 proportionally with scroll progress
        video.volume = Math.max(0, MAX_VOL * (1 - self.progress));
      },
      onLeave: () => {
        // guarantee silence when fully scrolled past
        if (!video.muted) video.volume = 0;
      },
      onEnterBack: () => {
        // restore to 10% when scrolling back into scene
        if (!video.muted) video.volume = MAX_VOL;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      // Unmuting: capped at 10% max — ambient, not startling
      video.muted = false;
      video.volume = 0.1;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  useSceneContext(root, ({ gsap }) => {
    // Scene 01 — the diya lights, darkness lifts, the kalash arrives.
    gsap
      .timeline({ defaults: { ease: "power2.out" } })
      .from(".open-line span", { yPercent: 130, opacity: 0, stagger: 0.09, duration: 1.6 }, 0.3)
      .from(".scroll-cue", { opacity: 0, duration: 1.4 }, 1.7);

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1024px)", () => {
      gsap.to(".kalash-img", {
        scale: 1.04,
        filter: "blur(2px)",
        ease: "none",
        scrollTrigger: { trigger: ".scene-01", start: "top top", end: "bottom top", scrub: true },
      });
    });

    mm.add("(min-width: 1025px)", () => {
      gsap.to(".kalash-img", {
        scale: 1.5,
        yPercent: -6,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: { trigger: ".scene-01", start: "top top", end: "bottom top", scrub: true },
      });
    });

    gsap.to(".open-line", {
      opacity: 0,
      yPercent: -60,
      ease: "none",
      scrollTrigger: { trigger: ".scene-01", start: "top top", end: "60% top", scrub: true },
    });
  });

  return (
    <div ref={root}>
      {/* ---------- Scene 01 ---------- */}
      <section className="scene-01 relative h-auto lg:h-[180vh]">
        <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen overflow-hidden grain flex items-center justify-center bg-transparent lg:bg-black">
          {/* Main Video */}
          <video
            ref={videoRef}
            src={kalashVideo}
            aria-label="A handcrafted brass kalash lit by a single oil lamp"
            width={1024}
            height={1280}
            className="kalash-img w-full h-auto block lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover object-center z-10"
            muted
            loop
            playsInline
          />

          {/* Mute / Unmute button — top-right corner, above the video */}
          <button
            id="scene-01-sound-toggle"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            onClick={toggleMute}
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full
                       bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all duration-300
                       hover:bg-black/60 hover:scale-110 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/60"
            style={{ backdropFilter: "blur(8px)" }}
          >
            {isMuted ? (
              /* Speaker with X (muted) */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              /* Speaker with waves (unmuted) */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
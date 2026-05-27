import { useEffect, useRef } from "react";
import gsap from "gsap";

type IntroSplashProps = {
  onComplete: () => void;
};

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = lettersRef.current?.querySelectorAll(".intro-letter");
      if (!letters?.length) return;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.2,
            onComplete,
          });
        },
      });

      tl.from(letters, {
        y: 120,
        opacity: 0,
        rotateX: -90,
        stagger: 0.08,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          lineRef.current,
          { scaleX: 0, duration: 0.8, ease: "power3.inOut" },
          "-=0.4",
        )
        .to(letters, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
        })
        .to(
          letters,
          {
            opacity: 0.3,
            filter: "blur(8px)",
            duration: 0.6,
            ease: "power2.in",
          },
          "+=0.3",
        );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
    >
      <div
        ref={lettersRef}
        className="flex items-center justify-center gap-1 sm:gap-2"
        style={{ perspective: "800px" }}
      >
        {"ENZO".split("").map((char, i) => (
          <span
            key={i}
            className="intro-letter inline-block font-display text-[clamp(4rem,18vw,12rem)] font-extrabold leading-none tracking-tighter text-accent"
            style={{ transformStyle: "preserve-3d" }}
          >
            {char}
          </span>
        ))}
      </div>
      <div
        ref={lineRef}
        className="absolute bottom-[30%] left-1/2 h-px w-32 origin-center -translate-x-1/2 bg-accent sm:w-48"
      />
    </div>
  );
}

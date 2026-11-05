import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, heroStats } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

function ScrollHint() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
        scroll
      </span>
      <div className="h-10 w-px animate-pulse bg-accent/50" />
    </div>
  );
}

function HeroPortrait() {
  return (
    <div className="relative h-28 w-24 shrink-0 sm:h-36 sm:w-32">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-accent/15 blur-xl" />
      <img
        src={site.profileImage}
        alt={site.name}
        className="relative z-10 h-full w-full object-contain object-top drop-shadow-lg"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 85%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.to(".hero-bg-glow", {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center px-6 pb-20 pt-24 lg:pl-64 lg:pr-16"
    >
      <div className="hero-bg-glow pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px] opacity-40" />

      <p className="hero-reveal section-label mb-6">Portfolio 2026</p>

      <h1 className="hero-reveal font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
        <span className="block text-white/40">FULL STACK</span>
        <span className="block text-accent">{site.title.toUpperCase()}</span>
      </h1>

      <p className="hero-reveal mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
        Hello ! I'm <span className="text-white">{site.name}</span>
        {". "}
        {site.roleLine.map((part, i) =>
          part.type === "link" ? (
            <a
              key={i}
              href={part.href}
              target="_blank"
              rel="noreferrer"
              className="text-white underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
            >
              {part.label}
            </a>
          ) : (
            <span key={i}>{part.value}</span>
          ),
        )}
      </p>

      <div className="hero-reveal mt-10 flex flex-wrap gap-4">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-accent px-8 py-3 font-mono text-sm font-medium text-surface transition-transform hover:scale-105"
        >
          Me contacter
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-8 py-3 font-mono text-sm text-white/80 transition-colors hover:border-accent/50 hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={site.debtlint}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-8 py-3 font-mono text-sm text-white/80 transition-colors hover:border-accent/50 hover:text-accent"
        >
          DebtLint
        </a>
      </div>

      <div className="hero-reveal mt-10 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-end sm:gap-10 lg:gap-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 sm:gap-x-8 lg:flex-1 lg:gap-x-10">
          {heroStats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 whitespace-nowrap font-mono text-[11px] text-muted sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-4 sm:ml-4 sm:gap-5 lg:ml-8">
          <ScrollHint />
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}

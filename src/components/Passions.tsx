import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { passions } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function Passions() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".passion-card", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="passions"
      ref={ref}
      className="border-t border-border px-6 py-24 lg:pl-64 lg:pr-16"
    >
      <p className="section-label">Hors écran</p>
      <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
        My Passions
      </h2>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {passions.map((passion) => (
          <article
            key={passion.title}
            className="passion-card rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-transparent p-8"
          >
            <p className="font-display text-4xl font-bold text-accent">
              {passion.stat}
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {passion.statLabel}
            </p>
            <h3 className="mt-6 font-display text-xl font-semibold">
              {passion.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {passion.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

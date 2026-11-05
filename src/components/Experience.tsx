import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-item", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      className="border-t border-border px-6 py-24 lg:pl-64 lg:pr-16"
    >
      <p className="section-label">Parcours</p>
      <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
        My Experience
      </h2>

      <div className="mt-14 space-y-0">
        {experiences.map((exp) => (
          <article
            key={`${exp.company}-${exp.role}`}
            className="exp-item grid gap-4 border-t border-border py-8 sm:grid-cols-[1fr_auto]"
          >
            <div>
              <h3 className="font-display text-xl font-semibold">
                {exp.company}
              </h3>
              <p className="mt-1 font-mono text-sm text-accent">{exp.role}</p>
              <p className="mt-4 max-w-2xl text-white/60">{exp.description}</p>
            </div>
            <p className="font-mono text-sm text-muted sm:text-right">
              {exp.period}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

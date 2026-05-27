import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-group", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="border-t border-border px-6 py-24 lg:pl-64 lg:pr-16"
    >
      <p className="section-label">Technologies</p>
      <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
        My favorite technologies
      </h2>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="skill-group">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

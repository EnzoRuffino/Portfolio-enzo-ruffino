import { useCallback, useEffect, useState } from "react";
import { IntroSplash } from "@/components/IntroSplash";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { Experience } from "@/components/Experience";
import { Passions } from "@/components/Passions";
import { Contact } from "@/components/Contact";
import { FallingDots } from "@/components/FallingDots";
import { useLenis } from "@/hooks/useLenis";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useLenis(introDone);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    if (!introDone) return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [introDone]);

  return (
    <>
      {!introDone && <IntroSplash onComplete={() => setIntroDone(true)} />}

      {introDone && <FallingDots />}

      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <MobileNav activeSection={activeSection} onNavigate={handleNavigate} />

      <main
        className={`relative z-10 transition-opacity duration-500 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
        <Skills />
        <ProjectsShowcase />
        <Experience />
        <Passions />
        <Contact />
      </main>
    </>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { projects } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const WORD_LINES = ["P", "R", "O", "J"];
const LINE_SPEED = [0.8, 1, 0.7, 0.9];
const ACCENT = "#e8ff47";
/** Viewport scroll % par projet — plus haut = défilement horizontal plus lent */
const SCROLL_PER_PROJECT = 150;

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;
    const textContainer = textContainerRef.current;
    if (!section || !cardsContainer || !textContainer) return;

    const moveDistance = window.innerWidth * Math.max(projects.length * 1.1, 5);
    let currentX = 0;

    const gridCanvas = document.createElement("canvas");
    gridCanvas.id = "grid-canvas";
    gridCanvas.style.cssText =
      "position:absolute;inset:0;z-index:0;pointer-events:none";
    section.appendChild(gridCanvas);
    const gridCtx = gridCanvas.getContext("2d");
    if (!gridCtx) return;

    const resizeGrid = () => {
      const dpr = window.devicePixelRatio || 1;
      gridCanvas.width = window.innerWidth * dpr;
      gridCanvas.height = window.innerHeight * dpr;
      gridCanvas.style.width = `${window.innerWidth}px`;
      gridCanvas.style.height = `${window.innerHeight}px`;
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeGrid();

    const drawGrid = (scrollProgress = 0) => {
      gridCtx.fillStyle = "#0a0a0a";
      gridCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      gridCtx.fillStyle = ACCENT;
      const spacing = 30;
      const offset = (scrollProgress * spacing * 10) % spacing;
      const cols = Math.ceil(window.innerWidth / spacing) + 15;
      const rows = Math.ceil(window.innerHeight / spacing);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          gridCtx.beginPath();
          gridCtx.arc(x * spacing - offset, y * spacing, 1, 0, Math.PI * 2);
          gridCtx.fill();
        }
      }
    };

    const lettersScene = new THREE.Scene();
    const lettersCamera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    lettersCamera.position.z = 20;

    const lettersRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    lettersRenderer.setSize(window.innerWidth, window.innerHeight);
    lettersRenderer.setClearColor(0, 0);
    lettersRenderer.setPixelRatio(window.devicePixelRatio);
    lettersRenderer.domElement.style.cssText =
      "position:absolute;inset:0;z-index:1;pointer-events:none";
    section.appendChild(lettersRenderer.domElement);

    const createPath = (yPos: number, amplitude: number) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        points.push(
          new THREE.Vector3(
            -25 + 50 * t,
            yPos + Math.sin(t * Math.PI) * -amplitude,
            (1 - Math.pow(Math.abs(t - 0.5) * 2, 2)) * -5,
          ),
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
        new THREE.LineBasicMaterial({ color: 0 }),
      );
      return { line, curve };
    };

    const paths = [
      createPath(10, 2),
      createPath(3.5, 1),
      createPath(-3.5, -1),
      createPath(-10, -2),
    ];
    paths.forEach(({ line }) => lettersScene.add(line));

    type LetterEl = HTMLDivElement;
    const letterPositions = new Map<
      LetterEl,
      { current: { x: number; y: number }; target: { x: number; y: number } }
    >();

    const pathLetters: {
      curve: THREE.CatmullRomCurve3;
      elements: LetterEl[];
    }[] = [];

    paths.forEach(({ curve }, lineIndex) => {
      const elements: LetterEl[] = [];
      for (let i = 0; i < 15; i++) {
        const el = document.createElement("div");
        el.className =
          "pointer-events-none absolute z-[2] font-display text-[clamp(4rem,12vw,9rem)] font-extrabold text-accent will-change-transform";
        el.style.transformStyle = "preserve-3d";
        el.textContent = WORD_LINES[lineIndex];
        textContainer.appendChild(el);
        letterPositions.set(el, {
          current: { x: 0, y: 0 },
          target: { x: 0, y: 0 },
        });
        elements.push(el);
      }
      pathLetters.push({ curve, elements });
    });

    const updateTargets = (scrollProgress = 0) => {
      pathLetters.forEach(({ curve, elements }, lineIndex) => {
        elements.forEach((el, i) => {
          const point = curve.getPoint(
            (i / 14 + scrollProgress * LINE_SPEED[lineIndex]) % 1,
          );
          const vector = point.clone().project(lettersCamera);
          const pos = letterPositions.get(el)!;
          pos.target = {
            x: (-vector.x * 0.5 + 0.5) * window.innerWidth,
            y: (-vector.y * 0.5 + 0.5) * window.innerHeight,
          };
        });
      });
    };

    const updateLetters = () => {
      letterPositions.forEach((pos, el) => {
        const distX = pos.target.x - pos.current.x;
        if (Math.abs(distX) > window.innerWidth * 0.7) {
          pos.current.x = pos.target.x;
          pos.current.y = pos.target.y;
        } else {
          pos.current.x = lerp(pos.current.x, pos.target.x, 0.07);
          pos.current.y = lerp(pos.current.y, pos.target.y, 0.07);
        }
        el.style.transform = `translate(-50%, -50%) translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      });
    };

    let scrollProgress = 0;
    let rafId = 0;

    const animate = () => {
      updateLetters();
      const targetX = -moveDistance * scrollProgress;
      currentX = lerp(currentX, targetX, 0.12);
      gsap.set(cardsContainer, { x: currentX });
      lettersRenderer.render(lettersScene, lettersCamera);
      rafId = requestAnimationFrame(animate);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${projects.length * SCROLL_PER_PROJECT}%`,
      pin: true,
      pinSpacing: true,
      scrub: 2.5,
      onUpdate: (self) => {
        scrollProgress = self.progress;
        updateTargets(self.progress);
        drawGrid(self.progress);
      },
    });

    drawGrid(0);
    updateTargets(0);
    animate();

    const onResize = () => {
      resizeGrid();
      drawGrid(scrollProgress);
      lettersCamera.aspect = window.innerWidth / window.innerHeight;
      lettersCamera.updateProjectionMatrix();
      lettersRenderer.setSize(window.innerWidth, window.innerHeight);
      updateTargets(scrollProgress);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      window.removeEventListener("resize", onResize);
      gridCanvas.remove();
      lettersRenderer.dispose();
      lettersRenderer.domElement.remove();
      pathLetters.forEach(({ elements }) =>
        elements.forEach((el) => el.remove()),
      );
    };
  }, []);

  return (
    <section id="projects" className="relative">
      <div className="border-t border-border px-6 py-16 lg:pl-64 lg:pr-16">
        <p className="section-label">My Projects</p>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          Projects
        </h2>
        <p className="mt-4 max-w-lg font-mono text-sm text-muted">
          Scroll pour explorer mes projets
        </p>
      </div>

      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-surface"
      >
        <div
          ref={textContainerRef}
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ perspective: "2500px" }}
        />

        <div
          ref={cardsRef}
          className="relative z-10 flex h-screen items-center gap-10"
          style={{ width: `${projects.length * 72 + 100}vw`, paddingLeft: "18vw" }}
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex h-[52vh] w-[42vw] min-w-[340px] max-w-[560px] shrink-0 flex-col gap-3 border border-border bg-black/80 p-3"
            >
              <div className="relative flex-1 overflow-hidden bg-black">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                  />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                  />
                ) : null}
                <span className="absolute left-2 top-2 font-mono text-xs text-accent">
                  {project.id}
                </span>
              </div>
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-base font-semibold text-white">
                    {project.title}
                  </p>
                  <div className="flex shrink-0 gap-2">
                    {project.siteUrl && (
                      <a
                        href={project.siteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] uppercase text-accent hover:underline"
                      >
                        site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] uppercase text-muted hover:text-white"
                      >
                        gh
                      </a>
                    )}
                  </div>
                </div>
                <p className="line-clamp-3 font-mono text-xs text-muted">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

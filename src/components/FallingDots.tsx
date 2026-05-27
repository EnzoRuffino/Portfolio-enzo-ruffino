import { useEffect, useRef } from "react";

const ACCENT = "#e8ff47";
const DOT_COUNT = 82;

type Dot = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
};

export function FallingDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dots: Dot[] = [];
    let rafId = 0;

    const createDot = (y?: number): Dot => ({
      x: Math.random() * width,
      y: y ?? Math.random() * height,
      r: 0.8 + Math.random() * 0.6,
      speed: 0.65 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.12,
      opacity: 0.25 + Math.random() * 0.45,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      dots = Array.from({ length: DOT_COUNT }, () => createDot());
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.y += dot.speed;
        dot.x += dot.drift;

        if (dot.y > height + 8) {
          dot.y = -8;
          dot.x = Math.random() * width;
        }
        if (dot.x < -8) dot.x = width + 8;
        if (dot.x > width + 8) dot.x = -8;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT;
        ctx.globalAlpha = dot.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}

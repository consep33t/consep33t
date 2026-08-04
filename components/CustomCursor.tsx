"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !ring || !label || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COLORS = ["#00F0FF", "#FF2E9F", "#9D4EDD", "#FCEE0A"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop for particle trail
    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;
        p.size *= 0.95;

        if (p.life >= p.maxLife || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha * 0.7);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(renderParticles);
    };
    animId = requestAnimationFrame(renderParticles);

    // Hide cursor elements initially until first mouse move
    gsap.set([cursor, ring, label], { autoAlpha: 0 });
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    gsap.set(label, { xPercent: 15, yPercent: -50 });

    const xCursor = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" });
    const yCursor = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power3.out" });
    const xLabel = gsap.quickTo(label, "x", { duration: 0.1, ease: "power3.out" });
    const yLabel = gsap.quickTo(label, "y", { duration: 0.1, ease: "power3.out" });

    let isHovering = false;
    let isVisible = false;
    let lastX = 0;
    let lastY = 0;

    const showCursors = () => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([cursor, ring], { autoAlpha: 1, duration: 0.3 });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      showCursors();
      xCursor(clientX);
      yCursor(clientY);
      xRing(clientX);
      yRing(clientY);
      xLabel(clientX);
      yLabel(clientY);

      // Spawn trail particle if moved significantly
      const dist = Math.hypot(clientX - lastX, clientY - lastY);
      if (dist > 4 && particles.length < 50) {
        const color = isHovering ? "#FF2E9F" : COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.push({
          x: clientX,
          y: clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2.5 + 1.5,
          color,
          alpha: 1,
          life: 0,
          maxLife: Math.floor(Math.random() * 20) + 15,
        });
        lastX = clientX;
        lastY = clientY;
      }

      const target = e.target as HTMLElement;
      const hoverEl = target.closest('a, button, input, textarea, [data-cursor="hover"]');
      const shouldHover = !!hoverEl;

      if (shouldHover !== isHovering) {
        isHovering = shouldHover;
        if (shouldHover) {
          const customLabel = hoverEl?.getAttribute("data-cursor-label") || "LOCK_ON";
          label.textContent = customLabel;
          gsap.to(label, { autoAlpha: 1, duration: 0.2 });

          gsap.to(ring, {
            scale: 2.4,
            borderColor: "#FF2E9F",
            boxShadow: "0 0 25px rgba(255, 46, 159, 0.8), inset 0 0 10px rgba(255, 46, 159, 0.3)",
            rotate: 45,
            duration: 0.35,
            ease: "back.out(1.7)",
          });
          gsap.to(cursor, {
            backgroundColor: "#FF2E9F",
            scale: 1.5,
            boxShadow: "0 0 15px #FF2E9F",
            duration: 0.25,
          });
        } else {
          gsap.to(label, { autoAlpha: 0, duration: 0.15 });

          gsap.to(ring, {
            scale: 1,
            borderColor: "#00F0FF",
            boxShadow: "0 0 12px rgba(0, 240, 255, 0.5)",
            rotate: 0,
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(cursor, {
            backgroundColor: "#00F0FF",
            scale: 1,
            boxShadow: "0 0 10px #00F0FF",
            duration: 0.25,
          });
        }
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.75, borderColor: "#fcee0a", boxShadow: "0 0 20px #fcee0a", duration: 0.12 });
      gsap.to(cursor, { scale: 0.5, backgroundColor: "#fcee0a", boxShadow: "0 0 12px #fcee0a", duration: 0.12 });
    };

    const handleMouseUp = () => {
      const targetScale = isHovering ? 2.4 : 1;
      const targetColor = isHovering ? "#FF2E9F" : "#00F0FF";
      const targetCursorScale = isHovering ? 1.5 : 1;
      gsap.to(ring, { scale: targetScale, borderColor: targetColor, boxShadow: `0 0 20px ${targetColor}`, duration: 0.35, ease: "back.out(1.7)" });
      gsap.to(cursor, { scale: targetCursorScale, backgroundColor: targetColor, duration: 0.25 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, ring, label], { autoAlpha: 0, duration: 0.3 });
      isVisible = false;
    };
    const handleMouseEnter = () => showCursors();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    // Use CSS class so ALL elements (including Tailwind/browser defaults) hide native cursor
    document.body.classList.add("cursor-active");

    // Pause particle animation when tab is not visible (performance)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(renderParticles);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Restore native cursor on cleanup
      document.body.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      {/* Particle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997]"
        aria-hidden="true"
      />

      {/* Center Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2.5 w-2.5 rounded-full bg-signal-cyan mix-blend-screen shadow-[0_0_12px_#00F0FF]"
      />

      {/* Rotating Outer Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-9 w-9 rounded-full border border-signal-cyan mix-blend-screen flex items-center justify-center"
        style={{ boxShadow: "0 0 12px rgba(0, 240, 255, 0.5)" }}
      >
        <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1 h-1 bg-signal-cyan rounded-full" />
        <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 bg-signal-pink rounded-full" />
      </div>

      {/* Hover Label */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] font-mono text-[9px] font-bold text-signal-pink bg-black/90 border border-signal-pink/40 px-2 py-0.5 tracking-widest shadow-[0_0_10px_#FF2E9F] whitespace-nowrap"
        style={{ opacity: 0 }}
      />
    </>
  );
}


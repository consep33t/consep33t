"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!cursor || !ring || !label) return;

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
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
    };
  }, []); // ← Fixed: no dependency on isHovering (local var instead)

  return (
    <>
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

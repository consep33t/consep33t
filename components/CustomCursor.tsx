"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!cursor || !ring) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    if (label) gsap.set(label, { xPercent: 15, yPercent: -50 });

    const xCursor = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3.out" });
    const yCursor = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power3.out" });
    const xLabel = label ? gsap.quickTo(label, "x", { duration: 0.1, ease: "power3.out" }) : null;
    const yLabel = label ? gsap.quickTo(label, "y", { duration: 0.1, ease: "power3.out" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xCursor(clientX);
      yCursor(clientY);
      xRing(clientX);
      yRing(clientY);
      if (xLabel && yLabel) {
        xLabel(clientX);
        yLabel(clientY);
      }

      const target = e.target as HTMLElement;
      const hoverEl = target.closest('a, button, input, textarea, [data-cursor="hover"]');
      const hoverState = !!hoverEl;

      if (hoverState !== isHovering) {
        setIsHovering(hoverState);
        if (hoverState) {
          const customLabel = hoverEl?.getAttribute("data-cursor-label") || "LOCK_ON // 01";
          setHoverText(customLabel);

          gsap.to(ring, {
            scale: 2.2,
            borderColor: "#FF2E9F",
            boxShadow: "0 0 25px rgba(255, 46, 159, 0.8)",
            rotate: 90,
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(cursor, {
            backgroundColor: "#FF2E9F",
            scale: 1.5,
            duration: 0.2,
          });
        } else {
          setHoverText("");
          gsap.to(ring, {
            scale: 1,
            borderColor: "#00F0FF",
            boxShadow: "0 0 15px rgba(0, 240, 255, 0.5)",
            rotate: 0,
            duration: 0.3,
            ease: "power3.out",
          });
          gsap.to(cursor, {
            backgroundColor: "#00F0FF",
            scale: 1,
            duration: 0.2,
          });
        }
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.8, borderColor: "#fcee0a", duration: 0.1 });
      gsap.to(cursor, { scale: 0.6, backgroundColor: "#fcee0a", duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: isHovering ? 2.2 : 1, borderColor: isHovering ? "#FF2E9F" : "#00F0FF", duration: 0.3 });
      gsap.to(cursor, { scale: isHovering ? 1.5 : 1, backgroundColor: isHovering ? "#FF2E9F" : "#00F0FF", duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
    };
  }, [isHovering]);

  return (
    <>
      {/* Center Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2.5 w-2.5 rounded-full bg-signal-cyan mix-blend-screen shadow-[0_0_15px_#00F0FF]"
      />

      {/* Rotating Outer Reticle Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-9 w-9 rounded-full border border-signal-cyan mix-blend-screen flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]"
      >
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-signal-cyan rounded-full" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-signal-pink rounded-full" />
      </div>

      {/* Hover Telemetry Label */}
      {hoverText && (
        <div
          ref={labelRef}
          className="pointer-events-none fixed top-0 left-0 z-[9999] font-mono text-[10px] font-bold text-signal-pink bg-black/80 border border-signal-pink/40 px-2 py-0.5 tracking-widest shadow-[0_0_12px_#FF2E9F]"
        >
          {hoverText}
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * SmoothScrollProvider — disables smooth scrolling on touch devices
 * (mobile) for native-feel performance, keeps it for desktop.
 * ScrollSmoother adds transform on #smooth-content; Navigation must
 * remain OUTSIDE this provider to avoid position:fixed offset bugs.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // On touch/mobile devices, skip ScrollSmoother for best perf
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.8,          // slightly reduced for snappier feel (was 1.0)
      effects: true,
      normalizeScroll: true, // normalize scroll events across browsers for consistency
      ignoreMobileResize: true, // prevent scroll jumps on mobile address bar resize
    });

    // Refresh ScrollTrigger after smoother is created so all pinned
    // sections and scroll-based animations are correctly positioned
    ScrollTrigger.refresh();

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

/**
 * Parallax hook — safe on mobile (no-op if ref is null or touch device)
 *   speed > 1  → moves faster than scroll (foreground)
 *   speed 0-1  → moves slower (background)
 *   speed < 0  → moves opposite direction
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: () => -window.innerHeight * speed * 0.25 },
        {
          y: () => window.innerHeight * speed * 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

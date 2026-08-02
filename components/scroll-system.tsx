"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * Bungkus seluruh {children} di root layout dengan provider ini
 * supaya ScrollSmoother aktif untuk seluruh halaman -- ini yang
 * bikin useParallax() di bawah terasa kenyal, bukan patah-patah.
 * ScrollSmoother butuh dua wrapper DOM dengan id spesifik ini.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}

/**
 * Parallax berbasis scroll dengan GSAP ScrollTrigger.
 *   speed > 1   -> elemen bergerak lebih cepat dari scroll ("dekat")
 *   speed 0-1   -> elemen bergerak lebih lambat ("jauh", cocok bg)
 *   speed < 0   -> elemen bergerak berlawanan arah scroll
 *
 * Contoh pemakaian di Hero:
 *   const bgRef = useParallax<HTMLDivElement>(0.3);
 *   const titleRef = useParallax<HTMLDivElement>(0.8);
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: () => -window.innerHeight * speed * 0.3 },
        {
          y: () => window.innerHeight * speed * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

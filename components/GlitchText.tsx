"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * GlitchText Effect
 * Creates a cyberpunk chromatic aberration glitch effect on text hover or view.
 */

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchDuration?: number;
  isActive?: boolean; // If true, glitches constantly, if false, only on hover
}

export default function GlitchText({ text, className = "", glitchDuration = 0.2, isActive = false }: GlitchTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const layer1Ref = useRef<HTMLSpanElement>(null);
  const layer2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !layer1Ref.current || !layer2Ref.current) return;

    const ctx = gsap.context(() => {
      const runGlitch = () => {
        const tl = gsap.timeline();
        
        // Randomize translation and clip path
        tl.set([layer1Ref.current, layer2Ref.current], { opacity: 1 })
          .to(layer1Ref.current, {
            x: () => gsap.utils.random(-4, 4),
            y: () => gsap.utils.random(-2, 2),
            clipPath: () => `inset(${gsap.utils.random(0, 80)}% 0 ${gsap.utils.random(0, 80)}% 0)`,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
            ease: "steps(4)",
          }, 0)
          .to(layer2Ref.current, {
            x: () => gsap.utils.random(-4, 4),
            y: () => gsap.utils.random(-2, 2),
            clipPath: () => `inset(${gsap.utils.random(0, 80)}% 0 ${gsap.utils.random(0, 80)}% 0)`,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
            ease: "steps(4)",
          }, 0)
          .set([layer1Ref.current, layer2Ref.current], { opacity: 0, clipPath: "none", x: 0, y: 0 });
      };

      if (isActive) {
        // Run constantly but randomly
        const randomGlitchLoop = () => {
          runGlitch();
          gsap.delayedCall(gsap.utils.random(1, 4), randomGlitchLoop);
        };
        randomGlitchLoop();
      } else {
        // Run only on hover
        const el = containerRef.current!;
        const handleMouseEnter = () => runGlitch();
        el.addEventListener("mouseenter", handleMouseEnter);
        return () => el.removeEventListener("mouseenter", handleMouseEnter);
      }
    });

    return () => ctx.revert();
  }, [isActive]);

  return (
    <span ref={containerRef} className={`relative inline-block cursor-default ${className}`}>
      {/* Base text */}
      <span className="relative z-10">{text}</span>
      
      {/* Cyan Glitch Layer */}
      <span 
        ref={layer1Ref} 
        className="absolute top-0 left-0 z-0 opacity-0 text-cyan-400 mix-blend-screen"
        aria-hidden="true"
        style={{ textShadow: "-2px 0 cyan" }}
      >
        {text}
      </span>
      
      {/* Magenta/Red Glitch Layer */}
      <span 
        ref={layer2Ref} 
        className="absolute top-0 left-0 z-0 opacity-0 text-red-500 mix-blend-screen"
        aria-hidden="true"
        style={{ textShadow: "2px 0 red" }}
      >
        {text}
      </span>
    </span>
  );
}

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrambleText } from "@/hooks/useScrambleText";

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  
  const [phase, setPhase] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);
  const [hasBooted, setHasBooted] = useState<boolean | null>(null);
  
  const text1 = useScrambleText("INITIALIZING CORE...", 600, isSkipping || phase > 0);
  const text2 = useScrambleText("DECRYPTING DATABANKS...", 600, isSkipping || phase > 1);
  const text3 = useScrambleText("ACCESS GRANTED", 400, isSkipping || phase > 2);

  const finishSequence = useCallback(() => {
    sessionStorage.setItem("has_booted", "true");
    
    if (tlRef.current) {
      tlRef.current.kill();
    }
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: isSkipping ? 0.2 : 0.5,
        ease: "power2.inOut",
        onComplete: onComplete
      });
    } else {
      onComplete();
    }
  }, [isSkipping, onComplete]);

  // Check storage and reduced motion on mount (client-side only)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const booted = sessionStorage.getItem("has_booted");
    
    if (booted === "true" || prefersReducedMotion) {
      setHasBooted(true);
      onComplete();
    } else {
      setHasBooted(false);
    }
  }, [onComplete]);

  // Handle Skip via keyboard or click
  useEffect(() => {
    if (hasBooted !== false) return; 

    const handleSkip = (e: KeyboardEvent | MouseEvent) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).code !== 'Space' && (e as KeyboardEvent).code !== 'Escape') {
        return;
      }
      setIsSkipping(true);
      setPhase(3); // Jump to the end immediately
      finishSequence(); 
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);
    
    return () => {
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, [hasBooted, finishSequence]);

  useGSAP(() => {
    if (hasBooted !== false || isSkipping) return;

    tlRef.current = gsap.timeline();

    // Sequence the phases
    tlRef.current.to({}, { duration: 0.8, onComplete: () => setPhase(1) })
      .to({}, { duration: 0.2 }) 
      .to({}, { duration: 0.8, onComplete: () => setPhase(2) })
      .to({}, { duration: 0.2 })
      .to({}, { duration: 0.6, onComplete: () => setPhase(3) })
      
      // Glitch/flash effect for final phase
      .to(overlayRef.current, {
        opacity: 0.15,
        duration: 0.05,
        backgroundColor: "#00F0FF",
        mixBlendMode: "screen",
        yoyo: true,
        repeat: 3
      }, "+=0.2")
      .to(".access-granted-text", {
        scale: 1.1,
        color: "#00F0FF",
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: finishSequence
      }, "<");

  }, { scope: containerRef, dependencies: [hasBooted] });

  // Do not render anything while checking storage, or if already booted
  if (hasBooted === null || hasBooted === true) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020204] font-mono text-signal-cyan uppercase tracking-widest text-sm md:text-lg overflow-hidden select-none cursor-pointer"
    >
      <div ref={overlayRef} className="absolute inset-0 z-0 opacity-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center min-h-[2rem]">
        {phase === 0 && <div className="absolute text-center whitespace-nowrap">{text1}</div>}
        {phase === 1 && <div className="absolute text-center whitespace-nowrap">{text2}</div>}
        {phase >= 2 && <div className="absolute text-center whitespace-nowrap access-granted-text">{text3}</div>}
      </div>
      
      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ 
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00F0FF 2px, #00F0FF 4px)',
          backgroundSize: '100% 4px'
        }} 
      />
      
      <div className="absolute bottom-8 text-xs text-signal-cyan/50 animate-pulse">
        [ Press SPACE or CLICK to skip ]
      </div>
    </div>
  );
}

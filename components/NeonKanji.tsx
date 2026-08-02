"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface NeonKanjiProps {
  text: string;
  className?: string;
}

export default function NeonKanji({ text, className = "" }: NeonKanjiProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    // Random Neon Glitch
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const isRed = Math.random() > 0.5;
        const color = isRed ? "#ff003c" : "#00f0ff";
        
        gsap.to(textRef.current, {
          opacity: Math.random() > 0.5 ? 1 : 0.4,
          textShadow: Math.random() > 0.5 
            ? `0 0 20px ${color}, 0 0 40px ${color}` 
            : "none",
          color: isRed ? "#ffccdd" : "#ccffff",
          duration: 0.05,
          yoyo: true,
          repeat: Math.floor(Math.random() * 4),
          onComplete: () => {
            gsap.to(textRef.current, { opacity: 0.02, textShadow: "none", color: "#ffffff", duration: 0.1 });
          }
        });
      }
    }, 2000);

    // Random Sparks (Short circuit)
    const sparksInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const sparkCount = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < sparkCount; i++) {
          const spark = document.createElement("div");
          spark.style.position = "absolute";
          spark.style.width = Math.random() > 0.5 ? "2px" : "4px";
          spark.style.height = (Math.random() * 15 + 5) + "px";
          
          const isRed = Math.random() > 0.5;
          spark.style.backgroundColor = isRed ? "#ff003c" : "#00f0ff";
          spark.style.boxShadow = "0 0 10px " + spark.style.backgroundColor;
          spark.style.top = (Math.random() * 100) + "%";
          spark.style.left = (Math.random() * 100) + "%";
          spark.style.borderRadius = "2px";
          spark.style.zIndex = "10";
          
          containerRef.current?.appendChild(spark);

          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 100 + 50;

          gsap.to(spark, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 0.3 + Math.random() * 0.4,
            ease: "expo.out",
            onComplete: () => {
              if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
              }
            }
          });
        }
      }
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(sparksInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block w-full h-full">
      <div 
        ref={textRef} 
        className={`font-jp text-white opacity-[0.02] select-none font-black tracking-widest leading-none transition-all ${className}`}
      >
        {text}
      </div>
    </div>
  );
}

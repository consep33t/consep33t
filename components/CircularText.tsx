"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  className?: string;
  onHover?: "speedUp" | "slowDown" | "pause" | "none";
}

export default function CircularText({
  text,
  spinDuration = 20,
  className = "",
  onHover = "speedUp",
}: CircularTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const letters = text.split("");
  const degPerLetter = 360 / letters.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Start infinite rotation
    tweenRef.current = gsap.to(el, {
      rotation: 360,
      duration: spinDuration,
      ease: "none",
      repeat: -1,
    });

    const handleEnter = () => {
      if (!tweenRef.current) return;
      if (onHover === "speedUp") tweenRef.current.timeScale(4);
      else if (onHover === "slowDown") tweenRef.current.timeScale(0.25);
      else if (onHover === "pause") tweenRef.current.pause();
    };

    const handleLeave = () => {
      if (!tweenRef.current) return;
      tweenRef.current.resume();
      tweenRef.current.timeScale(1);
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      tweenRef.current?.kill();
    };
  }, [spinDuration, onHover]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-full flex items-center justify-center ${className}`}
      style={{ transformOrigin: "center center" }}
    >
      <div className="absolute inset-0 w-full h-full rounded-full" />
      {letters.map((letter, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-0 origin-bottom"
          style={{
            height: "50%",
            transform: `translateX(-50%) rotate(${i * degPerLetter}deg)`,
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}

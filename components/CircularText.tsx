"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

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
  onHover = "speedUp"
}: CircularTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();
  
  const letters = text.split("");
  const degPerLetter = 360 / letters.length;

  useEffect(() => {
    let currentDuration = spinDuration;
    if (isHovered) {
      if (onHover === "speedUp") currentDuration = spinDuration / 4;
      if (onHover === "slowDown") currentDuration = spinDuration * 4;
      if (onHover === "pause") currentDuration = 999999;
    }

    controls.start({
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: currentDuration,
      }
    });
  }, [isHovered, spinDuration, onHover, controls]);

  return (
    <motion.div 
      className={`relative rounded-full flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={controls}
      style={{ transformOrigin: "center center" }}
    >
      <div className="absolute inset-0 w-full h-full rounded-full" />
      {letters.map((letter, i) => {
        return (
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
        );
      })}
    </motion.div>
  );
}

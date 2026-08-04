"use client";

import { useEffect, useState, useRef } from "react";

/**
 * DecryptedText Effect (ReactBits Style) — Zero framer-motion dependency
 */

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  animateOn?: "view" | "hover" | "mount";
  parentRef?: React.RefObject<HTMLElement | null>;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  clickMode?: "once" | "toggle" | "none";
}

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = DEFAULT_CHARS,
  className = "",
  animateOn = "hover",
  parentRef,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  clickMode = "none",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    let iteration = 0;
    clearInterval(intervalRef.current!);
    setHasAnimated(true);

    intervalRef.current = setInterval(() => {
      setDisplayText((currentText) => {
        void currentText; // suppress unused warning — we use `text` from closure
        const textArr = text.split("");

        return textArr
          .map((char, index) => {
            let shouldReveal = false;

            if (sequential) {
              if (revealDirection === "start") {
                shouldReveal = index < Math.floor(iteration);
              } else if (revealDirection === "end") {
                shouldReveal = index >= text.length - Math.floor(iteration);
              } else {
                const middle = Math.floor(text.length / 2);
                shouldReveal =
                  Math.abs(index - middle) < Math.floor(iteration) / 2;
              }
            } else {
              shouldReveal = iteration >= maxIterations;
            }

            if (shouldReveal) return text[index];
            if (char === " ") return " ";

            const charPool = useOriginalCharsOnly
              ? text.replace(/\s/g, "")
              : characters;
            return charPool[Math.floor(Math.random() * charPool.length)] || char;
          })
          .join("");
      });

      if (iteration >= (sequential ? text.length : maxIterations)) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }

      iteration += sequential ? text.length / maxIterations : 1;
    }, speed);
  };

  useEffect(() => {
    let shouldAnimate = false;

    if (animateOn === "mount" && !hasAnimated) {
      shouldAnimate = true;
    } else if (animateOn === "hover" && isHovering) {
      shouldAnimate = true;
    } else if (animateOn === "view" && !hasAnimated) {
      shouldAnimate = true;
    }

    if (shouldAnimate) {
      startAnimation();
    } else if (animateOn === "hover" && !isHovering) {
      setDisplayText(text);
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, maxIterations, characters, animateOn, isHovering, hasAnimated, sequential, revealDirection, useOriginalCharsOnly]);

  useEffect(() => {
    if (animateOn === "hover" && parentRef?.current) {
      const handleMouseEnter = () => setIsHovering(true);
      const handleMouseLeave = () => setIsHovering(false);

      const el = parentRef.current;
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [parentRef, animateOn]);

  const handleClick = () => {
    if (clickMode === "once" && !hasAnimated) {
      startAnimation();
    } else if (clickMode === "toggle") {
      startAnimation();
    }
  };

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseEnter={() => {
        if (animateOn === "hover" && !parentRef) setIsHovering(true);
      }}
      onMouseLeave={() => {
        if (animateOn === "hover" && !parentRef) setIsHovering(false);
      }}
    >
      {displayText}
    </span>
  );
}

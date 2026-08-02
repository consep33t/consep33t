"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * Judul yang "terbelah" oleh sapuan blade -- tiap karakter tersembunyi
 * lewat clip-path, lalu tersingkap berurutan tepat saat garis cahaya
 * (glint) lewat di atasnya. Dipakai terbatas (hero title saja) --
 * ini gerakan paling dramatis di seluruh situs, jangan diulang di
 * tiap section atau efeknya jadi basi.
 *
 * Perlu heading level lain selain <h1>? Ganti tag di JSX bawah.
 */
export default function SlashTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    const glint = glintRef.current;
    if (!el || !glint) return;

    const split = new SplitText(el, { type: "chars" });

    gsap.set(split.chars, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
    gsap.set(glint, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(glint, { opacity: 1, duration: 0.05 })
      .fromTo(
        glint,
        { xPercent: -20 },
        { xPercent: 120, duration: 0.6, ease: "power2.inOut" },
        "<"
      )
      .to(
        split.chars,
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.03,
          stagger: { each: 0.6 / split.chars.length, from: "start" },
        },
        "<"
      )
      .to(glint, { opacity: 0, duration: 0.15 }, "-=0.1");

    return () => {
      tl.kill();
      split.revert();
    };
  }, [text]);

  return (
    <div className="relative inline-block overflow-hidden">
      <h1 ref={titleRef} className={className}>
        {text}
      </h1>
      <div
        ref={glintRef}
        className="pointer-events-none absolute inset-y-0 left-0 w-8 -skew-x-12"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,240,255,0.9), rgba(255,46,159,0.9), transparent)",
          boxShadow: "0 0 24px rgba(0,240,255,0.8)",
        }}
      />
    </div>
  );
}

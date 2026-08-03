"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GitHubRepo } from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/github";
import GlitchText from "./GlitchText";
import DecryptedText from "./DecryptedText";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ repo }: { repo: GitHubRepo }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const ogImage = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

  useGSAP(
    () => {
      if (!cardRef.current || !imageRef.current || !contentRef.current) return;

      // Only tilt on desktop
      const isFine = window.matchMedia("(pointer: fine)").matches;
      if (isFine) {
        gsap.set(cardRef.current, { transformPerspective: 1200 });
        xTo.current = gsap.quickTo(cardRef.current, "rotationY", { ease: "power3", duration: 0.5 });
        yTo.current = gsap.quickTo(cardRef.current, "rotationX", { ease: "power3", duration: 0.5 });
      }

      // Image parallax on scroll
      gsap.fromTo(
        imageRef.current,
        { y: "-12%", scale: 1.1 },
        {
          y: "12%",
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Entrance animation
      gsap.from(contentRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: cardRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Glow follows mouse
    glowRef.current.style.setProperty("--gx", `${x}px`);
    glowRef.current.style.setProperty("--gy", `${y}px`);

    // Tilt (desktop only)
    if (xTo.current && yTo.current) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      xTo.current(((x - centerX) / centerX) * 8);
      yTo.current(((y - centerY) / centerY) * -8);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.025, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (xTo.current && yTo.current) {
      xTo.current(0);
      yTo.current(0);
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hud-card relative flex flex-col h-full group bg-[rgba(8,8,12,0.7)] border border-[rgba(0,243,255,0.15)] overflow-hidden rounded-sm z-10 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.12),0_20px_60px_rgba(0,0,0,0.5)] cursor-default"
    >
      {/* Dynamic mouse-tracking glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle 250px at var(--gx, 50%) var(--gy, 50%), rgba(0,240,255,0.18), transparent 65%)",
          "--gx": "50%",
          "--gy": "50%",
        } as React.CSSProperties}
      />

      {/* CRT scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-10 group-hover:opacity-25 transition-opacity"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.1) 2px, rgba(0,240,255,0.1) 4px)",
        }}
      />

      {/* Corner HUD accents */}
      <div className="corner-tl opacity-0 group-hover:opacity-100 transition-all duration-300 z-40" />
      <div className="corner-tr opacity-0 group-hover:opacity-100 transition-all duration-300 z-40" />
      <div className="corner-bl opacity-0 group-hover:opacity-100 transition-all duration-300 z-40" />
      <div className="corner-br opacity-0 group-hover:opacity-100 transition-all duration-300 z-40" />

      {/* Image section */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black border-b border-white/10">
        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500 z-20 mix-blend-multiply" />
        <div className="absolute inset-0 z-10">
          <Image
            ref={imageRef}
            src={ogImage}
            alt={`Project ${repo.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:contrast-110 group-hover:saturate-125"
            unoptimized
          />
        </div>

        {/* Laser scan line on hover */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent z-30 opacity-0 group-hover:opacity-100 group-hover:animate-[laser_1.5s_linear_infinite]" />

        {/* Language badge */}
        {repo.language && (
          <div className="absolute top-3 right-3 z-30 text-[10px] font-mono font-bold text-black bg-signal-cyan px-2 py-0.5 uppercase tracking-widest shadow-[0_0_12px_#00F0FF] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
            {repo.language}
          </div>
        )}

        {/* Stars badge */}
        {repo.stargazers_count > 0 && (
          <div className="absolute top-3 left-3 z-30 flex items-center gap-1 font-mono text-[10px] text-signal-yellow bg-black/70 px-2 py-0.5 border border-signal-yellow/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            ★ {repo.stargazers_count}
          </div>
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-4 sm:p-6 relative z-40 flex flex-col flex-grow bg-gradient-to-t from-[#020204] via-[#020204]/80 to-transparent">
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="font-mono text-[9px] text-gray-600 tracking-widest uppercase truncate">
            ID: {repo.id.toString().substring(0, 6)}
          </div>
          <div className="font-mono text-xs text-signal-yellow flex items-center gap-1 shrink-0">
            <span className="group-hover:animate-spin-slow">★</span>
            {repo.stargazers_count}
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-signal-cyan transition-colors duration-300 mb-2 font-display uppercase tracking-tight break-words leading-tight">
          <GlitchText text={repo.name.replace(/-/g, " ")} />
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-500 font-sans mb-5 flex-grow group-hover:text-gray-300 transition-colors duration-300">
          {repo.description || "NO_DATA_FOUND // Awaiting decryption sequence..."}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {repo.topics.slice(0, 4).map((topic, i) => (
              <span
                key={topic}
                className="bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-gray-500 group-hover:text-signal-pink group-hover:border-signal-pink/30 transition-all duration-300"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {isHovered ? (
                  <DecryptedText text={topic.toUpperCase()} speed={30} />
                ) : (
                  topic.toUpperCase()
                )}
              </span>
            ))}
          </div>
        )}

        {/* CTA Buttons — always full width on mobile, side by side */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-[rgba(0,243,255,0.15)]">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex-1 text-center py-2.5 bg-white/5 hover:bg-signal-cyan hover:text-black text-gray-400 font-mono text-[11px] font-bold tracking-widest transition-all duration-300 border border-transparent hover:border-signal-cyan uppercase relative overflow-hidden group/btn"
          >
            <span className="absolute inset-0 bg-signal-cyan/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">SOURCE</span>
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex-1 text-center py-2.5 bg-white/5 hover:bg-signal-pink hover:text-black text-gray-400 font-mono text-[11px] font-bold tracking-widest transition-all duration-300 border border-transparent hover:border-signal-pink uppercase relative overflow-hidden group/btn"
            >
              <span className="absolute inset-0 bg-signal-pink/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
              <span className="relative z-10">DEMO ↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

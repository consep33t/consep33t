"use client";

import { useRef, useState, useEffect } from "react";
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
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const ogImage = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current || !contentRef.current) return;

    gsap.set(cardRef.current, { transformPerspective: 1200 });

    xTo.current = gsap.quickTo(cardRef.current, "rotationY", { ease: "power3", duration: 0.5 });
    yTo.current = gsap.quickTo(cardRef.current, "rotationX", { ease: "power3", duration: 0.5 });

    // Magnetic CTAs
    const ctas = gsap.utils.toArray<HTMLElement>('[data-magnetic="true"]');
    ctas.forEach(cta => {
      cta.addEventListener("mousemove", (e) => {
        const rect = cta.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(cta, { x, y, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      });
      cta.addEventListener("mouseleave", () => {
        gsap.to(cta, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
      });
    });

    // Image Parallax Effect on Scroll
    gsap.fromTo(
      imageRef.current,
      { y: "-15%", scale: 1.1 },
      {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Entrance animation for content
    gsap.from(contentRef.current, {
      y: 30,
      opacity: 0,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: cardRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -10; 
    const tiltY = ((x - centerX) / centerX) * 10;

    if (xTo.current && yTo.current) {
       xTo.current(tiltY);
       yTo.current(tiltX);
    }
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) gsap.to(cardRef.current, { scaleX: 1.03, scaleY: 1.03, scaleZ: 1.03, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (xTo.current && yTo.current) {
       xTo.current(0);
       yTo.current(0);
    }
    if (cardRef.current) gsap.to(cardRef.current, { scaleX: 1, scaleY: 1, scaleZ: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' } as React.CSSProperties}
      className="hud-card relative flex flex-col h-full group bg-[rgba(10,10,12,0.6)] border border-[rgba(0,243,255,0.2)] transition-all duration-300 overflow-hidden rounded-sm z-10 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)]"
    >
      {/* Dynamic Hover Glow Tracking Mouse */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
        style={{
          background: "radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.2), transparent 70%)"
        }}
      />

      {/* Cyberpunk Overlay Lines */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-20 group-hover:opacity-40 transition-opacity"
           style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.1) 2px, rgba(0,240,255,0.1) 4px)' }} 
      />

      {/* Corner Accents */}
      <div className="corner-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40" />
      <div className="corner-tr opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40" />
      <div className="corner-bl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40" />
      <div className="corner-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40" />

      {/* Top Media Section */}
      <div className="relative h-56 w-full overflow-hidden bg-black border-b border-white/10">
        <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-500 z-20 mix-blend-multiply" />
        
        {/* Parallax Image */}
        <div className="absolute inset-0 z-10">
          <Image
            ref={imageRef}
            src={ogImage}
            alt={`Project ${repo.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 filter group-hover:contrast-125 group-hover:saturate-150"
            unoptimized
          />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 right-4 z-30 flex gap-2">
          {repo.language && (
            <div className="text-[10px] font-mono font-bold text-black bg-signal-cyan px-2 py-1 uppercase tracking-widest shadow-[0_0_15px_#00F0FF] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              {repo.language}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="p-6 relative z-40 flex flex-col flex-grow bg-gradient-to-t from-[#020204] to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
            ID: {repo.id.toString().substring(0, 6)}
          </div>
          <div className="font-mono text-xs text-signal-yellow flex items-center gap-1 group-hover:animate-pulse">
            <span>★</span> {repo.stargazers_count}
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-white group-hover:text-signal-cyan transition-colors mb-3 font-display uppercase tracking-tighter">
          <GlitchText text={repo.name.replace(/-/g, ' ')} />
        </h3>
        
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-400 font-sans mb-6 flex-grow group-hover:text-gray-300 transition-colors">
          {repo.description || "NO_DATA_FOUND // Awaiting decryption sequence..."}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {repo.topics.slice(0, 3).map((topic, i) => (
              <span
                key={topic}
                className="bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-gray-400 group-hover:text-signal-pink transition-colors group-hover:border-signal-pink/30"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {isHovered ? <DecryptedText text={topic.toUpperCase()} speed={30} /> : topic.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mt-auto pt-4 border-t border-[rgba(0,243,255,0.2)]">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-magnetic="true"
            className="flex-1 text-center py-2 bg-white/5 hover:bg-signal-cyan hover:text-black text-gray-300 font-mono text-xs font-bold tracking-widest transition-all duration-300 border border-transparent hover:border-signal-cyan uppercase relative overflow-hidden"
          >
            <span className="relative z-10">Source</span>
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-magnetic="true"
              className="flex-1 text-center py-2 bg-white/5 hover:bg-signal-pink hover:text-black text-gray-300 font-mono text-xs font-bold tracking-widest transition-all duration-300 border border-transparent hover:border-signal-pink uppercase relative overflow-hidden"
            >
              <span className="relative z-10">Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


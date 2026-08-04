"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "./GlitchText";
import DecryptedText from "./DecryptedText";

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATES = [
  {
    title: "Junior Network Administrator",
    issuer: "BNSP (Cisco & Cisco Emulator)",
    year: "2024",
    credentialId: "BNSP-JNA-90812",
    skills: ["Cisco Router", "Cisco Emulator", "Subnetting", "Routing & Switching"],
    badge: "VERIFIED_BNSP"
  },
  {
    title: "Code Generations and Optimization",
    issuer: "IBM x Hacktiv8",
    year: "2025",
    credentialId: "IBM-H8-20250826",
    skills: ["AI Code Gen", "Performance Optimization", "Refactoring", "Algorithms"],
    badge: "IBM_CERTIFIED"
  },
  {
    title: "Expert SQL",
    issuer: "DQLab",
    year: "2025",
    credentialId: "DQLAB-SQL-EXPERT",
    skills: ["Advanced SQL Queries", "Database Architecture", "Performance Tuning", "Indexing"],
    badge: "EXPERT_SQL"
  },
  {
    title: "Hacktown Coder Competition",
    issuer: "Innovers, Devfect, Infinite Learning",
    year: "2024 / 2025",
    credentialId: "HACKTOWN-COMPETITOR",
    skills: ["Fullstack Prototyping", "IoT Solution", "Rapid Coding", "Pitching"],
    badge: "COMPETITOR"
  },
  {
    title: "Junior Web Developer (Menunggu Jadwal)",
    issuer: "BNSP",
    year: "2025",
    credentialId: "BNSP-JWD-SCHEDULED",
    skills: ["Frontend Web", "Backend APIs", "Responsive Layouts", "Web Standards"],
    badge: "SCHEDULED"
  }
];

export default function CertificatesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const items = gsap.utils.toArray<HTMLElement>('.cert-item');
    
    gsap.fromTo(items, 
      { opacity: 0, y: 40, scale: 0.94, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-12 py-14 sm:py-28 relative font-sans overflow-hidden" ref={containerRef}>
      {/* Section Header */}
      <div className="mb-10 sm:mb-16 text-left sm:text-right flex flex-col items-start sm:items-end">
        <div className="flex items-center gap-3 font-mono text-xs text-signal-yellow uppercase tracking-widest mb-2">
          <span>// VERIFIED_CREDENTIALS</span>
          <span className="h-2 w-2 rounded-full bg-signal-yellow animate-pulse" />
        </div>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white mb-4 break-words breathe-text">
          <GlitchText text="HONORS_&_ACCREDITATION" />
        </h2>
        <div className="h-1 w-32 sm:w-44 bg-gradient-to-r sm:bg-gradient-to-l from-signal-yellow via-signal-pink to-transparent rounded-full" />
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {CERTIFICATES.map((cert, idx) => (
          <div 
            key={idx} 
            className="cert-item glass-panel p-4 sm:p-8 hud-bracket group hover:border-signal-yellow/70 transition-all duration-500 relative overflow-hidden cursor-default shadow-[0_0_20px_rgba(252,238,10,0.04)]"
          >
            {/* Ambient Hologram Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-signal-yellow/10 blur-[40px] group-hover:bg-signal-yellow/20 transition-all duration-500" />
            
            {/* Top Bar */}
            <div className="flex items-center justify-between font-mono text-xs mb-4 pb-3 border-b border-white/10 gap-2">
              <div className="text-signal-yellow font-bold flex items-center gap-2 shrink-0">
                <span>[YEAR: {cert.year}]</span>
              </div>
              <div className="text-gray-400 bg-black/60 border border-white/10 px-2 py-0.5 text-[10px] sm:text-[11px] truncate max-w-[180px] sm:max-w-none">
                <DecryptedText text={`ID: ${cert.credentialId}`} animateOn="hover" speed={30} />
              </div>
            </div>

            {/* Title & Issuer */}
            <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-wider mb-2 group-hover:text-signal-yellow transition-colors leading-snug break-words">
              {cert.title}
            </h3>

            <p className="text-xs text-signal-cyan font-mono mb-4 flex items-center gap-2 flex-wrap">
              <span>ISSUER //</span>
              <span className="text-white font-bold">{cert.issuer}</span>
            </p>

            {/* Badge Indicator */}
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-black font-bold bg-signal-yellow px-2.5 py-1 mb-4 shadow-[0_0_10px_#fcee0a]">
              <span>★</span>
              <span>{cert.badge}</span>
            </div>

            {/* Skills Breakdown */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
              {cert.skills.map((s, sIdx) => (
                <span key={sIdx} className="font-mono text-[10px] text-gray-400 bg-white/5 px-2 py-0.5">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

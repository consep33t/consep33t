"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "./GlitchText";
import SplitText from "./SplitText";
import DecryptedText from "./DecryptedText";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: "Backend Developer",
    company: "Solvera",
    date: "Feb 2026 - Apr 2026",
    techStack: ["Go", "Express.js", "SQL Expert", "Server Management", "CI/CD Pipeline"],
    points: [
      "Mengelola arsitektur backend dan database SQL tingkat mahir di lingkungan server produksi untuk menunjang skalabilitas sistem.",
      "Mengonfigurasi dan memelihara pipeline CI/CD guna memastikan kelancaran deployment perangkat lunak tanpa downtime."
    ]
  },
  {
    role: "IoT & Full-Stack Software Engineer",
    company: "Proyek Mandiri & Skripsi Akademik",
    date: "Jul 2025 - Sep 2025",
    techStack: ["ESP32", "Sensors (IR/Ultrasonic/Loadcell)", "Relay", "Next.js", "Cisco Router"],
    points: [
      "Merancang sistem otonom cerdas untuk ternak ayam potong menggunakan mikrokontroler ESP32, sensor loadcell, IR, ultrasonik, dan relay terintegrasi dashboard pemantauan.",
      "Mengembangkan sistem monitoring buka tutup gerbang air sawah secara end-to-end, dari level hardware hingga software, yang berhasil di-deploy ke server produksi.",
      "Menggabungkan prinsip software development dan network administration untuk menjaga stabilitas komunikasi data antara perangkat IoT dan server."
    ]
  },
  {
    role: "Frontend Web Developer",
    company: "Infinite Learning x Pejantara",
    date: "Sep 2024 - Des 2024",
    techStack: ["React", "Flutter", "AI Integration", "JavaScript", "Project-Based Learning"],
    points: [
      "Membangun aplikasi web dan mobile dengan integrasi Kecerdasan Buatan (AI) khusus untuk perusahaan pengelola sampah di Batam.",
      "Berkolaborasi dalam tim lintas fungsi menggunakan metode project-based learning untuk merancang arsitektur aplikasi dari tahap konsep hingga implementasi."
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scope to containerRef so we only target items within this section
    const items = gsap.utils.toArray<HTMLElement>('.exp-item', container);

    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-12 py-16 sm:py-32 relative font-sans overflow-hidden" ref={containerRef}>
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none -z-10"
        data-speed="0.8"
      />
      
      {/* Header Title with Parallax */}
      <div className="mb-12 sm:mb-24 md:mb-32 relative" data-speed="1.1">
        <div className="flex items-center gap-3 font-mono text-xs text-signal-cyan uppercase tracking-widest mb-3 sm:mb-4">
          <span className="h-2 w-2 rounded-full bg-signal-cyan animate-pulse shadow-[0_0_10px_#00F0FF]" />
          <span>// CHRONO_LOGS</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 relative z-10 break-words breathe-text">
          <GlitchText text="COMBAT" />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-cyan to-signal-pink">
            EXPERIENCE
          </span>
        </h2>
        
        {/* Decorative large background text */}
        <div className="absolute top-0 right-0 md:-right-20 text-[150px] font-black text-white/[0.02] font-display pointer-events-none select-none hidden md:block" data-speed="1.3">
          LOGS
        </div>
      </div>

      {/* Asymmetrical Layout */}
      <div className="relative flex flex-col gap-12 sm:gap-24 md:gap-32">
        {EXPERIENCES.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          
          return (
            <div 
              key={idx} 
              className={`exp-item relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 sm:gap-8 md:gap-16 group`}
            >
              {/* Giant Number Indicator with Fast Parallax */}
              <div 
                className="hidden md:flex w-1/3 justify-center text-[120px] font-black text-white/5 font-display select-none transition-all duration-500 group-hover:text-signal-cyan/20"
                data-speed={isEven ? "1.2" : "0.8"}
              >
                0{idx + 1}
              </div>

              {/* Experience Card with Slow Parallax */}
              <div 
                className="w-full md:w-2/3 hud-card bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10 p-4 sm:p-8 md:p-10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] hover:border-signal-cyan/50 relative overflow-hidden"
                data-speed={isEven ? "0.9" : "1.1"}
              >
                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-laser z-20" />

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6 relative z-10">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight group-hover:text-signal-cyan transition-colors mb-2 font-display break-words">
                      {exp.role}
                    </h3>
                    <div className="text-gray-400 font-mono text-xs sm:text-sm flex items-center gap-2">
                      <span className="text-signal-pink font-bold">&lt;/&gt;</span>
                      <DecryptedText text={exp.company} animateOn="view" speed={30} />
                    </div>
                  </div>

                  <div className="font-mono text-[10px] sm:text-[11px] text-signal-pink bg-signal-pink/10 border border-signal-pink/30 px-2.5 sm:px-3 py-1 sm:py-1.5 self-start font-bold whitespace-nowrap">
                    [ <DecryptedText text={exp.date} animateOn="hover" /> ]
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 relative z-10">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="text-gray-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed flex items-start gap-3 sm:gap-4">
                      <span className="text-signal-cyan font-mono mt-1 text-[10px] select-none shrink-0">■</span>
                      <span>
                        <SplitText text={point} delay={pIdx * 10} />
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 relative z-10">
                  {exp.techStack.map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="font-mono text-[9px] sm:text-[10px] tracking-widest text-gray-400 bg-white/[0.02] border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 hover:border-signal-cyan hover:text-signal-cyan transition-colors"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

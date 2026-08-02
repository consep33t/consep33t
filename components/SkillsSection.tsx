"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "./GlitchText";
import DecryptedText from "./DecryptedText";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  category: "LANGUAGES" | "IOT_NETWORKING" | "DATABASES" | "TOOLS";
  level: number;
  spec: string;
  icon: string;
}

const SKILL_CATEGORIES = [
  { id: "ALL", label: "// ALL_MODULES" },
  { id: "LANGUAGES", label: "// LANGUAGES_&_FRAMEWORKS" },
  { id: "IOT_NETWORKING", label: "// IOT_&_NETWORKING" },
  { id: "DATABASES", label: "// DATABASES" },
  { id: "TOOLS", label: "// TOOLS_&_DEVOPS" },
] as const;

const SKILLS: SkillItem[] = [
  { name: "React & Next.js", category: "LANGUAGES", level: 95, spec: "App Router, SSR, Tailwind CSS", icon: "⚛️" },
  { name: "Vue.js & Express.js", category: "LANGUAGES", level: 90, spec: "Reactive UI & REST APIs", icon: "🟢" },
  { name: "Go & Python / FastAPI", category: "LANGUAGES", level: 88, spec: "Backend Architecture & Code Gen", icon: "🐹" },
  { name: "JavaScript & TypeScript", category: "LANGUAGES", level: 94, spec: "Strict Mode, ES6+, Logic", icon: "🟨" },
  { name: "Flutter (Dasar)", category: "LANGUAGES", level: 75, spec: "Cross-Platform Mobile App", icon: "📱" },
  { name: "ESP32 Mikrokontroler", category: "IOT_NETWORKING", level: 96, spec: "Embedded Systems, Autonomous Control", icon: "🔌" },
  { name: "Sensors (IR, Ultrasonik, Loadcell, Relay)", category: "IOT_NETWORKING", level: 94, spec: "Weight Telemetry, Hardware Automation", icon: "📡" },
  { name: "Cisco Router & Emulator", category: "IOT_NETWORKING", level: 90, spec: "BNSP Junior Network Administrator", icon: "🌐" },
  { name: "SQL (Expert) & MySQL", category: "DATABASES", level: 95, spec: "High-Performance Queries & Architecture", icon: "🐬" },
  { name: "Firebase & Supabase", category: "DATABASES", level: 88, spec: "Realtime Telemetry & Auth", icon: "🔥" },
  { name: "CI/CD & Manajemen Server", category: "TOOLS", level: 90, spec: "Production Server & Zero Downtime", icon: "🚀" },
  { name: "Git, Postman, Figma, Arduino IDE", category: "TOOLS", level: 92, spec: "Development & Prototyping Tools", icon: "🛠️" },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  
  const filteredSkills = activeCategory === "ALL" 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const bars = gsap.utils.toArray<HTMLElement>('.skill-bar-fill');
    
    bars.forEach((bar) => {
      const width = bar.getAttribute('data-width');
      gsap.fromTo(bar, 
        { width: "0%" },
        {
          width: `${width}%`,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, [activeCategory]);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-12 py-16 sm:py-32 font-sans overflow-hidden" ref={containerRef}>
      
      {/* Background Decorative Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[120%] bg-signal-pink/5 blur-[150px] -z-10 pointer-events-none" data-speed="0.7" />

      {/* Header */}
      <div className="mb-10 sm:mb-16 md:mb-24 relative" data-speed="1.05">
        <div className="flex items-center gap-3 font-mono text-xs text-signal-pink uppercase tracking-widest mb-3 sm:mb-4">
          <span className="h-2 w-2 rounded-full bg-signal-pink animate-pulse shadow-[0_0_10px_#FF2E9F]" />
          <span>// NEURAL_AUGMENTATIONS</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 sm:mb-6 break-words">
          <GlitchText text="SYSTEM" />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-pink to-signal-yellow">
            CAPABILITIES
          </span>
        </h2>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-16" data-speed="1.1">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`font-mono text-[10px] sm:text-xs px-3 sm:px-5 py-1.5 sm:py-2.5 uppercase tracking-widest transition-all duration-300 relative overflow-hidden group ${
              activeCategory === cat.id
                ? "text-black font-bold"
                : "text-gray-400 border border-white/10 hover:border-signal-pink/50 hover:text-white bg-[#0A0A0F]"
            }`}
          >
            {activeCategory === cat.id && (
              <div className="absolute inset-0 bg-signal-pink shadow-[0_0_20px_#FF2E9F] -z-10" />
            )}
            
            {/* Glitch hover background */}
            {activeCategory !== cat.id && (
              <div className="absolute inset-0 bg-signal-pink/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 -z-10" />
            )}
            
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" data-speed="0.95">
        {filteredSkills.map((skill, idx) => (
          <div 
            key={idx} 
            className="group relative bg-[#0A0A0F]/80 backdrop-blur-md p-4 sm:p-6 border border-white/5 hover:border-signal-pink/50 transition-all duration-500 overflow-hidden cursor-default hover:shadow-[0_0_30px_rgba(255,46,159,0.15)]"
          >
            {/* HUD Corners */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-signal-pink transition-colors" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-signal-pink transition-colors" />

            <div className="flex justify-between items-start mb-4 sm:mb-6 gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <span className="text-xl sm:text-2xl filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 shrink-0">
                  {skill.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-mono text-xs sm:text-sm font-bold tracking-wide text-white group-hover:text-signal-yellow transition-colors truncate">
                    {skill.name}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[11px] text-gray-500 mt-0.5 sm:mt-1 truncate">
                    {skill.spec}
                  </p>
                </div>
              </div>
              
              <div className="font-mono text-[10px] sm:text-xs font-black text-signal-pink bg-signal-pink/10 px-2 py-0.5 sm:py-1 shrink-0">
                <DecryptedText text={`${skill.level}%`} animateOn="hover" speed={30} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-black/60 relative rounded-full overflow-hidden">
              <div 
                className="skill-bar-fill h-full bg-gradient-to-r from-signal-pink to-signal-yellow shadow-[0_0_10px_#ff003c]"
                data-width={skill.level}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

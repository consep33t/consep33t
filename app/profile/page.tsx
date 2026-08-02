"use client";

import { TransitionLink } from "@/components/PageTransition";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptedText from "@/components/DecryptedText";
import GlitchText from "@/components/GlitchText";
import Triangulation from "@/components/Triangulation";

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_COMMANDS = [
  { cmd: "./cat_career_goal.sh", output: "Berkarier di bidang web & IoT untuk mendukung transformasi digital via efisiensi sistem & solusi berbasis data." },
  { cmd: "./check_education.sh", output: "S1 Teknik Informatika - Institut Teknologi dan Bisnis Indonesia (2021-2025) | IPK: 3.29" },
  { cmd: "./cat_skripsi_summary.txt", output: "Sistem Ternak Ayam Potong Cerdas Berbasis IoT: ESP32, Loadcell, Sensor IR, Ultrasonik, Relay & Realtime Dashboard." },
];

export default function ProfilePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalIndex, setTerminalIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry Animation
      gsap.from(".profile-fade-up", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Scroll Trigger Parallax
      gsap.utils.toArray('.parallax-panel').forEach((panel: any) => {
        gsap.to(panel, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-x-hidden relative font-sans">
      <Triangulation />

      <section className="mx-auto max-w-6xl px-4 sm:px-12 relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 profile-fade-up border-b border-white/10 pb-4 sm:pb-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-signal-cyan uppercase tracking-widest mb-2">
              <span className="h-2 w-2 rounded-full bg-signal-cyan animate-pulse" />
              <DecryptedText text="// OPERATOR_IDENTITY_DOSSIER" animateOn="view" speed={40} />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] break-words">
              <GlitchText text="PROFILE_DOSSIER" />
            </h1>
          </div>

          <TransitionLink
            href="/"
            data-cursor="hover"
            className="group font-mono text-xs tracking-widest text-gray-400 hover:text-signal-pink transition-colors relative flex items-center gap-2"
          >
            <span>← RETURN_TO_BASE</span>
            <span className="h-px w-8 bg-signal-pink/40 group-hover:w-12 transition-all" />
          </TransitionLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column - ID Card */}
          <div className="col-span-1 md:col-span-4 space-y-6 sm:space-y-8 profile-fade-up parallax-panel">
            <div className="glass-panel p-4 sm:p-8 hud-bracket relative group overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.08)]">
              {/* Animated Laser Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent translate-y-[-100%] group-hover:translate-y-[450px] transition-transform duration-[3s] ease-linear pointer-events-none" />
              
              {/* Avatar Frame */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-signal-cyan/60 p-1 mb-6 relative mx-auto group-hover:border-signal-pink transition-colors duration-500">
                <div className="w-full h-full bg-signal-cyan/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-signal-cyan/20 to-signal-pink/20 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="font-display text-xl sm:text-2xl font-black text-white relative z-10 tracking-widest">
                    AP
                  </span>
                </div>
                {/* HUD Elements */}
                <div className="absolute -right-7 top-0 text-[10px] text-signal-pink font-mono animate-pulse font-bold">REC ●</div>
                <div className="absolute -bottom-5 -left-2 text-[10px] text-signal-cyan font-mono font-bold">v3.29</div>
              </div>
              
              <div className="text-center mb-6">
                <h2 className="font-display text-xl sm:text-2xl font-black text-white mb-1 tracking-wider break-words">
                  <GlitchText text="Ageng Prayoga" />
                </h2>
                <p className="font-mono text-[11px] sm:text-xs text-signal-pink tracking-widest font-bold">
                  <DecryptedText text="IOT & FULL-STACK SOFTWARE ENGINEER" animateOn="view" speed={40} />
                </p>
              </div>
              
              <div className="space-y-3 font-mono text-xs text-gray-400 border-t border-white/10 pt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1.5 gap-1">
                  <span>LOCATION:</span>
                  <span className="text-white font-bold">MEDAN, INDONESIA</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1.5 gap-1">
                  <span>EDUCATION:</span>
                  <span className="text-signal-cyan font-bold">S1 TEKNIK INFORMATIKA</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1.5 gap-1">
                  <span>INSTITUTION:</span>
                  <span className="text-white font-bold">ITBI MEDAN</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-1.5 gap-1">
                  <span>GPA (IPK):</span>
                  <span className="text-signal-pink font-bold">3.29 [GRADUATED 2025]</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>SPECIALIZATION:</span>
                  <span className="text-signal-yellow font-bold">WEB & IOT SYSTEMS</span>
                </div>
              </div>
            </div>

            {/* Core Augmentations Card */}
            <div className="glass-panel p-4 sm:p-6 hud-bracket shadow-[0_0_20px_rgba(255,255,255,0.02)]">
              <h3 className="font-mono text-xs tracking-widest text-white uppercase mb-4 border-l-2 border-signal-cyan pl-3 font-bold">
                <DecryptedText text="// INSTALLED_MODULES" animateOn="hover" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Vue", "Go", "Express.js", "Python", "FastAPI", "SQL Expert", "ESP32", "Sensors", "Cisco Network", "CI/CD"].map((skill) => (
                  <span 
                    key={skill} 
                    className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono text-gray-300 hover:text-signal-cyan hover:border-signal-cyan transition-all cursor-pointer"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile, Skripsi, Leadership */}
          <div className="col-span-1 md:col-span-8 space-y-6 sm:space-y-10">
            
            {/* Career Goal & Profile Card */}
            <div className="glass-panel p-4 sm:p-8 hud-bracket border-signal-cyan/40 hover:border-signal-cyan transition-all duration-300 group profile-fade-up">
              <h3 className="font-mono text-lg sm:text-xl tracking-widest text-signal-cyan mb-3 sm:mb-4 flex items-center gap-3 font-bold break-words">
                <span className="w-3.5 h-3.5 inline-block bg-signal-cyan/20 border border-signal-cyan rotate-45 group-hover:scale-125 transition-transform shrink-0" />
                <GlitchText text="PROFIL_&_TUJUAN_KARIER" />
              </h3>
              <p className="font-sans text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                Lulusan baru Jurusan Teknik Informatika dari Institut Teknologi dan Bisnis Indonesia dengan semangat tinggi untuk mengembangkan karier di bidang teknologi informasi, khususnya pengembangan web dan IoT.
              </p>
              <p className="font-sans text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed border-l-2 border-signal-pink pl-3 sm:pl-4 bg-signal-pink/5 py-2">
                <strong className="text-white">Tujuan Karier:</strong> Berkarier di bidang pengembangan web dan Internet of Things (IoT) untuk mendukung transformasi digital perusahaan melalui inovasi teknologi, efisiensi sistem, dan solusi berbasis data.
              </p>
            </div>

            {/* Academic Thesis / Skripsi Card */}
            <div className="glass-panel p-4 sm:p-8 hud-bracket border-signal-yellow/40 hover:border-signal-yellow transition-all duration-300 group profile-fade-up">
              <h3 className="font-mono text-lg sm:text-xl tracking-widest text-signal-yellow mb-3 sm:mb-4 flex items-center gap-3 font-bold break-words">
                <span className="w-3.5 h-3.5 inline-block bg-signal-yellow/20 border border-signal-yellow rotate-45 group-hover:scale-125 transition-transform shrink-0" />
                <GlitchText text="PROYEK_SKRIPSI_AKADEMIK" />
              </h3>
              <div className="font-sans text-xs sm:text-sm text-gray-300 space-y-3">
                <h4 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wide break-words">
                  SISTEM TERNAK AYAM POTONG CERDAS BERBASIS IOT
                </h4>
                <p className="text-[11px] sm:text-xs font-mono text-signal-yellow break-words">
                  [ FITUR: PENIMBANGAN BERAT, PEMBERIAN PAKAN, DAN MINUM OTOMATIS ]
                </p>
                <p className="leading-relaxed">
                  Merancang sistem otonom cerdas berbasis mikrokontroler (ESP32) yang memanfaatkan sensor Loadcell (timbangan berat), sensor IR, sensor Ultrasonik, dan Relay yang terintegrasi langsung dengan dashboard website monitoring realtime untuk otomatisasi pemberian pakan, minum, serta penimbangan berat ayam.
                </p>
              </div>
            </div>

            {/* Leadership & Activities */}
            <div className="glass-panel p-4 sm:p-8 hud-bracket border-signal-pink/40 hover:border-signal-pink transition-all duration-300 group profile-fade-up">
              <h3 className="font-mono text-lg sm:text-xl tracking-widest text-signal-pink mb-3 sm:mb-4 flex items-center gap-3 font-bold break-words">
                <span className="w-3.5 h-3.5 inline-block bg-signal-pink/20 border border-signal-pink rotate-45 group-hover:scale-125 transition-transform shrink-0" />
                <GlitchText text="LEADERSHIP_&_COMMUNITY" />
              </h3>
              <div className="space-y-4">
                <div className="border-b border-white/5 pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                    <h4 className="font-mono text-xs sm:text-sm font-bold text-white">Google Developer Group</h4>
                    <span className="font-mono text-xs text-signal-pink">2025 - Sekarang</span>
                  </div>
                  <p className="font-mono text-[11px] sm:text-xs text-signal-cyan mb-1">Peserta Aktif (DevFest 2025, Code Fest 2026, Google Arcade)</p>
                  <p className="text-xs text-gray-300">
                    Mendalami praktik terbaik dalam pengembangan software modern, arsitektur cloud, dan rekayasa data melalui serangkaian seminar teknis interaktif.
                  </p>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                    <h4 className="font-mono text-xs sm:text-sm font-bold text-white">Hacktown Coder Competition</h4>
                    <span className="font-mono text-xs text-signal-pink">Januari 2025</span>
                  </div>
                  <p className="font-mono text-[11px] sm:text-xs text-signal-cyan mb-1">Kompetitor (Innovers, Devfect, Infinite Learning)</p>
                  <p className="text-xs text-gray-300">
                    Mengikuti kompetisi pemrograman dan inovasi teknologi tingkat regional di Batam, Indonesia.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Console */}
            <div className="glass-panel p-4 sm:p-6 hud-bracket profile-fade-up border-signal-yellow/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-xs gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-gray-400 ml-2 text-[10px] sm:text-xs">// SYSTEM_CONSOLE_LOG</span>
                </div>
                <button
                  onClick={() => setTerminalIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length)}
                  className="text-signal-yellow hover:text-white transition-colors cursor-pointer px-2 py-0.5 border border-signal-yellow/30 text-[10px] sm:text-xs self-start sm:self-auto"
                >
                  [EXECUTE_NEXT_CMD ↵]
                </button>
              </div>

              <div className="font-mono text-[11px] sm:text-xs text-gray-300 leading-relaxed space-y-2 overflow-x-auto">
                <p className="break-all">
                  <span className="text-signal-cyan font-bold">ageng@consep33t</span>:
                  <span className="text-signal-pink font-bold">~</span>$ {TERMINAL_COMMANDS[terminalIndex].cmd}
                </p>
                <p className="text-signal-yellow pl-2 sm:pl-4 break-words">
                  &gt; <DecryptedText text={TERMINAL_COMMANDS[terminalIndex].output} speed={25} />
                </p>
                <p className="text-green-400 pl-2 sm:pl-4">&gt; STATUS: EXECUTION_SUCCESSFUL [0 ERRORS]</p>
                <p className="text-signal-cyan animate-pulse">_</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

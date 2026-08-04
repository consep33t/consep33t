"use client";

import { TransitionLink } from "@/components/PageTransition";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptedText from "@/components/DecryptedText";
import GlitchText from "@/components/GlitchText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  { label: "React / Next.js", color: "cyan" },
  { label: "Vue / Nuxt", color: "green" },
  { label: "TypeScript", color: "cyan" },
  { label: "Go / Fiber", color: "cyan" },
  { label: "Express.js", color: "yellow" },
  { label: "Python / FastAPI", color: "yellow" },
  { label: "SQL Expert", color: "pink" },
  { label: "ESP32 / IoT", color: "pink" },
  { label: "Sensors (IR, Ultrasonic, Loadcell)", color: "pink" },
  { label: "Cisco Network", color: "yellow" },
  { label: "CI/CD & DevOps", color: "green" },
  { label: "GSAP / Animation", color: "cyan" },
];

const TERMINAL_COMMANDS = [
  { cmd: "./cat_career_goal.sh", output: "Berkarier di bidang web & IoT untuk mendukung transformasi digital via efisiensi sistem & solusi berbasis data." },
  { cmd: "./check_education.sh", output: "S1 Teknik Informatika - Institut Teknologi dan Bisnis Indonesia (2021-2025) | IPK: 3.29" },
  { cmd: "./cat_skripsi_summary.txt", output: "Sistem Ternak Ayam Potong Cerdas Berbasis IoT: ESP32, Loadcell, Sensor IR, Ultrasonik, Relay & Realtime Dashboard." },
];

const CONTACT_LINKS = [
  { label: "GITHUB", value: "github.com/Consep33t", href: "https://github.com/Consep33t", color: "text-signal-cyan" },
  { label: "LINKEDIN", value: "ageng-prayoga-789b652a9", href: "https://linkedin.com/in/ageng-prayoga-789b652a9", color: "text-signal-cyan" },
  { label: "EMAIL", value: "agengp360@gmail.com", href: "mailto:agengp360@gmail.com", color: "text-signal-pink" },
  { label: "WHATSAPP", value: "+62 857-6776-7728", href: "https://wa.me/6285767767728", color: "text-green-400" },
];

const QUICK_EXP = [
  { role: "Backend Developer", org: "Solvera", period: "2024–2025", color: "signal-cyan" },
  { role: "IoT & Fullstack Engineer", org: "Skripsi Akademik", period: "2024–2025", color: "signal-yellow" },
  { role: "Frontend Web Developer", org: "Infinite Learning x Pejantara", period: "2024", color: "signal-pink" },
];

const colorMap: Record<string, string> = {
  cyan: "border-signal-cyan/30 text-signal-cyan bg-signal-cyan/5",
  green: "border-green-400/30 text-green-400 bg-green-400/5",
  yellow: "border-signal-yellow/30 text-signal-yellow bg-signal-yellow/5",
  pink: "border-signal-pink/30 text-signal-pink bg-signal-pink/5",
};

export default function ProfilePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("agengp360@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Bento cell entrance
      gsap.from(".bento-cell", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      id="main-content"
      ref={containerRef}
      className="min-h-screen pt-24 sm:pt-28 pb-16 overflow-x-hidden relative font-sans"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <section className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-signal-cyan uppercase tracking-widest mb-2">
              <span className="h-2 w-2 rounded-full bg-signal-cyan animate-pulse" />
              <DecryptedText text="// OPERATOR_IDENTITY_DOSSIER" animateOn="view" speed={40} />
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] break-words breathe-text">
              <GlitchText text="PROFILE_DOSSIER" />
            </h1>
          </div>
          <TransitionLink
            href="/"
            data-cursor="hover"
            className="group font-mono text-xs tracking-widest text-gray-400 hover:text-signal-pink transition-colors flex items-center gap-2"
          >
            <span>← RETURN_TO_BASE</span>
            <span className="h-px w-8 bg-signal-pink/40 group-hover:w-12 transition-all" />
          </TransitionLink>
        </div>

        {/* ─── BENTO GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 auto-rows-auto gap-4">

          {/* ┌──────────── Cell 1: AVATAR + BIO (lg: col 1–4, rows 1–2) ────────────┐ */}
          <div className="bento-cell sm:col-span-1 lg:col-span-4 lg:row-span-2 glass-panel hud-bracket p-6 flex flex-col items-center gap-5 relative overflow-hidden group shadow-[0_0_30px_rgba(0,240,255,0.06)] hover:shadow-[0_0_40px_rgba(0,240,255,0.14)] transition-shadow duration-500">
            {/* Sweep laser */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent -translate-y-full group-hover:translate-y-[600px] transition-transform duration-[3s] ease-linear pointer-events-none" />

            {/* Avatar */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 border-2 border-dashed border-signal-cyan/60 group-hover:border-signal-pink transition-colors duration-500 rounded-lg p-1 shrink-0">
              <div className="w-full h-full rounded-md overflow-hidden relative bg-signal-cyan/10">
                <Image
                  src="/profile.jpeg"
                  alt="Ageng Prayoga Profile Photo"
                  fill
                  sizes="144px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-signal-cyan/20 to-signal-pink/20 opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />
              </div>
              <div className="absolute -right-7 top-0 text-[10px] text-signal-pink font-mono animate-pulse font-bold">REC ●</div>
              <div className="absolute -bottom-5 -left-2 text-[10px] text-signal-cyan font-mono font-bold">v3.29</div>
            </div>

            {/* Identity */}
            <div className="text-center space-y-1">
              <h2 className="font-display text-xl sm:text-2xl font-black text-white tracking-wider">
                <GlitchText text="Ageng Prayoga" />
              </h2>
              <p className="font-mono text-[11px] text-signal-pink tracking-widest font-bold">
                <DecryptedText text="IOT & FULL-STACK ENGINEER" animateOn="view" speed={40} />
              </p>
            </div>

            {/* Data rows */}
            <div className="w-full space-y-2 font-mono text-xs text-gray-400 border-t border-white/10 pt-4">
              {[
                { label: "LOCATION", value: "MEDAN, INDONESIA", color: "text-white" },
                { label: "EDUCATION", value: "S1 TEKNIK INFORMATIKA", color: "text-signal-cyan" },
                { label: "INSTITUTION", value: "ITBI MEDAN", color: "text-white" },
                { label: "GPA (IPK)", value: "3.29 [GRADUATED 2025]", color: "text-signal-pink" },
                { label: "FOCUS", value: "WEB & IOT SYSTEMS", color: "text-signal-yellow" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between border-b border-white/5 pb-1.5 gap-2">
                  <span className="shrink-0">{label}:</span>
                  <span className={`${color} font-bold text-right`}>{value}</span>
                </div>
              ))}
            </div>

            {/* Open to Work */}
            <div className="w-full flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-3 py-2 text-[9px] uppercase tracking-widest text-green-400 font-bold shadow-[0_0_12px_rgba(34,197,94,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping shrink-0" />
              <span>AVAILABLE_FOR_WORK_2026</span>
            </div>
          </div>

          {/* ┌──────────── Cell 2: TECH STACK (lg: col 5–8) ────────────┐ */}
          <div className="bento-cell sm:col-span-1 lg:col-span-4 glass-panel hud-bracket p-5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-shadow duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-signal-cyan rotate-45 inline-block shrink-0" />
              <h3 className="font-mono text-xs tracking-widest text-signal-cyan uppercase font-bold">
                <DecryptedText text="// INSTALLED_MODULES" animateOn="hover" />
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map(({ label, color }) => (
                <span
                  key={label}
                  className={`px-2.5 py-1 border text-[10px] font-mono font-bold transition-all duration-300 hover:scale-105 cursor-default ${colorMap[color]}`}
                >
                  #{label}
                </span>
              ))}
            </div>
          </div>

          {/* ┌──────────── Cell 3: GITHUB STATS (lg: col 9–12) ────────────┐ */}
          <div className="bento-cell sm:col-span-1 lg:col-span-4 glass-panel hud-bracket p-5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(255,46,159,0.1)] transition-shadow duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-signal-pink rotate-45 inline-block shrink-0" />
              <h3 className="font-mono text-xs tracking-widest text-signal-pink uppercase font-bold">
                <DecryptedText text="// SYSTEM_STATS" animateOn="hover" />
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "REPOS", value: "10+", color: "text-signal-cyan" },
                { label: "LANGUAGES", value: "7+", color: "text-signal-yellow" },
                { label: "COMMITS_YTD", value: "200+", color: "text-signal-pink" },
                { label: "CERTS", value: "4", color: "text-green-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="border border-white/8 bg-white/3 p-3 flex flex-col gap-1 group/stat hover:border-white/20 transition-colors">
                  <span className={`font-display text-2xl font-black ${color} drop-shadow-[0_0_8px_currentColor]`}>{value}</span>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
            <a
              href="https://github.com/Consep33t"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 border border-signal-cyan/30 text-signal-cyan font-mono text-[10px] tracking-widest py-2 hover:bg-signal-cyan hover:text-black transition-all duration-300 font-bold"
            >
              <DecryptedText text="VISIT_GITHUB_PROFILE ↗" animateOn="hover" />
            </a>
          </div>

          {/* ┌──────────── Cell 4: CONTACT LINKS (lg: col 5–8) ────────────┐ */}
          <div className="bento-cell sm:col-span-1 lg:col-span-4 glass-panel hud-bracket p-5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(252,238,10,0.08)] transition-shadow duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-signal-yellow rotate-45 inline-block shrink-0" />
              <h3 className="font-mono text-xs tracking-widest text-signal-yellow uppercase font-bold">
                <DecryptedText text="// CONTACT_LINKS" animateOn="hover" />
              </h3>
            </div>
            <div className="space-y-2">
              {CONTACT_LINKS.map(({ label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/8 bg-white/3 px-3 py-2.5 hover:border-white/20 hover:bg-white/6 transition-all duration-200 group/link"
                  aria-label={`Contact via ${label}`}
                >
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest">{label}</span>
                  <span className={`font-mono text-[10px] font-bold ${color} truncate max-w-[55%] text-right group-hover/link:underline`}>{value}</span>
                </a>
              ))}
            </div>
            <button
              onClick={copyEmail}
              className="mt-3 w-full font-mono text-[10px] tracking-widest py-2 border border-signal-pink/40 text-signal-pink hover:bg-signal-pink hover:text-black transition-all duration-300 font-bold cursor-pointer"
              aria-label="Copy email address to clipboard"
            >
              {copied ? "✓ COPIED_TO_CLIPBOARD" : "[ COPY_EMAIL_ADDR ]"}
            </button>
          </div>

          {/* ┌──────────── Cell 5: CAREER GOAL & BIO (lg: col 9–12) ────────────┐ */}
          <div className="bento-cell sm:col-span-2 lg:col-span-4 glass-panel hud-bracket p-5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-shadow duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-signal-cyan rotate-45 inline-block shrink-0" />
              <h3 className="font-mono text-xs tracking-widest text-signal-cyan uppercase font-bold">
                <DecryptedText text="// PROFIL_&_TUJUAN_KARIER" animateOn="hover" />
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
              Lulusan baru Jurusan Teknik Informatika dari Institut Teknologi dan Bisnis Indonesia dengan semangat tinggi untuk berkarier di bidang teknologi informasi, khususnya pengembangan web dan IoT.
            </p>
            <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed border-l-2 border-signal-pink pl-3 bg-signal-pink/5 py-2">
              <strong className="text-white">Tujuan Karier: </strong>Berkarier di bidang web & IoT untuk mendukung transformasi digital perusahaan melalui inovasi teknologi, efisiensi sistem, dan solusi berbasis data.
            </p>
          </div>

          {/* ┌──────────── Cell 6: EXPERIENCE QUICK VIEW (lg: col 1–6) ────────────┐ */}
          <div className="bento-cell sm:col-span-2 lg:col-span-6 glass-panel hud-bracket p-5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(255,46,159,0.08)] transition-shadow duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-signal-pink rotate-45 inline-block shrink-0" />
              <h3 className="font-mono text-xs tracking-widest text-signal-pink uppercase font-bold">
                <DecryptedText text="// EXPERIENCE_TIMELINE" animateOn="hover" />
              </h3>
            </div>
            <div className="space-y-3">
              {QUICK_EXP.map(({ role, org, period, color }, i) => (
                <div key={i} className={`relative pl-4 border-l-2 border-${color}/40 group/exp hover:border-${color} transition-colors duration-300`}>
                  <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-${color} shadow-[0_0_8px_currentColor]`} />
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-mono text-xs font-bold text-white">{role}</p>
                      <p className={`font-mono text-[10px] text-${color}`}>{org}</p>
                    </div>
                    <span className="font-mono text-[9px] text-gray-500 shrink-0">{period}</span>
                  </div>
                </div>
              ))}
            </div>
            <TransitionLink
              href="/"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] text-gray-500 hover:text-signal-pink transition-colors tracking-widest"
              data-cursor="hover"
            >
              <DecryptedText text="VIEW_FULL_EXPERIENCE →" animateOn="hover" />
            </TransitionLink>
          </div>

          {/* ┌──────────── Cell 7: SKRIPSI / THESIS (lg: col 7–12) ────────────┐ */}
          <div className="bento-cell sm:col-span-2 lg:col-span-6 glass-panel hud-bracket p-5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(252,238,10,0.1)] transition-shadow duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-signal-yellow rotate-45 inline-block shrink-0" />
              <h3 className="font-mono text-xs tracking-widest text-signal-yellow uppercase font-bold">
                <DecryptedText text="// PROYEK_SKRIPSI_AKADEMIK" animateOn="hover" />
              </h3>
            </div>
            <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wide mb-2">
              SISTEM TERNAK AYAM POTONG CERDAS BERBASIS IOT
            </h4>
            <p className="font-mono text-[10px] text-signal-yellow mb-3">
              [ FITUR: PENIMBANGAN BERAT, PEMBERIAN PAKAN & MINUM OTOMATIS ]
            </p>
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              Merancang sistem otonom cerdas berbasis ESP32 yang memanfaatkan sensor Loadcell, sensor IR, Ultrasonik, dan Relay — terintegrasi dengan dashboard website monitoring realtime untuk otomatisasi peternakan.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["ESP32", "Loadcell", "Sensor IR", "Ultrasonik", "Relay", "Dashboard Realtime"].map((tag) => (
                <span key={tag} className="px-2 py-0.5 border border-signal-yellow/30 text-signal-yellow bg-signal-yellow/5 font-mono text-[9px] tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ┌──────────── Cell 8: TERMINAL CONSOLE (lg: col 1–12, full width) ────────────┐ */}
          <div className="bento-cell sm:col-span-2 lg:col-span-12 glass-panel hud-bracket p-5 border-signal-yellow/20 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(252,238,10,0.06)] transition-shadow duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-gray-400 ml-2 text-[10px] sm:text-xs">// SYSTEM_CONSOLE_LOG</span>
              </div>
              <button
                onClick={() => setTerminalIndex((prev) => (prev + 1) % TERMINAL_COMMANDS.length)}
                className="text-signal-yellow hover:text-white transition-colors cursor-pointer px-2 py-0.5 border border-signal-yellow/30 text-[10px] sm:text-xs self-start sm:self-auto"
                aria-label="Execute next terminal command"
              >
                [EXECUTE_NEXT_CMD ↵]
              </button>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-gray-300 leading-relaxed space-y-1.5">
              <p>
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

        </div>{/* end bento grid */}
      </section>
    </main>
  );
}

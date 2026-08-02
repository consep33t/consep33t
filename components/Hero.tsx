"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import DecryptedText from "./DecryptedText";
import GlitchText from "./GlitchText";
import CircularText from "./CircularText";
import SplitText from "./SplitText";
import NeonKanji from "./NeonKanji";
import Triangulation from "./Triangulation";
import { TransitionLink } from "./PageTransition";

const QUICK_STATS = [
  { label: "DEGREE", value: "S1 INF", color: "text-signal-cyan" },
  { label: "GPA", value: "3.29 IPK", color: "text-signal-pink" },
  { label: "STACK", value: "FULLSTACK & IOT", color: "text-signal-yellow" },
  { label: "CERTIFIED", value: "BNSP JNA", color: "text-signal-violet" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const yBg = useTransform(smoothScroll, [0, 1], ["0%", "15%"]);
  const yText = useTransform(smoothScroll, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(smoothScroll, [0, 0.75], [1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col items-end justify-center overflow-hidden px-4 sm:px-12 pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#08080C] font-sans text-right"
    >
      {/* Background Triangulation & Grid */}
      <Triangulation />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          y: yBg,
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "right top"
        }}
      />

      {/* Epic Ambient Glow on the Right */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[500px] sm:h-[800px] w-[350px] sm:w-[600px] rounded-full blur-[120px] sm:blur-[180px] mix-blend-screen opacity-40 translate-x-1/3"
        style={{ x: useTransform(smoothX, v => v * 100), y: useTransform(smoothY, v => v * 100) }}
      >
        <div className="w-full h-full bg-gradient-to-br from-signal-cyan via-signal-violet to-signal-pink" />
      </motion.div>

      {/* Massive Background Kanji */}
      <div className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 mix-blend-screen opacity-15 sm:opacity-20">
        <NeonKanji text="完全右揃え" className="text-[18vh] sm:text-[25vh] writing-vertical-rl text-signal-cyan drop-shadow-[0_0_30px_#00F0FF]" />
      </div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-end"
      >
        {/* Status Line */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-signal-cyan/30 bg-signal-cyan/5 px-3 sm:px-6 py-1.5 sm:py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-signal-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)] max-w-full overflow-hidden"
        >
          <span className="truncate">
            <DecryptedText text="sys.override // OPERATOR: AGENG PRAYOGA" animateOn="view" speed={30} maxIterations={10} />
          </span>
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-signal-cyan shadow-[0_0_10px_#00f0ff]" />
        </motion.div>

        {/* Title */}
        <motion.div 
          className="mb-4 sm:mb-6 relative w-full"
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <h1 className="font-display text-4xl sm:text-7xl lg:text-[9.5rem] font-black leading-[0.95] tracking-tighter text-white drop-shadow-[0_0_40px_rgba(0,240,255,0.3)] break-words">
            <span className="block text-right hover:text-signal-pink transition-colors duration-500">AGENG</span>
            <span className="block text-right bg-gradient-to-l from-signal-cyan via-signal-violet to-signal-pink bg-clip-text text-transparent pb-1 sm:pb-2">
              PRAYOGA
            </span>
          </h1>
          
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 hidden lg:block opacity-70 hover:opacity-100 transition-opacity duration-300">
            <CircularText 
              text="* AGENG * PRAYOGA * IOT * FULLSTACK * SYSTEM ARCHITECT " 
              spinDuration={10} 
              className="w-40 h-40 font-mono text-sm text-signal-cyan tracking-[0.2em]"
              onHover="speedUp"
            />
          </div>
        </motion.div>

        {/* Bio Card (Rata Kanan) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-8 sm:mb-10 w-full max-w-2xl border-r-2 sm:border-r-4 border-signal-pink bg-black/40 p-4 sm:p-8 shadow-[0_0_40px_rgba(255,46,159,0.15)] backdrop-blur-md relative overflow-hidden group rounded-l-xl sm:rounded-l-2xl"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-signal-pink/10 blur-[50px] group-hover:bg-signal-pink/20 transition-all duration-700" />
          <h2 className="font-mono text-xs sm:text-sm text-signal-pink uppercase tracking-widest mb-3 sm:mb-4 flex justify-end items-center gap-2 sm:gap-3 font-bold flex-wrap">
            <DecryptedText text="IOT & FULL-STACK SOFTWARE ENGINEER // 0x01" speed={40} />
            <span className="text-lg sm:text-xl">⚡</span>
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl leading-relaxed text-gray-300 font-sans text-right [text-wrap:balance]">
            Lulusan S1 Teknik Informatika ITBI Medan. Pengembang software <strong className="text-white">Full-Stack & IoT</strong> berpengalaman merancang sistem otonom cerdas, arsitektur backend scalable, serta aplikasi web & mobile terintegrasi Kecerdasan Buatan.
          </p>
        </motion.div>

        {/* Action Buttons (Rata Kanan) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-6 w-full"
        >
          <TransitionLink
            href="/profile"
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 overflow-hidden border border-white/20 bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-signal-violet hover:bg-signal-violet/10 hover:text-signal-violet w-full sm:w-auto"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-2">VIEW_DOSSIER</span>
            <span className="opacity-50 group-hover:opacity-100">{'<'}</span>
          </TransitionLink>

          <TransitionLink
            href="/projects"
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center gap-3 sm:gap-4 overflow-hidden bg-signal-cyan px-6 sm:px-10 py-3.5 sm:py-4 font-mono text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-black shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] w-full sm:w-auto"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-2">EXPLORE_PROJECTS</span>
            <span className="text-lg leading-none">↗</span>
          </TransitionLink>
        </motion.div>

        {/* Stats Grid (Rata Kanan) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 sm:mt-16 grid grid-cols-2 sm:flex sm:flex-wrap justify-end gap-3 sm:gap-6 border-t border-white/10 pt-6 sm:pt-8 w-full max-w-3xl"
        >
          {QUICK_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-end border-r border-white/10 pr-3 sm:pr-4 last:border-r-0 sm:last:border-r-0">
              <div className="font-mono text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className={`font-mono text-base sm:text-xl font-black tracking-wider ${stat.color} drop-shadow-md`}>
                <DecryptedText text={stat.value} animateOn="view" speed={40} />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Down */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12 z-10 font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.3em] text-gray-400 [writing-mode:vertical-rl] rotate-180 cursor-pointer hover:text-signal-cyan transition-colors"
      >
        <DecryptedText text="SCROLL_DOWN" animateOn="hover" />
      </motion.div>
    </section>
  );
}


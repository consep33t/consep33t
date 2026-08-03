"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import DecryptedText from "./DecryptedText";
import GlitchText from "./GlitchText";
import CircularText from "./CircularText";
import SplitText from "./SplitText";
import NeonKanji from "./NeonKanji";
import Triangulation from "./Triangulation";
import { TransitionLink } from "./PageTransition";
import gsap from "gsap";

const QUICK_STATS = [
  { label: "DEGREE", value: "S1 INF", color: "text-signal-cyan" },
  { label: "GPA", value: "3.29 IPK", color: "text-signal-pink" },
  { label: "STACK", value: "FULLSTACK & IOT", color: "text-signal-yellow" },
  { label: "CERTIFIED", value: "BNSP JNA", color: "text-signal-violet" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnPrimaryRef = useRef<HTMLAnchorElement>(null);
  const btnSecondaryRef = useRef<HTMLAnchorElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const yBg = useTransform(smoothScroll, [0, 1], ["0%", "15%"]);
  const yText = useTransform(smoothScroll, [0, 1], ["0%", "35%"]);
  const opacityText = useTransform(smoothScroll, [0, 0.75], [1, 0]);

  // Magnetic button effect (desktop only)
  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const btns = [btnPrimaryRef.current, btnSecondaryRef.current].filter(Boolean) as HTMLElement[];

    const cleanups: (() => void)[] = btns.map((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
        gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Orb mouse tracking (desktop only, passive)
  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine || !containerRef.current || !orbRef.current) return;

    const orb = orbRef.current;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 80;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
        gsap.to(orb, { x: nx, y: ny, duration: 1.2, ease: "power2.out", overwrite: "auto" });
      });
    };

    const el = containerRef.current;
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] w-full flex-col items-end justify-center overflow-hidden px-4 sm:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#08080C] font-sans text-right"
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
          backgroundPosition: "right top",
        }}
      />

      {/* Ambient Orb - mouse tracked, desktop only */}
      <div
        ref={orbRef}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[400px] sm:h-[700px] w-[300px] sm:w-[550px] translate-x-1/3 rounded-full blur-[100px] sm:blur-[160px] mix-blend-screen opacity-30 sm:opacity-40 will-change-transform"
      >
        <div className="w-full h-full bg-gradient-to-br from-signal-cyan via-signal-violet to-signal-pink" />
      </div>

      {/* Massive Background Kanji */}
      <div className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 mix-blend-screen opacity-10 sm:opacity-15">
        <NeonKanji
          text="完全右揃え"
          className="text-[16vh] sm:text-[22vh] writing-vertical-rl text-signal-cyan drop-shadow-[0_0_30px_#00F0FF]"
        />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-end"
      >
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-5 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 rounded-full border border-signal-cyan/30 bg-signal-cyan/5 px-3 sm:px-6 py-1.5 sm:py-2 font-mono text-[9px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.25em] text-signal-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)] max-w-[90vw] overflow-hidden"
        >
          <span className="truncate">
            <DecryptedText text="sys.override // OPERATOR: AGENG PRAYOGA" animateOn="view" speed={30} maxIterations={10} />
          </span>
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-signal-cyan shadow-[0_0_10px_#00f0ff]" />
        </motion.div>

        {/* Title */}
        <motion.div
          className="mb-4 sm:mb-6 relative w-full"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <h1 className="font-display text-[2.8rem] leading-[0.9] sm:text-7xl lg:text-[9.5rem] font-black tracking-tighter text-white drop-shadow-[0_0_40px_rgba(0,240,255,0.3)] break-words">
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

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-7 sm:mb-10 w-full max-w-2xl border-r-2 sm:border-r-4 border-signal-pink bg-black/40 p-4 sm:p-8 shadow-[0_0_40px_rgba(255,46,159,0.15)] backdrop-blur-md relative overflow-hidden group rounded-l-xl sm:rounded-l-2xl"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-signal-pink/10 blur-[50px] group-hover:bg-signal-pink/25 transition-all duration-700" />
          {/* Top scan line on hover */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal-pink to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-row items-center justify-end gap-4 mb-4">
            <div className="text-right order-2">
              <h2 className="font-mono text-[10px] sm:text-sm text-signal-pink uppercase tracking-widest flex justify-end items-center gap-2 font-bold flex-wrap">
                <DecryptedText text="IOT & FULL-STACK SOFTWARE ENGINEER // 0x01" speed={40} />
                <span className="text-lg sm:text-xl">⚡</span>
              </h2>
            </div>
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 border-2 border-dashed border-signal-pink/80 p-0.5 rounded-lg overflow-hidden shrink-0 order-1 shadow-[0_0_15px_rgba(255,46,159,0.3)]">
              <Image
                src="/profile.jpeg"
                alt="Ageng Prayoga"
                fill
                sizes="80px"
                className="object-cover rounded-md group-hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
          </div>

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300 font-sans text-right [text-wrap:balance]">
            Lulusan S1 Teknik Informatika ITBI Medan. Pengembang software{" "}
            <strong className="text-white">Full-Stack & IoT</strong> berpengalaman merancang sistem otonom cerdas, arsitektur backend scalable, serta aplikasi web & mobile terintegrasi Kecerdasan Buatan.
          </p>
        </motion.div>

        {/* CTA Buttons — mobile-first fixed layout, no overlap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-5 w-full"
        >
          {/* Secondary CTA */}
          <TransitionLink
            href="/profile"
            data-cursor="hover"
            ref={btnSecondaryRef as React.Ref<HTMLAnchorElement>}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-white/20 bg-transparent px-6 py-3.5 sm:py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:border-signal-violet hover:shadow-[0_0_30px_rgba(157,78,221,0.4)] w-full sm:w-auto select-none"
          >
            {/* Fill on hover */}
            <span className="absolute inset-0 bg-signal-violet/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-signal-violet">VIEW_DOSSIER</span>
            <span className="relative z-10 opacity-50 group-hover:opacity-100 group-hover:text-signal-violet">{"<"}</span>
          </TransitionLink>

          {/* Primary CTA */}
          <TransitionLink
            href="/projects"
            data-cursor="hover"
            ref={btnPrimaryRef as React.Ref<HTMLAnchorElement>}
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-signal-cyan px-6 sm:px-10 py-3.5 sm:py-4 font-mono text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,240,255,0.9)] w-full sm:w-auto select-none"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">EXPLORE_PROJECTS</span>
            <span className="relative z-10 text-lg leading-none">↗</span>
          </TransitionLink>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 sm:mt-14 grid grid-cols-2 sm:flex sm:flex-wrap justify-end gap-3 sm:gap-6 border-t border-white/10 pt-5 sm:pt-8 w-full max-w-3xl"
        >
          {QUICK_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-end border-r border-white/10 pr-3 sm:pr-5 last:border-r-0 cursor-default"
            >
              <div className="font-mono text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest mb-1 group-hover:text-gray-400 transition-colors">
                {stat.label}
              </div>
              <div className={`font-mono text-sm sm:text-xl font-black tracking-wider ${stat.color} drop-shadow-md group-hover:scale-105 transition-transform origin-right`}>
                <DecryptedText text={stat.value} animateOn="view" speed={40} />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-5 sm:bottom-8 right-4 sm:right-12 z-10 font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.3em] text-gray-500 [writing-mode:vertical-rl] rotate-180 cursor-default hover:text-signal-cyan transition-colors"
      >
        SCROLL_DOWN
      </motion.div>

      {/* Bottom left HUD tag */}
      <div className="absolute bottom-5 left-4 sm:left-12 font-mono text-[8px] sm:text-[10px] text-gray-700 tracking-widest hidden sm:block">
        LOC: MEDAN, ID // COORD: 03°35&apos;N 98°40&apos;E
      </div>
    </section>
  );
}

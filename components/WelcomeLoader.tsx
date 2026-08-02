"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import SplitText from "./SplitText";
import GlitchText from "./GlitchText";

const BOOT_SEQUENCE = [
  "システム起動中... (INITIALIZING SYS_KERNEL)",
  "極道プロトコル... (BYPASSING SECURITY FIREWALL)",
  "ニューラルネットワーク... (ESTABLISHING NEURAL LINK)",
  "データ復号化中... (PRELOADING ASSETS)",
  "アクセス許可... (OVERRIDE SUCCESSFUL)",
];

const PREFETCH_IMAGES = [
  "https://opengraph.githubassets.com/1/consep33t/kuyanime",
  "https://opengraph.githubassets.com/1/consep33t/laporPak",
  "https://opengraph.githubassets.com/1/consep33t/Pemetaan-Sawit-Web-UI",
  "https://opengraph.githubassets.com/1/consep33t/wa-getway-api",
];

export default function WelcomeLoader() {
  const [mounted, setMounted] = useState(true);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mainLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      router.prefetch("/projects");
      router.prefetch("/profile");
      router.prefetch("/cyber-hack");
      router.prefetch("/minigame");

      PREFETCH_IMAGES.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    } catch {}

    const hasPlayed = sessionStorage.getItem("consep33t_loader_played");
    if (hasPlayed) {
      setMounted(false);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("consep33t_loader_played", "true");
          setMounted(false);
        },
      });

      // Terminal slide up
      tl.from(terminalRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Fast boot sequence
      BOOT_SEQUENCE.forEach((text, i) => {
        tl.to(textRef.current, {
          duration: 0.35,
          onStart: () => {
            if (textRef.current) {
              textRef.current.innerText = text;
            }
          },
        });
        
        tl.to(progressRef.current, {
          scaleX: (i + 1) / BOOT_SEQUENCE.length,
          duration: 0.35,
          ease: "none"
        }, "<");
      });

      // Flash main logo
      tl.to(terminalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.fromTo(mainLogoRef.current, 
        { scale: 0.5, opacity: 0, filter: "blur(10px)" },
        { scale: 1.1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.7)" }
      );

      // Glitch out & Fade entire loader
      tl.to(mainLogoRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        delay: 0.5,
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, [router]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050508] pointer-events-none">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Central Logo climax */}
      <div ref={mainLogoRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-20">
        <div className="font-display text-5xl md:text-7xl font-black text-white tracking-widest drop-shadow-[0_0_40px_rgba(0,240,255,0.8)]">
          <SplitText text="CONSEP33T" delay={30} />
        </div>
        <div className="mt-4 font-mono text-sm text-signal-pink tracking-[0.5em]">
          <GlitchText text="SYSTEM_READY" isActive={true} />
        </div>
      </div>

      {/* Terminal Boot */}
      <div ref={terminalRef} className="relative z-10 flex flex-col items-start gap-4 p-8 w-full max-w-lg border border-signal-cyan/20 bg-[#08080C]/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,240,255,0.1)] rounded-sm">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal-pink to-transparent" />
        
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 bg-signal-cyan animate-pulse shadow-[0_0_10px_#00F0FF]" />
          <span className="font-mono text-xs text-signal-cyan tracking-widest">BOOT_SEQ_INIT</span>
        </div>
        
        <div 
          ref={textRef} 
          className="font-mono text-xs md:text-sm text-gray-300 min-h-[24px] uppercase"
        >
          _
        </div>

        <div className="w-full h-[2px] bg-white/10 mt-2 overflow-hidden rounded-full">
          <div 
            ref={progressRef}
            className="h-full w-full bg-signal-cyan origin-left scale-x-0 shadow-[0_0_15px_#00F0FF]"
          />
        </div>
      </div>
    </div>
  );
}

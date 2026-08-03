"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const BOOT_LINES = [
  { text: "SYS_KERNEL........LOAD", color: "#00F0FF" },
  { text: "BYPASSING SECURITY FIREWALL", color: "#FF2E9F" },
  { text: "NEURAL LINK ESTABLISHED", color: "#9D4EDD" },
  { text: "DECRYPTING ASSETS", color: "#fcee0a" },
  { text: "ACCESS OVERRIDE: SUCCESS", color: "#00ff66" },
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scanLinesRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

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

    // === Particle Field on Canvas ===
    const canvas = canvasRef.current;
    let animId: number;
    if (canvas) {
      const ctx2d = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = [];
      const COLORS = ["#00F0FF", "#FF2E9F", "#9D4EDD", "#fcee0a"];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      const drawParticles = () => {
        if (!ctx2d || !canvas) return;
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx2d.beginPath();
          ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx2d.fillStyle = p.color;
          ctx2d.globalAlpha = p.alpha;
          ctx2d.fill();
          ctx2d.globalAlpha = 1;
        });

        // draw connecting lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx2d.beginPath();
              ctx2d.moveTo(particles[i].x, particles[i].y);
              ctx2d.lineTo(particles[j].x, particles[j].y);
              ctx2d.strokeStyle = "#00F0FF";
              ctx2d.globalAlpha = (1 - dist / 100) * 0.15;
              ctx2d.lineWidth = 0.5;
              ctx2d.stroke();
              ctx2d.globalAlpha = 1;
            }
          }
        }

        animId = requestAnimationFrame(drawParticles);
      };
      drawParticles();
    }

    // === GSAP Timeline ===
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          cancelAnimationFrame(animId);
          sessionStorage.setItem("consep33t_loader_played", "true");
          setMounted(false);
        },
      });

      // 1. Scan lines sweep (immediate, creepy CRT effect)
      if (scanLinesRef.current) {
        gsap.to(scanLinesRef.current, {
          backgroundPositionY: "100%",
          duration: 3.5,
          ease: "none",
          repeat: -1,
        });
      }

      // 2. Terminal slide in
      tl.from(terminalRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
      });

      // 3. Reveal boot lines one by one
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        tl.fromTo(
          line,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.22,
            ease: "power2.out",
          },
          `>0.05`
        );
        // Animate progress fill
        tl.to(
          progressFillRef.current,
          {
            width: `${((i + 1) / BOOT_LINES.length) * 100}%`,
            duration: 0.22,
            ease: "none",
          },
          "<"
        );
      });

      // 4. Hold briefly
      tl.to({}, { duration: 0.3 });

      // 5. Glitch flash
      if (glitchRef.current) {
        tl.fromTo(
          glitchRef.current,
          { opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.15, ease: "steps(3)" }
        );
        tl.to(glitchRef.current, { clipPath: "inset(0% 0 100% 0)", duration: 0.15, ease: "steps(3)" });
        tl.to(glitchRef.current, { opacity: 0, duration: 0.1 });
      }

      // 6. Terminal scale out
      tl.to(terminalRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 0.35,
        ease: "power2.in",
      });

      // 7. Big LOGO reveal
      tl.fromTo(
        logoRef.current,
        { scale: 0.6, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "expo.out",
        }
      );

      // 8. Logo hold then explode out
      tl.to(logoRef.current, {
        scale: 1.6,
        opacity: 0,
        filter: "blur(30px)",
        duration: 0.6,
        ease: "power3.in",
        delay: 0.5,
      });

      // 9. Fade whole container
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<0.1"
      );
    }, containerRef);

    return () => {
      cancelAnimationFrame(animId);
      ctx.revert();
    };
  }, [router]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#020204] pointer-events-none overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* CRT Scan Lines overlay */}
      <div
        ref={scanLinesRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.04) 2px, rgba(0,240,255,0.04) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Corner HUD decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-signal-cyan z-10 animate-pulse" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-signal-pink z-10 animate-pulse" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-signal-pink z-10 animate-pulse" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-signal-cyan z-10 animate-pulse" />

      {/* HUD coords top */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-signal-cyan/50 tracking-widest z-10">
        SYS::BOOT_SEQUENCE // OPERATOR: AGENG.PRAYOGA
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] text-signal-pink/50 tracking-widest z-10">
        SECURE_ENCLAVE_v2.8.3 // OVERRIDE_PROTOCOL_ACTIVE
      </div>

      {/* Terminal Box */}
      <div
        ref={terminalRef}
        className="relative z-10 w-full max-w-sm sm:max-w-md mx-4 border border-signal-cyan/30 bg-[#04040A]/90 backdrop-blur-xl shadow-[0_0_60px_rgba(0,240,255,0.12),inset_0_0_40px_rgba(0,240,255,0.03)] rounded-sm overflow-hidden"
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-signal-cyan/20 px-4 py-2.5 bg-signal-cyan/5">
          <div className="w-2.5 h-2.5 rounded-full bg-signal-pink shadow-[0_0_8px_#FF2E9F] animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-signal-yellow shadow-[0_0_8px_#fcee0a] animate-pulse" style={{ animationDelay: "0.3s" }} />
          <div className="w-2.5 h-2.5 rounded-full bg-signal-cyan shadow-[0_0_8px_#00F0FF] animate-pulse" style={{ animationDelay: "0.6s" }} />
          <span className="ml-3 font-mono text-[10px] text-signal-cyan/60 tracking-widest">BOOT_CONSOLE — v2.8.3</span>
        </div>

        {/* Lines */}
        <div className="p-5 sm:p-6 space-y-2.5">
          <div className="font-mono text-[10px] text-gray-600 mb-4">
            {`> INITIALIZING SYS_KERNEL...`}
          </div>
          {BOOT_LINES.map((line, i) => (
            <div
              key={i}
              ref={(el) => { if (el) linesRef.current[i] = el; }}
              className="flex items-center gap-3 opacity-0"
            >
              <span className="font-mono text-[10px] text-gray-600 select-none shrink-0">[{String(i).padStart(2, "0")}]</span>
              <span
                className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest"
                style={{ color: line.color, textShadow: `0 0 10px ${line.color}80` }}
              >
                {line.text}
              </span>
              <span
                className="ml-auto font-mono text-[9px] font-bold shrink-0"
                style={{ color: line.color + "99" }}
              >
                OK
              </span>
            </div>
          ))}

          {/* Progress */}
          <div ref={progressBarRef} className="mt-5 pt-4 border-t border-white/5">
            <div className="flex justify-between font-mono text-[9px] text-gray-600 mb-2">
              <span>LOADING PAYLOAD</span>
              <span className="text-signal-cyan">██████</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
              <div
                ref={progressFillRef}
                className="h-full w-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00F0FF, #9D4EDD, #FF2E9F)",
                  boxShadow: "0 0 12px #00F0FF",
                  transition: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Glitch overlay bar */}
      <div
        ref={glitchRef}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 opacity-0 z-20 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, #00F0FF22 0px, transparent 2px, transparent 10px, #FF2E9F22 10px, transparent 12px)",
        }}
      />

      {/* Central Logo Reveal */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-30 pointer-events-none"
      >
        {/* Logo glow backdrop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full bg-signal-cyan/10 blur-[80px] animate-pulse" />
        </div>

        <div className="relative text-center">
          <div
            className="font-display text-6xl sm:text-8xl font-black text-white tracking-[0.15em] leading-none"
            style={{ textShadow: "0 0 40px #00F0FF, 0 0 80px #00F0FF60" }}
          >
            CONSEP33T
          </div>
          <div
            className="mt-3 font-mono text-xs sm:text-sm tracking-[0.6em] uppercase"
            style={{ color: "#FF2E9F", textShadow: "0 0 20px #FF2E9F" }}
          >
            SYSTEM_READY
          </div>
          {/* Horizontal glitch lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
            <div className="h-px w-full bg-signal-cyan absolute" style={{ top: "30%", transform: "translateX(-5px)" }} />
            <div className="h-px w-3/4 bg-signal-pink absolute left-1/4" style={{ top: "70%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

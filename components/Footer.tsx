"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import DecryptedText from "./DecryptedText";
import GlitchText from "./GlitchText";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const yearRef = useRef<HTMLSpanElement | null>(null);
  
  const [year, setYear] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  // Magnetic ref functions for interactive elements
  const magneticRefs = {
    top: useRef<HTMLButtonElement | null>(null),
    github: useRef<HTMLAnchorElement | null>(null),
    email: useRef<HTMLButtonElement | null>(null),
  };

  const handleScrollToTop = () => {
    const smoother = (window as any).ScrollSmoother?.get();
    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("agengp360@gmail.com");
    setToast("COPIED_TO_CLIPBOARD // agengp360@gmail.com");
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Year Counter Observer
  useEffect(() => {
    const yearEl = yearRef.current;
    if (!yearEl) return;

    const counterObj = { val: 0 };
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            gsap.to(counterObj, {
              val: 2026,
              duration: 2.5,
              ease: "power3.out",
              onUpdate: () => {
                setYear(Math.floor(counterObj.val));
              },
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(yearEl);
    return () => observer.disconnect();
  }, []);

  // Matrix Rain Canvas Animation (IntersectionObserver gated for performance)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const font = 10;
    let columns = 0;
    let rainDrops: number[] = [];
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/\\";
    const charArr = chars.split("");

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      columns = Math.floor(canvas.width / font);
      rainDrops = Array(columns)
        .fill(0)
        .map(() => Math.floor(Math.random() * -100)); // stagger drops
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let lastTime = 0;
    const fpsLimit = 20; // low FPS target to conserve CPU
    const interval = 1000 / fpsLimit;

    const draw = (timestamp: number) => {
      if (!ctx || !canvas) return;
      animationFrameId = requestAnimationFrame(draw);

      const delta = timestamp - lastTime;
      if (delta < interval) return;
      lastTime = timestamp - (delta % interval);

      // Fade out background to create a trailing effect
      ctx.fillStyle = "rgba(8, 8, 12, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 240, 255, 0.04)"; // very faint cyber-cyan rain
      ctx.font = `${font}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        if (rainDrops[i] >= 0) {
          const text = charArr[Math.floor(Math.random() * charArr.length)];
          ctx.fillText(text, i * font, rainDrops[i] * font);
        }

        if (rainDrops[i] * font > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    let observer: IntersectionObserver;
    let isVisible = false;

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!isVisible) {
                isVisible = true;
                animationFrameId = requestAnimationFrame(draw);
              }
            } else {
              isVisible = false;
              cancelAnimationFrame(animationFrameId);
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas.parentElement || canvas);
    } else {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Magnetic Button Effect — single useEffect for all magnetic elements
  // (previously a helper function calling useEffect = Rules of Hooks violation)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const magneticEntries: Array<{ ref: React.RefObject<HTMLElement | null>; strength: number }> = [
      { ref: magneticRefs.top as React.RefObject<HTMLElement | null>, strength: 0.4 },
      { ref: magneticRefs.github as React.RefObject<HTMLElement | null>, strength: 0.35 },
      { ref: magneticRefs.email as React.RefObject<HTMLElement | null>, strength: 0.35 },
    ];

    const cleanupFns: (() => void)[] = [];

    magneticEntries.forEach(({ ref, strength }) => {
      const el = ref.current;
      if (!el) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        gsap.to(el, {
          x: (e.clientX - centerX) * strength,
          y: (e.clientY - centerY) * strength,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      cleanupFns.push(() => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/10 bg-[#08080C] px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden font-sans animate-fade-in"
    >
      {/* Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Laser line top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent opacity-40 z-10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 font-mono text-xs text-text-secondary md:flex-row text-center md:text-left relative z-10">
        {/* Left Side: Name + Subtitle + Work Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal-cyan animate-pulse shadow-[0_0_8px_#00F0FF]" />
            <GlitchText
              text="CONSEP33T // AGENG PRAYOGA"
              className="font-bold text-white tracking-widest text-xs sm:text-sm"
            />
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500 font-jp tracking-widest">
            <DecryptedText text="ネオ東京 — 全システム正常稼働中" animateOn="view" speed={40} />
          </p>

          {/* Work Availability Badge */}
          <div className="mt-2 flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-3 py-1 text-[9px] uppercase tracking-widest text-green-400 font-bold shadow-[0_0_12px_rgba(34,197,94,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
            <span>AVAILABLE_FOR_WORK_2026</span>
          </div>
        </div>

        {/* Center: Scroll To Top Button (Magnetic) */}
        <button
          ref={magneticRefs.top}
          onClick={handleScrollToTop}
          data-cursor="hover"
          data-cursor-label="TOP_OF_PAGE"
          className="group inline-flex items-center gap-2 border border-signal-cyan/40 bg-signal-cyan/10 px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-signal-cyan hover:border-signal-cyan hover:bg-signal-cyan hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.15)] z-20"
          aria-label="Scroll back to top of the page"
        >
          <span>ASCEND_TO_TOP</span>
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </button>

        {/* Right Side: Links & Copier (Magnetic) */}
        <div className="flex flex-col items-center md:items-end gap-3 z-20">
          <div className="flex items-center gap-4 sm:gap-6 font-bold text-xs">
            <a
              ref={magneticRefs.github}
              href="https://github.com/Consep33t"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="GITHUB_PROFILE"
              className="transition-colors hover:text-signal-cyan inline-block py-1"
              aria-label="Visit Ageng's GitHub profile"
            >
              <DecryptedText text="GITHUB ↗" speed={40} animateOn="hover" />
            </a>
            
            <button
              ref={magneticRefs.email}
              onClick={handleCopyEmail}
              data-cursor="hover"
              data-cursor-label="COPY_EMAIL"
              className="transition-colors hover:text-signal-pink inline-block py-1 font-mono font-bold bg-transparent border-none cursor-pointer"
              aria-label="Copy email address to clipboard"
            >
              <DecryptedText text="EMAIL ✉" speed={40} animateOn="hover" />
            </button>
          </div>

          {/* Copyright Year Counter */}
          <div className="text-[9px] text-gray-600 font-mono tracking-wider">
            © <span ref={yearRef}>{year.toString().padStart(4, "0")}</span> CONSEP33T. ALL SYSTEM SECURED.
          </div>
        </div>
      </div>

      {/* Floating Clipboard Copy Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in font-mono text-[10px] sm:text-xs font-bold text-[#08080C] bg-signal-pink border border-signal-pink px-4 py-3 shadow-[0_0_20px_rgba(255,46,159,0.4)] transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full animate-ping" />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </footer>
  );
}

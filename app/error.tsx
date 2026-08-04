"use client";

import { useEffect, useRef } from "react";
import GlitchText from "@/components/GlitchText";
import DecryptedText from "@/components/DecryptedText";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas glitch scanline effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Random scanline glitch bars
      const numBars = Math.floor(Math.random() * 4);
      for (let i = 0; i < numBars; i++) {
        const y = Math.random() * canvas.height;
        const h = Math.random() * 4 + 1;
        ctx.fillStyle = `rgba(255, 0, 60, ${Math.random() * 0.12})`;
        ctx.fillRect(0, y, canvas.width, h);
      }

      // Chromatic aberration flicker strip
      if (Math.random() > 0.92) {
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(0, 240, 255, 0.06)`;
        ctx.fillRect(0, y, canvas.width, Math.random() * 8 + 2);
      }
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] text-white font-mono">
      {/* Glitch canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Red grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 0, 60, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 60, 0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Giant watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.025] select-none font-display font-black text-[20vw] text-signal-pink tracking-tight whitespace-nowrap">
        ERROR
      </div>

      {/* Main HUD panel */}
      <div className="z-10 w-full max-w-xl mx-4 glass-panel hud-bracket p-8 sm:p-10 border-signal-pink/60 shadow-[0_0_60px_rgba(255,0,60,0.2)] animate-fade-in">

        {/* Terminal header bar */}
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-signal-pink/30">
          <span className="w-2.5 h-2.5 rounded-full bg-signal-pink animate-pulse" />
          <span className="text-[10px] tracking-widest uppercase text-signal-pink font-bold">
            SYSTEM_CRITICAL_FAILURE // NODE_ERROR
          </span>
        </div>

        {/* Error code */}
        <div className="mb-6 text-center">
          <h1
            className="text-7xl sm:text-8xl font-black text-transparent drop-shadow-[0_0_30px_rgba(255,0,60,0.9)] mb-2"
            style={{ WebkitTextStroke: "2px #ff003c" }}
            aria-label="System Error"
          >
            <GlitchText text="SYS_ERR" isActive />
          </h1>
          <p className="font-mono text-sm text-gray-400 tracking-widest">
            <DecryptedText text="UNHANDLED_RUNTIME_EXCEPTION_DETECTED" animateOn="view" />
          </p>
        </div>

        {/* Terminal log block */}
        <div className="bg-black/60 border border-white/8 p-4 mb-6 text-left space-y-1.5 font-mono text-xs">
          <p className="text-gray-500">// SYSTEM_TRACE_LOG</p>
          <p>
            <span className="text-signal-cyan">ERROR_TYPE:</span>{" "}
            <span className="text-signal-pink font-bold">{error.name || "RuntimeError"}</span>
          </p>
          <p>
            <span className="text-signal-cyan">DIGEST:</span>{" "}
            <span className="text-gray-400">{error.digest ?? "UNCLASSIFIED"}</span>
          </p>
          <p>
            <span className="text-signal-cyan">MESSAGE:</span>{" "}
            <span className="text-signal-yellow break-words">
              {error.message || "An unexpected error occurred in the neural link."}
            </span>
          </p>
          <p className="text-green-400 animate-pulse">▌ AWAITING_OPERATOR_RESPONSE...</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-3 bg-signal-pink text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,0,60,0.4)] cursor-pointer text-sm"
            aria-label="Retry the failed operation"
          >
            ↺ RETRY_CONNECTION
          </button>
          <a
            href="/"
            className="flex-1 px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-sm text-center"
            aria-label="Return to home page"
          >
            ← RETURN_TO_BASE
          </a>
        </div>

      </div>
    </div>
  );
}

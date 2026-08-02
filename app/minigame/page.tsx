"use client";

import { useState, useEffect, useRef } from "react";
import { TransitionLink } from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";
import DecryptedText from "@/components/DecryptedText";

export default function MinigamePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetIdCounter = useRef(0);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  // Target spawner logic
  useEffect(() => {
    let spawner: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      spawner = setInterval(() => {
        setTargets((prev) => {
          if (prev.length > 5) return prev; // max 5 targets at a time
          targetIdCounter.current += 1;
          return [
            ...prev,
            {
              id: targetIdCounter.current,
              x: Math.random() * 80 + 10, // 10% to 90%
              y: Math.random() * 80 + 10,
            },
          ];
        });
      }, 800);
    }
    return () => clearInterval(spawner);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    targetIdCounter.current = 0;
  };

  const handleTargetClick = (id: number) => {
    if (!isPlaying) return;
    setScore((s) => s + 1);
    setTargets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen pt-24 pb-12 overflow-hidden flex flex-col items-center bg-[#050505]"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />

      <div className="z-10 w-full max-w-4xl px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase tracking-widest text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <GlitchText text="CYBER_BREACH" />
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-signal-cyan">
              <DecryptedText text="// protocol: intercept_data_packets" animateOn="view" speed={40} />
            </p>
          </div>
          <TransitionLink
            href="/"
            data-cursor="hover"
            className="font-mono text-xs tracking-widest text-text-secondary transition-colors hover:text-signal-pink"
          >
            ← ABORT_MISSION
          </TransitionLink>
        </div>

        {/* Game HUD */}
        <div className="flex justify-between border-b-2 border-signal-cyan pb-4 mb-8">
          <div className="font-mono text-xl text-white">
            <span className="text-signal-cyan">TIME:</span> {timeLeft}s
          </div>
          <div className="font-mono text-xl text-white">
            <span className="text-signal-pink">SCORE:</span> {score}
          </div>
        </div>

        {/* Game Area */}
        <div className="relative w-full h-[60vh] border border-white/10 bg-[#030303] overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.1)] cursor-crosshair group">
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-signal-cyan opacity-50 animate-[scan_3s_ease-in-out_infinite]" />

          {!isPlaying && timeLeft === 30 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
              <h2 className="font-display text-2xl text-white mb-6 tracking-widest"><GlitchText text="READY TO HACK?" /></h2>
              <button
                onClick={startGame}
                className="group/btn relative inline-flex items-center gap-4 overflow-hidden border border-signal-cyan/50 bg-signal-cyan/10 px-8 py-4 transition-all hover:border-signal-cyan hover:bg-signal-cyan/20"
                data-cursor="hover"
              >
                <span className="font-mono text-sm tracking-widest text-signal-cyan transition-colors group-hover/btn:text-white">
                  INITIALIZE_BREACH
                </span>
                <div className="absolute inset-0 -z-10 -translate-x-full bg-signal-cyan opacity-20 transition-transform duration-500 ease-out group-hover/btn:translate-x-0" />
              </button>
            </div>
          )}

          {!isPlaying && timeLeft === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20">
              <h2 className="font-display text-4xl text-signal-pink mb-2 tracking-widest"><GlitchText text="BREACH COMPLETE" /></h2>
              <p className="font-mono text-lg text-white mb-6 tracking-widest">FINAL SCORE: <span className="text-signal-cyan">{score}</span> PACKETS</p>
              <button
                onClick={startGame}
                className="group/btn relative inline-flex items-center gap-4 overflow-hidden border border-signal-cyan/50 bg-signal-cyan/10 px-8 py-4 transition-all hover:border-signal-cyan hover:bg-signal-cyan/20"
                data-cursor="hover"
              >
                <span className="font-mono text-sm tracking-widest text-signal-cyan transition-colors group-hover/btn:text-white">
                  RETRY_BREACH
                </span>
                <div className="absolute inset-0 -z-10 -translate-x-full bg-signal-cyan opacity-20 transition-transform duration-500 ease-out group-hover/btn:translate-x-0" />
              </button>
            </div>
          )}

          {/* Targets */}
          {targets.map((target) => (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target.id)}
              className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center cursor-crosshair z-10"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
            >
              <div className="absolute w-full h-full border-2 border-signal-pink rounded-sm animate-ping opacity-75" />
              <div className="relative w-6 h-6 bg-signal-pink rotate-45 hover:scale-125 transition-transform shadow-[0_0_15px_#ff003c]" />
              <div className="absolute -bottom-6 font-mono text-[10px] text-signal-pink">TARGET</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

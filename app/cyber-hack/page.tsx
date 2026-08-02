"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DecryptedText from "@/components/DecryptedText";
import SplitText from "@/components/SplitText";
import GlitchText from "@/components/GlitchText";
import Link from "next/link";

const TARGET_CODES = [
  "0XF2A",
  "YAKUZA",
  "NEON99",
  "CYBERPUNK",
  "OVERRIDE",
  "CONSEP33T"
];

export default function CyberHackMinigame() {
  const [level, setLevel] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"IDLE" | "HACKING" | "SUCCESS" | "FAILED">("IDLE");
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("CYBER_HACK_HIGH_SCORE");
    if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "HACKING" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && status === "HACKING") {
      setStatus("FAILED");
    }
    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  const startGame = () => {
    setLevel(0);
    setInput("");
    setTimeLeft(15);
    setScore(0);
    setStatus("HACKING");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setInput(val);
    
    if (val === TARGET_CODES[level]) {
      const addedScore = (level + 1) * 100 + timeLeft * 10;
      const newScore = score + addedScore;
      setScore(newScore);

      if (level === TARGET_CODES.length - 1) {
        setStatus("SUCCESS");
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("CYBER_HACK_HIGH_SCORE", newScore.toString());
        }
      } else {
        setLevel(prev => prev + 1);
        setInput("");
        setTimeLeft(prev => prev + 6); // bonus time
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030305] text-white font-mono p-6 sm:p-12 overflow-hidden flex flex-col items-center justify-center">
      {/* Background Cyber Matrix Grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Terminal HUD Box */}
      <div className={`z-10 w-full max-w-2xl glass-panel p-8 sm:p-10 hud-bracket transition-colors duration-500 ${
        status === "FAILED" ? "border-signal-pink/80 shadow-[0_0_50px_rgba(255,0,60,0.3)]" :
        status === "SUCCESS" ? "border-signal-yellow/80 shadow-[0_0_50px_rgba(252,238,10,0.3)]" :
        "border-signal-cyan/60 shadow-[0_0_40px_rgba(0,240,255,0.15)]"
      }`}>
        {/* Terminal Header */}
        <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-signal-cyan animate-pulse" />
            <SplitText text="CYBER_HACK_PROTOCOL_v3.0" className="text-signal-cyan text-lg sm:text-xl font-bold tracking-widest" />
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-400">HIGH_SCORE: <span className="text-signal-yellow font-bold">{highScore}</span></span>
            <span className="text-signal-pink font-bold bg-signal-pink/10 border border-signal-pink/30 px-2 py-0.5 animate-pulse">
              CLASSIFIED
            </span>
          </div>
        </div>

        {/* State 1: IDLE */}
        {status === "IDLE" && (
          <div className="flex flex-col items-center gap-8 py-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white tracking-widest">
                <GlitchText text="SYSTEM_ENCRYPTED" />
              </h2>
              <DecryptedText 
                text="Ketik kode override dengan cepat sebelum sistem mendeteksi penyusupan."
                className="text-gray-400 text-sm max-w-md"
                speed={30}
              />
            </div>

            <button 
              onClick={startGame}
              className="px-10 py-4 bg-signal-cyan text-black font-bold hover:bg-white transition-all uppercase tracking-widest cursor-pointer shadow-[0_0_20px_#00f0ff]"
            >
              INITIALIZE_OVERRIDE ⚡
            </button>
          </div>
        )}

        {/* State 2: HACKING */}
        {status === "HACKING" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
              <span className="text-gray-400">
                TARGET_STRING: <span className="text-signal-yellow font-bold text-lg tracking-widest ml-2">{TARGET_CODES[level]}</span>
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">TIME_LEFT:</span>
                <span className={`font-mono font-bold text-lg ${timeLeft <= 5 ? "text-signal-pink animate-bounce" : "text-signal-cyan"}`}>
                  T-{timeLeft}s
                </span>
              </div>
            </div>

            {/* Input field */}
            <div className="space-y-2">
              <label className="text-xs text-signal-cyan uppercase tracking-widest flex items-center justify-between">
                <span>// ENTER_MATCHING_CODE</span>
                <span>SCORE: {score}</span>
              </label>
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={handleInput}
                className="w-full bg-black/60 border-2 border-signal-cyan p-3 text-2xl text-white outline-none focus:border-signal-yellow focus:shadow-[0_0_20px_#fcee0a] uppercase tracking-widest font-bold"
                placeholder="TYPE HERE..."
                autoFocus
              />
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="h-3 w-full bg-black/80 border border-white/10 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-signal-cyan via-signal-yellow to-signal-pink"
                  initial={{ width: 0 }}
                  animate={{ width: `${((level + 1) / TARGET_CODES.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-[11px] flex justify-between text-gray-500 font-mono">
                <span>DECRYPTION_PROGRESS</span>
                <span>{level + 1} OF {TARGET_CODES.length} CODES</span>
              </div>
            </div>
          </div>
        )}

        {/* State 3: SUCCESS */}
        {status === "SUCCESS" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-8 text-center"
          >
            <div className="text-3xl sm:text-4xl font-black text-signal-yellow drop-shadow-[0_0_20px_#fcee0a]">
              MAINFRAME_BYPASSED
            </div>
            <DecryptedText text={`SISTEM BERHASIL DIRETAS! SCORE AKHIR: ${score}`} className="text-gray-300 font-bold" />

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <button 
                onClick={startGame} 
                className="px-6 py-3 border border-signal-yellow text-signal-yellow hover:bg-signal-yellow hover:text-black font-bold transition-all uppercase tracking-wider cursor-pointer"
              >
                REBOOT_HACK ↻
              </button>
              <Link href="/">
                <button className="px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black font-bold transition-all uppercase tracking-wider cursor-pointer">
                  RETURN_TO_BASE
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* State 4: FAILED */}
        {status === "FAILED" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-8 text-center"
          >
            <div className="text-3xl sm:text-4xl font-black text-signal-pink drop-shadow-[0_0_20px_rgba(255,0,60,0.8)]">
              SYSTEM_TRACE_LOCK
            </div>
            <DecryptedText text="WAKTU HABIS. SIGNAL TERLAJU DAN DIPUTUSKAN OLEH MAINFRAME." className="text-gray-400 text-sm" />
            <button 
              onClick={startGame}
              className="mt-2 px-8 py-3 bg-signal-pink text-black font-bold hover:bg-white transition-all uppercase tracking-widest cursor-pointer shadow-[0_0_20px_#ff003c]"
            >
              RETRY_OVERRIDE ⚡
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

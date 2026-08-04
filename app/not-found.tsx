"use client";

import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import DecryptedText from "@/components/DecryptedText";
import NeonKanji from "@/components/NeonKanji";

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] text-white font-sans">
      {/* Red grid background — pure CSS, no Framer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 0, 60, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 60, 0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Giant Kanji watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
        <NeonKanji text="四零四" className="text-[40vh]" />
      </div>

      {/* Main content — CSS animation instead of Framer Motion */}
      <div className="z-10 flex flex-col items-center gap-6 animate-fade-in">
        <h1
          className="text-8xl md:text-9xl font-black font-display text-transparent drop-shadow-[0_0_20px_rgba(255,0,60,0.8)]"
          style={{ WebkitTextStroke: "2px #ff003c" }}
          aria-label="404 — Page not found"
        >
          <GlitchText text="404" isActive={true} />
        </h1>

        <div className="bg-black/50 border border-[#ff003c]/40 px-8 py-4 backdrop-blur-sm text-center">
          <p className="font-mono text-xl tracking-widest text-signal-cyan uppercase mb-2">
            <DecryptedText text="TARGET_NOT_FOUND" animateOn="view" />
          </p>
          <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">
            The neural link you are looking for has been severed or never existed.
          </p>
        </div>

        <Link href="/" aria-label="Return to home page">
          <div className="mt-8 border-2 border-[#ff003c] px-8 py-3 font-mono text-sm uppercase tracking-widest text-white transition-all duration-300 hover:bg-[rgba(255,0,60,0.2)] hover:shadow-[0_0_20px_#ff003c] cursor-pointer active:scale-95">
            <DecryptedText text="RETURN_TO_BASE" animateOn="hover" />
          </div>
        </Link>
      </div>
    </div>
  );
}

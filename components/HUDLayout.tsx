"use client";

import { useState, useRef } from "react";
import BootSequence from "./BootSequence";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HUDLayout({ children }: { children: React.ReactNode }) {
  const [isBooted, setIsBooted] = useState(false);
  const hudRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isBooted && hudRef.current) {
      gsap.fromTo(
        hudRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power4.out", duration: 1 }
      );
    }
  }, { dependencies: [isBooted], scope: hudRef });

  return (
    <div className="relative min-h-screen bg-[#020204] text-gray-300 font-sans overflow-hidden">
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      
      <div ref={hudRef} className={isBooted ? "visible" : "invisible"}>
        {/* Background Grid & Noise */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.05) 2px, rgba(0,240,255,0.05) 4px)' }} />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)] opacity-50" />

        {/* Top HUD Bar */}
        <div className="fixed top-0 left-0 w-full h-10 border-b border-signal-cyan/20 bg-black/60 backdrop-blur-md z-50 flex items-center justify-between px-6 font-mono text-[10px] text-signal-cyan tracking-widest uppercase">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-signal-cyan rounded-full animate-pulse" /> SYSTEM STATUS: ONLINE</span>
            <span className="hidden sm:inline-block text-signal-pink">SECURE_CONNECTION</span>
          </div>
          <div className="flex items-center gap-4">
            <span>CURRENT NODE: PROJECTS</span>
            <span className="hidden sm:inline-block">V2.0_ULTIMATE</span>
          </div>
        </div>

        {/* Main Content Area */}
        <main id="main-content" className="relative z-10 pt-24 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
          {children}
        </main>

        {/* Bottom HUD Bar */}
        <div className="fixed bottom-0 left-0 w-full h-8 border-t border-signal-cyan/20 bg-black/60 backdrop-blur-md z-50 flex items-center justify-between px-6 font-mono text-[10px] text-gray-500 tracking-widest uppercase">
          <span>MEM_ALLOC: 4096MB</span>
          <span>LATENCY: 12ms</span>
          <span>TERMINAL_READY</span>
        </div>
      </div>
    </div>
  );
}

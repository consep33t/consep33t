"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./PageTransition";
import DecryptedText from "./DecryptedText";
import GlitchText from "./GlitchText";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "HOME", code: "01" },
  { href: "/projects", label: "PROJECTS", code: "02" },
  { href: "/minigame", label: "MINIGAME", code: "03" },
  { href: "/cyber-hack", label: "HACK", code: "04" },
  { href: "/profile", label: "PROFILE", code: "05" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTimeString(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08080C]/85 backdrop-blur-2xl transition-all duration-300">
      {/* Top laser scan line */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent opacity-60 animate-[laser_3s_linear_infinite]" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 font-sans">
        {/* Brand Logo */}
        <TransitionLink
          href="/"
          data-cursor="hover"
          data-cursor-label="GO_HOME"
          className="group relative flex items-center gap-3 font-display text-sm tracking-[0.2em] text-white"
        >
          <div className="relative flex h-9 w-9 items-center justify-center border border-signal-cyan/60 bg-signal-cyan/10 transition-colors duration-300 group-hover:border-signal-pink group-hover:bg-signal-pink/10">
            <span className="font-mono text-xs font-bold text-signal-cyan group-hover:text-signal-pink">C33</span>
            <div className="absolute -top-1 -left-1 h-1.5 w-1.5 bg-signal-cyan" />
            <div className="absolute -bottom-1 -right-1 h-1.5 w-1.5 bg-signal-pink" />
          </div>
          <div className="flex flex-col">
            <GlitchText text="CONSEP33T" className="font-black text-base text-white tracking-widest" />
            <span className="font-mono text-[9px] text-signal-cyan tracking-widest font-bold">// AGENG.PRAYOGA</span>
          </div>
        </TransitionLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 border border-white/10 bg-black/60 backdrop-blur-md rounded-full shadow-inner">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                data-cursor="hover"
                data-cursor-label={`NAV // ${link.label}`}
                className={`relative px-4 py-1.5 font-mono text-[11px] tracking-widest transition-all duration-300 rounded-full flex items-center gap-1.5 ${
                  isActive
                    ? "text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.7)]"
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-signal-cyan via-white to-signal-cyan rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className={`text-[9px] ${isActive ? "text-black/70" : "text-signal-pink font-bold"}`}>{link.code}</span>
                <span>{link.label}</span>
              </TransitionLink>
            );
          })}
        </div>

        {/* HUD Telemetry Status */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] text-text-secondary">
          <div className="flex items-center gap-2 border-r border-white/10 pr-6">
            <span className="h-2 w-2 rounded-full bg-signal-green animate-pulse shadow-[0_0_8px_#00ff66]" />
            <span className="text-gray-400">SYS_TIME:</span>
            <span className="text-white font-bold">{timeString || "12:00:00"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-signal-cyan font-bold">LINK:</span>
            <span className="text-white">100%</span>
            <span className="text-signal-pink font-bold ml-2">OVERRIDE:</span>
            <span className="text-signal-green font-bold">ACTIVE</span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col gap-1.5 md:hidden p-2.5 border border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan hover:border-signal-pink hover:text-signal-pink transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <div className={`h-0.5 w-6 bg-current transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`h-0.5 w-6 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <div className={`h-0.5 w-6 bg-current transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-signal-cyan/30 bg-[#08080C]/95 backdrop-blur-2xl px-6 py-6 space-y-4"
          >
            {NAV_LINKS.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 border font-mono text-sm tracking-widest transition-colors ${
                  pathname === link.href
                    ? "border-signal-cyan bg-signal-cyan/10 text-signal-cyan font-bold shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                    : "border-white/10 text-gray-400 hover:border-signal-pink hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-signal-pink font-bold">// {link.code}</span>
              </TransitionLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "./PageTransition";
import GlitchText from "./GlitchText";

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
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileMenuOpen]);

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTimeString(`${h}:${m}:${s}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      ref={menuRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#08080C]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "border-b border-transparent bg-[#08080C]/60 backdrop-blur-md"
      }`}
    >
      {/* Laser scan top */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent opacity-60 animate-[laser_3s_linear_infinite]" />

      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5"
      >
        {/* Brand */}
        <TransitionLink
          href="/"
          data-cursor="hover"
          data-cursor-label="GO_HOME"
          className="group relative flex items-center gap-2 sm:gap-3 font-display text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-white min-w-0"
          aria-label="Consep33t — Go to homepage"
        >
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center border border-signal-cyan/60 bg-signal-cyan/10 transition-colors duration-300 group-hover:border-signal-pink group-hover:bg-signal-pink/10">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-signal-cyan group-hover:text-signal-pink">C33</span>
            <div className="absolute -top-1 -left-1 h-1.5 w-1.5 bg-signal-cyan" />
            <div className="absolute -bottom-1 -right-1 h-1.5 w-1.5 bg-signal-pink" />
          </div>
          <div className="flex flex-col min-w-0">
            <GlitchText text="CONSEP33T" className="font-black text-xs sm:text-base text-white tracking-wider sm:tracking-widest truncate" />
            <span className="font-mono text-[8px] sm:text-[9px] text-signal-cyan tracking-wider font-bold truncate">// AGENG.PRAYOGA</span>
          </div>
        </TransitionLink>

        {/* Desktop nav pill */}
        <div
          className="hidden md:flex items-center gap-1 p-1 border border-white/10 bg-black/60 backdrop-blur-md rounded-full shadow-inner"
          role="menubar"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                role="menuitem"
                data-cursor="hover"
                data-cursor-label={`NAV // ${link.label}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3.5 py-1.5 font-mono text-[11px] tracking-widest transition-all duration-300 rounded-full flex items-center gap-1.5 ${
                  isActive
                    ? "text-black font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active indicator — CSS-only pill, no framer-motion */}
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-signal-cyan via-white to-signal-cyan rounded-full -z-10 transition-all duration-300" />
                )}
                <span className={`text-[9px] ${isActive ? "text-black/70" : "text-signal-pink font-bold"}`}>{link.code}</span>
                <span>{link.label}</span>
              </TransitionLink>
            );
          })}
        </div>

        {/* HUD telemetry */}
        <div className="hidden lg:flex items-center gap-5 font-mono text-[10px] text-gray-500">
          <div className="flex items-center gap-2 border-r border-white/10 pr-5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-pulse shadow-[0_0_6px_#00ff66]" />
            <span className="text-gray-500">SYS:</span>
            <span className="text-white font-bold tabular-nums">{timeString || "00:00:00"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-signal-cyan font-bold">LINK:</span>
            <span className="text-white">100%</span>
            <span className="text-signal-pink font-bold ml-1">OVERRIDE:</span>
            <span className="text-signal-green font-bold">ACTIVE</span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="flex flex-col justify-center items-center gap-[5px] md:hidden p-2.5 w-10 h-10 border border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan hover:border-signal-pink hover:text-signal-pink transition-colors cursor-pointer shrink-0"
          aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
        >
          <div className={`h-[2px] w-5 bg-current transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <div className={`h-[2px] w-5 bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <div className={`h-[2px] w-5 bg-current transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Drawer — CSS transition, no framer-motion */}
      <div
        id="mobile-nav-menu"
        aria-hidden={!mobileMenuOpen}
        className={`md:hidden border-t border-signal-cyan/20 bg-[#06060A]/98 backdrop-blur-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {NAV_LINKS.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <div
                key={link.href}
                className="transition-all duration-200"
                style={{
                  transitionDelay: mobileMenuOpen ? `${i * 50}ms` : "0ms",
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(-12px)",
                }}
              >
                <TransitionLink
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between p-3.5 border font-mono text-sm tracking-widest transition-all duration-300 rounded-sm active:scale-[0.98] ${
                    isActive
                      ? "border-signal-cyan bg-signal-cyan/10 text-signal-cyan font-bold shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                      : "border-white/10 text-gray-400 hover:border-signal-pink/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[10px] font-bold ${isActive ? "text-signal-cyan" : "text-signal-pink"}`}>
                      {link.code}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <span className={`text-base transition-transform duration-300 ${isActive ? "translate-x-0 text-signal-cyan" : "-translate-x-1 text-gray-600"}`}>→</span>
                </TransitionLink>
              </div>
            );
          })}

          {/* Mobile HUD status */}
          <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-gray-600 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
              {timeString}
            </span>
            <span className="text-signal-cyan">OVERRIDE: ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}

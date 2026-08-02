"use client";

import DecryptedText from './DecryptedText';
import GlitchText from './GlitchText';

export default function Footer() {
  const handleScrollToTop = () => {
    // If GSAP ScrollSmoother is active, use it. Otherwise fallback to window.scrollTo
    const smoother = (window as any).ScrollSmoother?.get();
    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#08080C] px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden font-sans">
      {/* Laser line top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal-cyan to-transparent opacity-40" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:gap-6 font-mono text-xs text-text-secondary md:flex-row text-center md:text-left">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal-cyan animate-pulse shadow-[0_0_8px_#00F0FF]" />
            <GlitchText text="CONSEP33T // AGENG PRAYOGA" className="font-bold text-white tracking-widest text-xs sm:text-sm" />
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-500 font-jp tracking-widest">
            <DecryptedText text="ネオ東京 — 全システム正常稼働中" animateOn="view" speed={40} />
          </p>
        </div>

        {/* Center Scroll To Top Button */}
        <button
          onClick={handleScrollToTop}
          data-cursor="hover"
          data-cursor-label="TOP_OF_PAGE"
          className="group inline-flex items-center gap-2 border border-signal-cyan/40 bg-signal-cyan/10 px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-signal-cyan hover:border-signal-cyan hover:bg-signal-cyan hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.15)]"
        >
          <span>ASCEND_TO_TOP</span>
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </button>

        {/* Right Links */}
        <div className="flex items-center gap-4 sm:gap-6 font-bold text-xs">
          <a
            href="https://github.com/Consep33t"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="GITHUB_PROFILE"
            className="transition-colors hover:text-signal-cyan"
          >
            <DecryptedText text="GITHUB ↗" speed={40} animateOn="hover" />
          </a>
          <a
            href="mailto:agengp360@gmail.com"
            data-cursor="hover"
            data-cursor-label="SEND_EMAIL"
            className="transition-colors hover:text-signal-pink"
          >
            <DecryptedText text="EMAIL ✉" speed={40} animateOn="hover" />
          </a>
        </div>
      </div>
    </footer>
  );
}

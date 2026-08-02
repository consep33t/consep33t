"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import GlitchText from "./GlitchText";
import DecryptedText from "./DecryptedText";

const CONTACT_LINKS = [
  { name: "DIRECT_EMAIL", value: "agengp360@gmail.com", href: "mailto:agengp360@gmail.com", icon: "✉️", color: "border-signal-cyan" },
  { name: "WHATSAPP_LINE", value: "+62 857-6776-7728", href: "https://wa.me/6285767767728", icon: "💬", color: "border-signal-green" },
  { name: "LINKEDIN_NEXUS", value: "linkedin.com/in/ageng-prayoga-789b652a9", href: "https://linkedin.com/in/ageng-prayoga-789b652a9", icon: "💼", color: "border-signal-cyan" },
  { name: "GITHUB_REPOS", value: "github.com/Consep33t", href: "https://github.com/Consep33t", icon: "💻", color: "border-signal-pink" },
  { name: "LOCATION", value: "Medan, Indonesia", href: "https://maps.google.com/?q=Medan,Indonesia", icon: "📍", color: "border-signal-yellow" },
  { name: "PHONE_CALL", value: "+62 857-6776-7728", href: "tel:+6285767767728", icon: "📞", color: "border-signal-cyan" },
];

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("agengp360@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(itemsRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="mx-auto max-w-6xl px-6 py-28 sm:px-12 relative font-sans">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-signal-pink/10 blur-[120px] pointer-events-none" />
      
      {/* Section Header */}
      {/* Header */}
      <div className="mb-10 sm:mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-signal-pink uppercase tracking-widest mb-3">
          <span className="h-2 w-2 rounded-full bg-signal-pink animate-pulse" />
          <span>// COMMS_LINK</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white break-words">
          <GlitchText text="INITIATE_CONTACT" />
        </h2>
      </div>

      {/* Copy Email Quick Banner */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 glass-panel hud-bracket flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-signal-cyan/40">
        <div>
          <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-bold mb-1">
            // QUICK_DISPATCH_PROTOCOL
          </span>
          <span className="font-sans text-xs sm:text-sm text-gray-300">
            Ingin diskusi proyek atau kolaborasi? Salin alamat email langsung.
          </span>
        </div>

        <button
          onClick={handleCopyEmail}
          className="font-mono text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 bg-signal-cyan text-black hover:bg-white transition-all shadow-[0_0_15px_#00f0ff] flex items-center justify-center gap-2 shrink-0 cursor-pointer w-full sm:w-auto"
        >
          <span>{copiedEmail ? "EMAIL_COPIED! ✓" : "COPY_EMAIL_ADDRESS 📋"}</span>
        </button>
      </div>

      {/* Grid Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CONTACT_LINKS.map((link, idx) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              if (el) itemsRef.current[idx] = el;
            }}
            className="glass-panel p-4 sm:p-6 hud-bracket flex items-start gap-3 sm:gap-4 hover:border-signal-pink hover:shadow-[0_0_25px_rgba(255,0,60,0.25)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110 shrink-0">
              {link.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-1 group-hover:text-signal-yellow transition-colors truncate">
                {link.name}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-white font-bold truncate group-hover:text-signal-pink transition-colors">
                <DecryptedText text={link.value} animateOn="hover" speed={30} />
              </p>
            </div>

            <span className="font-mono text-xs text-gray-600 group-hover:text-signal-pink group-hover:translate-x-1 transition-all shrink-0">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

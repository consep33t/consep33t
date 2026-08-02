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
      <div className="mb-12 border-b border-white/10 pb-6 relative">
        <div className="absolute -left-6 top-1 w-1.5 h-full bg-signal-pink shadow-[0_0_15px_#ff003c]" />
        
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-signal-pink mb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-signal-pink inline-block animate-pulse rounded-full shadow-[0_0_10px_#ff003c]" />
            <DecryptedText text="// SECURE_COMMS_HUB" animateOn="view" speed={40} />
          </p>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-signal-cyan bg-signal-cyan/10 border border-signal-cyan/30 px-3 py-1">
            <span className="w-1.5 h-1.5 bg-signal-cyan rounded-full animate-ping" />
            <span>ENCRYPTED_256BIT_SSL</span>
          </div>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]">
          <GlitchText text="ESTABLISH_CONNECTION" />
        </h2>
      </div>

      {/* Copy Email Quick Banner */}
      <div className="mb-8 p-4 glass-panel hud-bracket flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-signal-cyan/40">
        <div>
          <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-bold mb-1">
            // QUICK_DISPATCH_PROTOCOL
          </span>
          <span className="font-sans text-sm text-gray-300">
            Ingin diskusi proyek atau kolaborasi? Salin alamat email langsung.
          </span>
        </div>

        <button
          onClick={handleCopyEmail}
          className="font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-signal-cyan text-black hover:bg-white transition-all shadow-[0_0_15px_#00f0ff] flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>{copiedEmail ? "EMAIL_COPIED! ✓" : "COPY_EMAIL_ADDRESS 📋"}</span>
        </button>
      </div>

      {/* Grid Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONTACT_LINKS.map((link, idx) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              if (el) itemsRef.current[idx] = el;
            }}
            className="glass-panel p-6 hud-bracket flex items-start gap-4 hover:border-signal-pink hover:shadow-[0_0_25px_rgba(255,0,60,0.25)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
              {link.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1 group-hover:text-signal-yellow transition-colors">
                {link.name}
              </h3>
              <p className="font-mono text-sm text-white font-bold truncate group-hover:text-signal-pink transition-colors">
                <DecryptedText text={link.value} animateOn="hover" speed={30} />
              </p>
            </div>

            <span className="font-mono text-xs text-gray-600 group-hover:text-signal-pink group-hover:translate-x-1 transition-all">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import type { GitHubRepo } from "@/lib/github";

gsap.registerPlugin(ScrollTrigger);
import DecryptedText from "./DecryptedText";

interface PaginatedProjectsProps {
  repos: GitHubRepo[];
}

const ITEMS_PER_PAGE = 4;

export default function PaginatedProjects({ repos }: PaginatedProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);
  const currentRepos = repos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Initial mount animation & Parallax
  useGSAP(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const wrappers = gsap.utils.toArray<HTMLElement>('.gsap-parallax-wrapper');
    if (wrappers.length > 0) {
      // 1. Entrance animation using ScrollTrigger.batch
      gsap.set(wrappers, { opacity: 0, y: 80, scale: 0.8, rotationX: -30, transformPerspective: 1000 });
      ScrollTrigger.batch(wrappers, {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, scale: 1, rotationX: 0, stagger: 0.15, duration: 1.0, ease: "power3.out", overwrite: "auto" }),
        start: "top 90%"
      });

      // 2. Continuous scroll parallax logic
      wrappers.forEach((wrapper, i) => {
        const speed = i % 2 === 0 ? 0.95 : 1.05; // Alternate speeds
        gsap.to(wrapper, {
          yPercent: (speed - 1) * -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }
  }, { scope: containerRef });

  const scrollToSection = () => {
    // Scroll the projects section into view — works with and without ScrollSmoother,
    // on mobile and desktop, without relying on window globals.
    if (containerRef.current) {
      const yOffset = -80; // offset for fixed header height
      const y =
        containerRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  const paginate = (newPage: number) => {
    if (newPage === currentPage || isAnimating || newPage < 1 || newPage > totalPages) return;

    setIsAnimating(true);
    const direction = newPage > currentPage ? 1 : -1;

    const ctx = gsap.context(() => {
      const elements = itemsRef.current?.children;
      if (!elements) {
        // No children yet — just flip page
        setCurrentPage(newPage);
        setIsAnimating(false);
        scrollToSection();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // 1. Commit the new page FIRST
          setCurrentPage(newPage);
          // 2. Then scroll — after React has painted new content
          requestAnimationFrame(() => scrollToSection());
        },
      });

      Array.from(elements).forEach((el, index) => {
        tl.to(
          el,
          {
            opacity: 0,
            x: -160 * direction,
            scale: 0.85,
            filter: "blur(8px)",
            duration: 0.35,
            ease: "power2.in",
          },
          index * 0.07
        );
      });
    }, containerRef);

    return () => ctx.revert();
  };

  // Enter animation — runs whenever currentPage changes AND isAnimating is true
  useEffect(() => {
    if (!isAnimating || !hasMounted.current) return;

    const ctx = gsap.context(() => {
      const elements = itemsRef.current?.children;
      if (!elements) return;

      // Determine direction from previous render — we store it in a ref below
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          x: 160,       // always slide in from the right (fresh content coming in)
          scale: 0.85,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => setIsAnimating(false),
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps
  // NOTE: intentionally only watches currentPage so enter anim fires after state commit

  if (repos.length === 0) {
    return (
      <div className="glass-panel p-6 font-mono text-sm text-signal-pink border-signal-pink/40 animate-pulse">
        [!] SYSTEM_WARNING: NO_PROJECTS_FOUND_IN_ARCHIVE
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-10 font-sans">
      {repos[0]?.id === 1 && (
        <div className="glass-panel p-4 font-mono text-xs text-signal-cyan border-signal-cyan/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal-cyan animate-ping" />
          <span>[INFO] DEMO_DATA_ACTIVE // GitHub API Fallback Mode</span>
        </div>
      )}

      {/* Projects Grid Container */}
      <div className="hud-card relative p-4 sm:p-8 rounded-sm backdrop-blur-sm bg-[rgba(10,10,12,0.6)] border border-[rgba(0,243,255,0.2)]">
        {/* Corner Brackets from globals.css */}
        <div className="corner-tl" />
        <div className="corner-tr" />
        <div className="corner-bl" />
        <div className="corner-br" />

        <div className="absolute -top-3 left-8 bg-[#050508] px-2 font-mono text-[10px] text-signal-cyan tracking-widest border border-signal-cyan/30">
          [ARCHIVE_NODE_ACCESS]
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 relative z-10">
          {currentRepos.map((repo) => (
            <div key={repo.id} className="gsap-parallax-wrapper h-full">
              <ProjectCard repo={repo} />
            </div>
          ))}
        </div>
      </div>

      {/* Redesigned Cyberpunk Pagination Dock */}
      {totalPages > 1 && (
        <div className="glass-panel p-4 hud-bracket flex flex-col sm:flex-row items-center justify-between gap-4 border-signal-cyan/40 mt-6 shadow-[0_0_25px_rgba(0,240,255,0.1)]">
          {/* PREV BUTTON */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || isAnimating}
            className="group relative inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 border border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan transition-all duration-300 hover:border-signal-cyan hover:bg-signal-cyan hover:text-black hover:shadow-[0_0_20px_#00F0FF] disabled:opacity-30 disabled:pointer-events-none cursor-pointer w-full sm:w-auto justify-center"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
            <span>PREV_CHUNK</span>
          </button>

          {/* PAGE CHUNK TELEMETRY */}
          <div className="font-mono text-xs tracking-widest text-white flex items-center gap-3 bg-black/60 border border-white/10 px-5 py-2">
            <span className="w-2 h-2 bg-signal-yellow rounded-full animate-pulse" />
            <DecryptedText
              text={`BLOCK [ ${currentPage.toString().padStart(2, '0')} / ${totalPages.toString().padStart(2, '0')} ]`}
              animateOn="hover"
              speed={30}
            />
          </div>

          {/* NEXT BUTTON */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || isAnimating}
            className="group relative inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 border border-signal-pink/40 bg-signal-pink/10 text-signal-pink transition-all duration-300 hover:border-signal-pink hover:bg-signal-pink hover:text-black hover:shadow-[0_0_20px_#FF2E9F] disabled:opacity-30 disabled:pointer-events-none cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>NEXT_CHUNK</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </button>
        </div>
      )}
    </div>
  );
}

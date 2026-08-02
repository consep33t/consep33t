"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

const roles = [
  "Fullstack Engineer",
  "Network Administrator",
  "Server Admin",
  "IoT Engineer",
];

export default function TypingRole() {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current) return;

    const ctx = gsap.context(() => {
      // Cursor blink animation
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power2.inOut",
      });

      const masterTl = gsap.timeline({ repeat: -1 });

      roles.forEach((role) => {
        const tl = gsap.timeline();
        tl.to(textRef.current, {
          duration: role.length * 0.1,
          text: role,
          ease: "none",
        })
          .to({}, { duration: 1.5 }) // Wait
          .to(textRef.current, {
            duration: role.length * 0.05,
            text: "",
            ease: "none",
          });
        
        masterTl.add(tl);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center text-lg sm:text-xl font-mono text-signal-cyan mt-2 h-8">
      <span className="text-text-secondary mr-2">{">"}</span>
      <span ref={textRef} className="font-bold tracking-widest text-signal-cyan shadow-[0_0_8px_var(--color-signal-cyan)]"></span>
      <span ref={cursorRef} className="inline-block w-2 h-5 bg-signal-cyan ml-1 shadow-[0_0_8px_var(--color-signal-cyan)]"></span>
    </div>
  );
}

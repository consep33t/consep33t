"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import DecryptedText from "./DecryptedText";
import GlitchText from "./GlitchText";

type GatePhase = "idle" | "closing" | "opening";

interface TransitionContextValue {
  runTransition: (action: () => void, targetUrl?: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useGateTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error(
      "useGateTransition harus dipakai di dalam <PageTransitionProvider>"
    );
  }
  return ctx;
}

const GATE_MS = 600;
const HOLD_MS = 250;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<GatePhase>("idle");
  const [targetPath, setTargetPath] = useState("");
  const pathname = usePathname();

  const runTransition = useCallback(
    (action: () => void, targetUrl?: string) => {
      if (phase !== "idle") return;
      setTargetPath(targetUrl || "");
      setPhase("closing");

      window.setTimeout(() => {
        action();
        window.setTimeout(() => {
          window.scrollTo(0, 0);
          setPhase("opening");
          window.setTimeout(() => setPhase("idle"), GATE_MS);
        }, HOLD_MS);
      }, GATE_MS);
    },
    [phase]
  );

  return (
    <TransitionContext.Provider value={{ runTransition }}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-black/50 backdrop-blur-md">
            <motion.div
              className="absolute inset-0 bg-[#020204] border-b-[3px] border-signal-pink shadow-[0_5px_40px_rgba(255,46,159,0.3)] origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: phase === "opening" ? 0 : 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: GATE_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* CRT Scanline background for transition */}
              <div className="absolute inset-0 scanline-bg opacity-30" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {phase === "closing" && (
                  <div className="flex flex-col items-center gap-4 bg-black/80 p-8 rounded-lg backdrop-blur-md border border-signal-pink/30 shadow-[0_0_20px_rgba(255,46,159,0.2)]">
                    <div className="font-orbitron text-xs md:text-sm text-signal-pink tracking-[0.3em] font-bold">
                      <DecryptedText text={`INITIALIZING SYSTEM TRANSFER //`} animateOn="view" speed={20} />
                    </div>
                    <div className="font-mono text-xs text-signal-cyan">
                      <DecryptedText text={`TARGET NODE: ${targetPath || pathname}`} animateOn="view" speed={30} />
                    </div>
                    <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden mt-4">
                       <motion.div 
                         className="absolute top-0 left-0 h-full bg-signal-pink shadow-[0_0_15px_#FF2E9F]"
                         initial={{ width: "0%" }}
                         animate={{ width: "100%" }}
                         transition={{ duration: (GATE_MS + HOLD_MS) / 1000, ease: "linear" }}
                       />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

interface TransitionLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
}

export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const { runTransition } = useGateTransition();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        runTransition(() => {
          router.push(href);
        }, href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

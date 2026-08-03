"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

type GatePhase = "idle" | "closing" | "opening";

interface TransitionContextValue {
  runTransition: (action: () => void, targetUrl?: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useGateTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useGateTransition harus dipakai di dalam <PageTransitionProvider>");
  }
  return ctx;
}

const GATE_MS = 550;
const HOLD_MS = 200;

// Cyberpunk diagonal wipe panels
const PANEL_COUNT = 5;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<GatePhase>("idle");
  const [targetPath, setTargetPath] = useState("");

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
          <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Multi-panel diagonal reveal — cyberpunk style */}
            {Array.from({ length: PANEL_COUNT }).map((_, i) => {
              const colors = [
                "bg-[#020204]",
                "bg-[#050510]",
                "bg-[#020204]",
                "bg-[#050510]",
                "bg-[#020204]",
              ];
              const delay = i * 0.06;

              return (
                <motion.div
                  key={i}
                  className={`absolute top-0 ${colors[i]}`}
                  style={{
                    left: `${(i / PANEL_COUNT) * 100}%`,
                    width: `${100 / PANEL_COUNT + 2}%`,
                    height: "100%",
                    transformOrigin: "top",
                    clipPath: i % 2 === 0
                      ? "polygon(0 0, 100% 0, 95% 100%, 0% 100%)"
                      : "polygon(5% 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: phase === "opening" ? 0 : 1,
                  }}
                  exit={{ scaleY: 0 }}
                  transition={{
                    duration: GATE_MS / 1000,
                    delay,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              );
            })}

            {/* Center HUD overlay — only during closing phase */}
            {phase === "closing" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex flex-col items-center gap-3 px-8 py-6 border border-signal-cyan/30 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.15)] rounded-sm">
                  {/* Glitch bars */}
                  <div className="flex gap-1 mb-1">
                    {[...Array(6)].map((_, j) => (
                      <motion.div
                        key={j}
                        className="h-5 bg-signal-cyan"
                        style={{ width: `${Math.random() * 20 + 8}px` }}
                        animate={{ scaleY: [1, 0.3, 1, 0.6, 1], opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 0.3, delay: j * 0.05 }}
                      />
                    ))}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-signal-cyan tracking-[0.35em] uppercase font-bold">
                    TRANSFERRING NODE
                  </div>
                  <div className="font-mono text-[9px] text-signal-pink/70 tracking-widest truncate max-w-[200px]">
                    {targetPath || "/"}
                  </div>
                  {/* Progress */}
                  <div className="w-48 h-[2px] bg-white/10 overflow-hidden rounded-full mt-1">
                    <motion.div
                      className="h-full bg-gradient-to-r from-signal-cyan to-signal-pink shadow-[0_0_10px_#00F0FF]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: (GATE_MS + HOLD_MS) / 1000, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
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
  ref,
  ...rest
}: TransitionLinkProps & { ref?: React.Ref<HTMLAnchorElement> }) {
  const router = useRouter();
  const { runTransition } = useGateTransition();

  return (
    <a
      href={href}
      ref={ref}
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

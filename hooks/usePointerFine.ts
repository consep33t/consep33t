"use client";

import { useState, useEffect } from "react";

/**
 * Returns true if the device has a fine pointer (mouse/trackpad).
 * Returns false for touch/coarse-pointer devices (mobile, tablet).
 *
 * Useful for gating heavy effects like SplashCursor, tilt, particle fields.
 */
export function usePointerFine(): boolean {
  const [isFine, setIsFine] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setIsFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isFine;
}

export default usePointerFine;

import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScrambleText(
  finalText: string,
  durationMs: number = 800,
  shouldSkip: boolean = false
) {
  const [displayText, setDisplayText] = useState(shouldSkip ? finalText : '');
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldSkip) {
      setDisplayText(finalText);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }
    
    startTimeRef.current = null;

    const animate = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time;
      }
      
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      
      const revealCount = Math.floor(progress * finalText.length);
      
      let currentText = finalText.substring(0, revealCount);
      for (let i = revealCount; i < finalText.length; i++) {
        if (finalText[i] === ' ') {
          currentText += ' ';
        } else {
          currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayText(currentText);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(finalText);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [finalText, durationMs, shouldSkip]);

  return displayText;
}

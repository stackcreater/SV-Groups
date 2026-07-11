"use client";

import { useEffect, useState } from "react";

export default function TypewriterHeading() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState(0); // 0 = typing "WE BUILD", 1 = typing "DIGITAL EXPERIENCES", 2 = complete

  const fullText1 = "WE BUILD";
  const fullText2 = "DIGITAL EXPERIENCES";

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (phase === 0) {
      let i = 0;
      const interval = setInterval(() => {
        setText1(fullText1.slice(0, i + 1));
        i++;
        if (i >= fullText1.length) {
          clearInterval(interval);
          setTimeout(() => setPhase(1), 350); // small delay before starting second line
        }
      }, 120);
      return () => clearInterval(interval);
    } else if (phase === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setText2(fullText2.slice(0, i + 1));
        i++;
        if (i >= fullText2.length) {
          clearInterval(interval);
          setPhase(2);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight flex flex-col items-center justify-center gap-1 min-h-[140px] md:min-h-[190px]">
      <span className="relative flex items-center justify-center">
        {text1}
        {phase === 0 && (
          <span
            className={`inline-block w-[4px] h-[1em] bg-slate-900 dark:bg-white ml-2 align-middle transition-opacity duration-100 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-neon dark:to-purple-neon relative flex items-center justify-center min-h-[1.2em]">
        {text2}
        {(phase === 1 || phase === 2) && (
          <span
            className={`inline-block w-[4px] h-[0.9em] bg-cyan-600 dark:bg-cyan-neon ml-2 align-middle transition-opacity duration-100 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </span>
    </h1>
  );
}

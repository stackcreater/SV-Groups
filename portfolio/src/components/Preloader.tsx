"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ShortSlideDown from "@/components/animata/text/short-slide-down";
import "./ChipLoader.css";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showChip, setShowChip] = useState(false);

  useEffect(() => {
    // Reset loader states on path change
    setLoading(true);
    setShowChip(false);

    // After 500ms, fade in the chip loader
    const chipTimer = setTimeout(() => {
      setShowChip(true);
    }, 500);

    // After 1800ms, hide the preloader entirely to reveal the page
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(chipTimer);
      clearTimeout(loaderTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-colors duration-300"
        >
          {/* Main loader wrapper */}
          <div className="relative flex flex-col items-center justify-center w-full h-full max-w-4xl px-4">
            
            {/* Logo Text Section: starts immediately */}
            <div className="flex flex-col items-center text-center z-10 mb-8 select-none w-full">
              <ShortSlideDown
                phrases={[["STACK CREATORS"]]}
                className="h-16 w-full"
                titleClassName="text-3xl md:text-5xl font-extrabold tracking-wider text-slate-900 dark:text-white"
              />
              
              <ShortSlideDown
                phrases={[["Web & App Studio"]]}
                className="h-8 w-full mt-2"
                titleClassName="text-[0.75rem] md:text-xs uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-neon font-semibold"
              />
            </div>

            {/* Chip Circuit Loader: fades in after a brief delay */}
            <div className="relative w-full flex items-center justify-center overflow-hidden">
              <AnimatePresence>
                {showChip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="chip-loader w-full pointer-events-none select-none"
                  >
                    <div className="chip-loader__svg-wrap mx-auto">
                      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="chipGradient" x1={0} y1={0} x2={0} y2={1}>
                            <stop offset="0%" stopColor="#2d2d2d" />
                            <stop offset="100%" stopColor="#0f0f0f" />
                          </linearGradient>
                          <linearGradient id="textGradient" x1={0} y1={0} x2={0} y2={1}>
                            <stop offset="0%" stopColor="#eeeeee" />
                            <stop offset="100%" stopColor="#888888" />
                          </linearGradient>
                          <linearGradient id="pinGradient" x1={1} y1={0} x2={0} y2={0}>
                            <stop offset="0%" stopColor="#bbbbbb" />
                            <stop offset="50%" stopColor="#888888" />
                            <stop offset="100%" stopColor="#555555" />
                          </linearGradient>
                        </defs>

                        {/* Circuit traces */}
                        <g id="traces">
                          {/* Left traces */}
                          <path d="M100 100 H200 V210 H326" className="trace-bg" />
                          <path d="M100 100 H200 V210 H326" className="trace-flow blue2" />
                          <path d="M80 180 H180 V230 H326" className="trace-bg" />
                          <path d="M80 180 H180 V230 H326" className="trace-flow blue" />
                          <path d="M60 260 H150 V250 H326" className="trace-bg" />
                          <path d="M60 260 H150 V250 H326" className="trace-flow blue2" />
                          <path d="M100 350 H200 V270 H326" className="trace-bg" />
                          <path d="M100 350 H200 V270 H326" className="trace-flow blue" />

                          {/* Right traces */}
                          <path d="M700 90 H560 V210 H474" className="trace-bg" />
                          <path d="M700 90 H560 V210 H474" className="trace-flow blue" />
                          <path d="M740 160 H580 V230 H474" className="trace-bg" />
                          <path d="M740 160 H580 V230 H474" className="trace-flow blue2" />
                          <path d="M720 250 H590 V250 H474" className="trace-bg" />
                          <path d="M720 250 H590 V250 H474" className="trace-flow blue" />
                          <path d="M680 340 H570 V270 H474" className="trace-bg" />
                          <path d="M680 340 H570 V270 H474" className="trace-flow blue2" />
                        </g>

                        {/* Chip body */}
                        <rect
                          x={330} y={190} width={140} height={100}
                          rx={20} ry={20}
                          className="chip-body-light"
                          strokeWidth={3}
                          filter="drop-shadow(0 0 6px rgba(0,0,0,0.3))"
                        />

                        {/* Left pins */}
                        <g>
                          <rect x={322} y={205} width={8} height={10} className="pin-light" rx={2} />
                          <rect x={322} y={225} width={8} height={10} className="pin-light" rx={2} />
                          <rect x={322} y={245} width={8} height={10} className="pin-light" rx={2} />
                          <rect x={322} y={265} width={8} height={10} className="pin-light" rx={2} />
                        </g>

                        {/* Right pins */}
                        <g>
                          <rect x={470} y={205} width={8} height={10} className="pin-light" rx={2} />
                          <rect x={470} y={225} width={8} height={10} className="pin-light" rx={2} />
                          <rect x={470} y={245} width={8} height={10} className="pin-light" rx={2} />
                          <rect x={470} y={265} width={8} height={10} className="pin-light" rx={2} />
                        </g>

                        {/* Chip text */}
                        <text
                          x={400} y={240}
                          fontFamily="Arial, sans-serif"
                          fontSize={22}
                          className="chip-text-light"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
                          Loading
                        </text>

                        {/* Trace endpoint dots */}
                        <circle cx={100} cy={100} r={5} className="trace-dot" />
                        <circle cx={80} cy={180} r={5} className="trace-dot" />
                        <circle cx={60} cy={260} r={5} className="trace-dot" />
                        <circle cx={100} cy={350} r={5} className="trace-dot" />
                        <circle cx={700} cy={90} r={5} className="trace-dot" />
                        <circle cx={740} cy={160} r={5} className="trace-dot" />
                        <circle cx={720} cy={250} r={5} className="trace-dot" />
                        <circle cx={680} cy={340} r={5} className="trace-dot" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

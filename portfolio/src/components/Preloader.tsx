"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ShortSlideDown from "@/components/animata/text/short-slide-down";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showRings, setShowRings] = useState(false);

  useEffect(() => {
    // Reset loader states on path change
    setLoading(true);
    setShowRings(false);

    // After 500ms, fade in the rings
    const ringTimer = setTimeout(() => {
      setShowRings(true);
    }, 500);

    // After 1800ms, hide the preloader entirely to reveal the page
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(ringTimer);
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

            {/* 3D Wave Ring Loader Section: fades in after a brief delay */}
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
              <AnimatePresence>
                {showRings && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute flex justify-center items-center h-full w-full pointer-events-none select-none"
                  >
                    {Array.from({ length: 21 }).map((_, index) => (
                      <div
                        key={index}
                        className="absolute rounded-full aspect-square border-radial-ring transform-preserve-3d animate-my-move"
                        style={{
                          "--i": index,
                          width: `calc(${index} * var(--ring-width-scale))`,
                          borderWidth: "var(--ring-border-width)",
                          borderColor: "var(--ring-color)",
                          animationDelay: `calc(${index} * 0.08s)`,
                          boxShadow: "0px 0px 15px var(--ring-shadow), inset 0px 0px 15px var(--ring-shadow)",
                        } as React.CSSProperties}
                      />
                    ))}
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

"use client";

import ShortSlideDown from "./short-slide-down";

export default function TextFlip() {
  return (
    <div className="flex justify-center items-center gap-1.5 md:gap-2 text-cyan-600 dark:text-cyan-neon font-mono mb-4 tracking-widest uppercase text-xs sm:text-sm md:text-base select-none font-bold">
      <p className="whitespace-nowrap">WE CODE.</p>
      <ShortSlideDown
        phrases={[
          ["YOU GROW."],
          ["WE SCALE."]
        ]}
        className="h-6 w-[11ch] flex items-center justify-start"
        titleClassName="text-cyan-600 dark:text-cyan-neon font-mono font-bold tracking-widest uppercase text-xs sm:text-sm md:text-base"
      />
    </div>
  );
}

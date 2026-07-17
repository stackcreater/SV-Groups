"use client";

import { type ReactNode } from "react";
import { ParticleCard, BentoSection, useMobileDetection } from "@/components/MagicBento";

// ── PortfolioGrid: wraps the portfolio grid with spotlight ──

interface PortfolioGridProps {
  children: ReactNode;
}

export function PortfolioGrid({ children }: PortfolioGridProps) {
  const isMobile = useMobileDetection();

  return (
    <BentoSection
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      enableSpotlight={true}
      spotlightRadius={570}
      glowColor="132, 0, 255"
      disableAnimations={isMobile}
    >
      {children}
    </BentoSection>
  );
}

// ── PortfolioCard: wraps a single project card ──

interface PortfolioCardProps {
  children: ReactNode;
}

export function PortfolioCard({ children }: PortfolioCardProps) {
  const isMobile = useMobileDetection();

  return (
    <ParticleCard
      className="magic-bento-card magic-bento-card--border-glow bg-card text-card-foreground border border-border rounded-2xl overflow-hidden hover:border-cyan-neon/50 transition-colors shadow-sm dark:shadow-none group flex flex-col"
      disableAnimations={isMobile}
      particleCount={10}
      glowColor="132, 0, 255"
      enableTilt={false}
      clickEffect={true}
      enableMagnetism={false}
    >
      {children}
    </ParticleCard>
  );
}

// ── BlogGrid: wraps the blog list with spotlight ──

interface BlogGridProps {
  children: ReactNode;
}

export function BlogGrid({ children }: BlogGridProps) {
  const isMobile = useMobileDetection();

  return (
    <BentoSection
      className="space-y-10"
      enableSpotlight={true}
      spotlightRadius={570}
      glowColor="132, 0, 255"
      disableAnimations={isMobile}
    >
      {children}
    </BentoSection>
  );
}

// ── BlogCard: wraps a single blog post card ──

interface BlogCardProps {
  children: ReactNode;
}

export function BlogCard({ children }: BlogCardProps) {
  const isMobile = useMobileDetection();

  return (
    <ParticleCard
      className="magic-bento-card magic-bento-card--border-glow bg-card text-card-foreground border border-border rounded-2xl overflow-hidden hover:bg-slate-50 dark:hover:bg-white/[0.04] shadow-sm dark:shadow-none transition-colors flex flex-col md:flex-row"
      disableAnimations={isMobile}
      particleCount={8}
      glowColor="132, 0, 255"
      enableTilt={false}
      clickEffect={true}
      enableMagnetism={false}
    >
      {children}
    </ParticleCard>
  );
}

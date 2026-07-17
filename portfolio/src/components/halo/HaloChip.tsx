"use client";

import { type ReactNode } from "react";
import "./halo-system.css";

type ChipTone = "primary" | "success" | "warning" | "info" | "danger" | "neutral";

// ── Chip ───────────────────────────────────────────────

interface HaloChipProps {
  children: ReactNode;
  tone?: ChipTone;
  icon?: ReactNode;
  className?: string;
}

export const HaloChip = ({ children, tone = "primary", icon, className = "" }: HaloChipProps) => (
  <span
    className={`halo-chip ${className}`}
    data-tone={tone === "primary" ? undefined : tone}
  >
    {icon}
    {children}
  </span>
);

// ── Badge Dot ──────────────────────────────────────────

interface HaloBadgeDotProps {
  tone?: ChipTone;
  className?: string;
}

export const HaloBadgeDot = ({ tone = "primary", className = "" }: HaloBadgeDotProps) => (
  <span
    className={`halo-badge-dot ${className}`}
    data-tone={tone === "primary" ? undefined : tone}
  />
);

export default HaloChip;

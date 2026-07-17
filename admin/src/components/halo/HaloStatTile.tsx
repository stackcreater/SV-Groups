"use client";

import { type ReactNode } from "react";
import "./halo-system.css";

type StatTone = "primary" | "success" | "warning" | "info" | "danger";
type StatSize = "sm" | "default" | "lg";

// ── Sparkline ──────────────────────────────────────────

interface SparklineProps {
  points: number[];
  className?: string;
}

const Sparkline = ({ points, className = "" }: SparklineProps) => {
  if (points.length < 2) return null;

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const coords = points.map((val, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`halo-stat-spark ${className}`}
    >
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

// ── Stat Tile ──────────────────────────────────────────

interface HaloStatTileProps {
  eyebrow: string;
  value: string;
  tone?: StatTone;
  size?: StatSize;
  trendChip?: ReactNode;
  sparkData?: number[];
  footNote?: string;
  headerIcon?: ReactNode;
  className?: string;
}

const sizeMap: Record<StatSize, string> = {
  sm: "halo-stat-sm",
  default: "",
  lg: "halo-stat-lg",
};

export const HaloStatTile = ({
  eyebrow,
  value,
  tone = "primary",
  size = "default",
  trendChip,
  sparkData,
  footNote,
  headerIcon,
  className = "",
}: HaloStatTileProps) => {
  const classes = [
    "halo-stat-tile",
    sizeMap[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      data-tone={tone === "primary" ? undefined : tone}
    >
      <div className="halo-stat-head">
        <span className="halo-stat-eyebrow">{eyebrow}</span>
        {headerIcon}
      </div>

      <span className="halo-stat-value">{value}</span>

      <div className="halo-stat-meta">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {trendChip}
          {footNote && <span className="halo-stat-foot">{footNote}</span>}
        </div>
        {sparkData && sparkData.length > 1 && <Sparkline points={sparkData} />}
      </div>
    </div>
  );
};

export default HaloStatTile;

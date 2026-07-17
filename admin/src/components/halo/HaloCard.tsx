"use client";

import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import "./halo-system.css";

type HaloCardVariant = "base" | "elevated" | "accent";
type AccentTone = "primary" | "success" | "warning" | "info" | "danger";

interface HaloCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: HaloCardVariant;
  accent?: AccentTone;
  children: ReactNode;
}

export const HaloCard = forwardRef<HTMLDivElement, HaloCardProps>(
  ({ variant = "base", accent, className = "", children, ...props }, ref) => {
    const classes = [
      "halo-card",
      variant === "elevated" ? "halo-card-elevated" : "",
      variant === "accent" ? "halo-card-accent" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        {...(variant === "accent" && accent ? { "data-accent": accent } : {})}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HaloCard.displayName = "HaloCard";

// ── Sub-components ─────────────────────────────────────

export const HaloCardEyebrow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`halo-card-eyebrow ${className}`}>{children}</span>
);

export const HaloCardTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h3 className={`halo-card-title ${className}`}>{children}</h3>
);

export const HaloCardBody = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`halo-card-body ${className}`}>{children}</p>
);

export const HaloCardFooter = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`halo-card-footer ${className}`}>{children}</div>
);

export const HaloCardMedia = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`halo-card-media ${className}`} style={style} />
);

export default HaloCard;

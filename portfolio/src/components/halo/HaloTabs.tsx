"use client";

import { type ReactNode } from "react";
import "./halo-system.css";

// ── Tab Item ───────────────────────────────────────────

interface HaloTabProps {
  children: ReactNode;
  isActive?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const HaloTab = ({ children, isActive = false, icon, onClick, className = "" }: HaloTabProps) => (
  <button
    className={`halo-tab ${isActive ? "is-active" : ""} ${className}`}
    aria-selected={isActive}
    role="tab"
    onClick={onClick}
    type="button"
  >
    {icon}
    {children}
  </button>
);

// ── Tabs Container ─────────────────────────────────────

interface HaloTabsProps {
  children: ReactNode;
  className?: string;
}

export const HaloTabs = ({ children, className = "" }: HaloTabsProps) => (
  <div className={`halo-tabs ${className}`} role="tablist">
    {children}
  </div>
);

export default HaloTabs;

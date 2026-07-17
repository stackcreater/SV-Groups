"use client";

import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import "./halo-system.css";

type HaloButtonVariant = "primary" | "secondary" | "tertiary" | "danger";
type HaloButtonSize = "sm" | "default" | "lg";

interface HaloButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: HaloButtonVariant;
  size?: HaloButtonSize;
  iconOnly?: boolean;
  children: ReactNode;
}

const variantMap: Record<HaloButtonVariant, string> = {
  primary: "halo-btn-primary",
  secondary: "halo-btn-secondary",
  tertiary: "halo-btn-tertiary",
  danger: "halo-btn-danger",
};

const sizeMap: Record<HaloButtonSize, string> = {
  sm: "halo-btn-sm",
  default: "",
  lg: "halo-btn-lg",
};

export const HaloButton = forwardRef<HTMLButtonElement, HaloButtonProps>(
  ({ variant = "primary", size = "default", iconOnly = false, className = "", children, ...props }, ref) => {
    const classes = [
      "halo-btn",
      variantMap[variant],
      sizeMap[size],
      iconOnly ? "halo-btn-icon" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

HaloButton.displayName = "HaloButton";

export default HaloButton;

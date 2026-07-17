"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import "./halo-system.css";

interface HaloSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const HaloSwitch = forwardRef<HTMLInputElement, HaloSwitchProps>(
  ({ label, className = "", ...props }, ref) => {
    const switchEl = (
      <label className={`halo-switch ${className}`}>
        <input ref={ref} type="checkbox" {...props} />
        <span className="halo-switch-track" />
        <span className="halo-switch-thumb" />
      </label>
    );

    if (label) {
      return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
          {switchEl}
          <span style={{ fontFamily: "var(--halo-font-body)", fontSize: "0.9375rem", color: "var(--halo-text-primary)" }}>
            {label}
          </span>
        </div>
      );
    }

    return switchEl;
  }
);

HaloSwitch.displayName = "HaloSwitch";

export default HaloSwitch;

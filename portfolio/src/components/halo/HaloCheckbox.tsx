"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import "./halo-system.css";

// ── Checkbox ───────────────────────────────────────────

interface HaloCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const HaloCheckbox = forwardRef<HTMLInputElement, HaloCheckboxProps>(
  ({ label, className = "", ...props }, ref) => (
    <label className={`halo-check ${className}`}>
      <input ref={ref} type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  )
);

HaloCheckbox.displayName = "HaloCheckbox";

// ── Radio ──────────────────────────────────────────────

interface HaloRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const HaloRadio = forwardRef<HTMLInputElement, HaloRadioProps>(
  ({ label, className = "", ...props }, ref) => (
    <label className={`halo-check ${className}`}>
      <input ref={ref} type="radio" {...props} />
      <span>{label}</span>
    </label>
  )
);

HaloRadio.displayName = "HaloRadio";

export default HaloCheckbox;

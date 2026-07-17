"use client";

import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode, forwardRef } from "react";
import "./halo-system.css";

// ── Input ──────────────────────────────────────────────

interface HaloInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
  icon?: ReactNode;
}

export const HaloInput = forwardRef<HTMLInputElement, HaloInputProps>(
  ({ label, helpText, error, icon, className = "", ...props }, ref) => {
    const inputClass = `halo-input ${error ? "is-invalid" : ""} ${className}`.trim();

    return (
      <div className="halo-field">
        {label && <label className="halo-field-label">{label}</label>}
        {icon ? (
          <div className="halo-input-group">
            <span className="halo-input-icon">{icon}</span>
            <input ref={ref} className={inputClass} {...props} />
          </div>
        ) : (
          <input ref={ref} className={inputClass} {...props} />
        )}
        {error && <span className="halo-field-help is-error">{error}</span>}
        {!error && helpText && <span className="halo-field-help">{helpText}</span>}
      </div>
    );
  }
);

HaloInput.displayName = "HaloInput";

// ── Textarea ───────────────────────────────────────────

interface HaloTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helpText?: string;
  error?: string;
}

export const HaloTextarea = forwardRef<HTMLTextAreaElement, HaloTextareaProps>(
  ({ label, helpText, error, className = "", ...props }, ref) => {
    const textareaClass = `halo-textarea ${error ? "is-invalid" : ""} ${className}`.trim();

    return (
      <div className="halo-field">
        {label && <label className="halo-field-label">{label}</label>}
        <textarea ref={ref} className={textareaClass} {...props} />
        {error && <span className="halo-field-help is-error">{error}</span>}
        {!error && helpText && <span className="halo-field-help">{helpText}</span>}
      </div>
    );
  }
);

HaloTextarea.displayName = "HaloTextarea";

// ── Select ─────────────────────────────────────────────

interface HaloSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helpText?: string;
  error?: string;
  children: ReactNode;
}

export const HaloSelect = forwardRef<HTMLSelectElement, HaloSelectProps>(
  ({ label, helpText, error, className = "", children, ...props }, ref) => {
    const selectClass = `halo-select ${error ? "is-invalid" : ""} ${className}`.trim();

    return (
      <div className="halo-field">
        {label && <label className="halo-field-label">{label}</label>}
        <select ref={ref} className={selectClass} {...props}>
          {children}
        </select>
        {error && <span className="halo-field-help is-error">{error}</span>}
        {!error && helpText && <span className="halo-field-help">{helpText}</span>}
      </div>
    );
  }
);

HaloSelect.displayName = "HaloSelect";

export default HaloInput;

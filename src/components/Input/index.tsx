"use client";

import { useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { InputSize } from "./styles";
import {
  inputClass,
  ICON_WRAPPER_SIZE,
  LABEL_BASE,
  HELPER_BASE,
  ERROR_BASE,
} from "./styles";

export type { InputSize } from "./styles";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** sm | md | lg — default: "md" */
  size?: InputSize;
  /** Rendered in a <label> above the input */
  label?: string;
  /** Shown below the input when there is no validationError */
  helperText?: string;
  /** When non-empty: turns border red and renders this message below the input */
  validationError?: string;
  /** Icon rendered inside the left edge of the input */
  startIcon?: ReactNode;
  /**
   * Icon rendered inside the right edge of the input.
   * Ignored when type="password" (the show/hide toggle takes that slot).
   */
  endIcon?: ReactNode;
}

export function Input({
  size = "md",
  label,
  helperText,
  validationError,
  startIcon,
  endIcon,
  type,
  disabled,
  id,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();

  const inputId = id ?? generatedId;
  const isPassword = type === "password";
  const hasStart = !!startIcon;
  const hasEnd = isPassword || !!endIcon;
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={inputId} className={LABEL_BASE}>
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <span
            className={`absolute inset-y-0 left-0 flex items-center justify-center pointer-events-none text-muted ${ICON_WRAPPER_SIZE[size]}`}
          >
            {startIcon}
          </span>
        )}

        <input
          id={inputId}
          type={resolvedType}
          disabled={disabled}
          className={inputClass(size, !!validationError, hasStart, hasEnd, className)}
          {...props}
          aria-invalid={!!validationError ? "true" : undefined}
          aria-describedby={
            validationError ? errorId : helperText ? helperId : undefined
          }
        />

        {isPassword ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className={`absolute inset-y-0 right-0 flex items-center justify-center text-muted hover:text-ink transition-colors disabled:pointer-events-none disabled:opacity-60 ${ICON_WRAPPER_SIZE[size]}`}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden />
            ) : (
              <Eye className="w-4 h-4" aria-hidden />
            )}
          </button>
        ) : endIcon ? (
          <span
            className={`absolute inset-y-0 right-0 flex items-center justify-center pointer-events-none text-muted ${ICON_WRAPPER_SIZE[size]}`}
          >
            {endIcon}
          </span>
        ) : null}
      </div>

      {validationError ? (
        <p id={errorId} role="alert" className={ERROR_BASE}>
          {validationError}
        </p>
      ) : helperText ? (
        <p id={helperId} className={HELPER_BASE}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default Input;

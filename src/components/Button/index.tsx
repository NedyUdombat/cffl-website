"use client";

import React from "react";
import { buttonClass } from "./styles";
import type { ButtonVariant, ButtonSize } from "./styles";

export type { ButtonVariant, ButtonSize } from "./styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Content for icon-only variant */
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
      aria-hidden
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  icon,
  fullWidth,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isIcon = variant === "icon";

  return (
    <button
      className={buttonClass(variant, size, fullWidth, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : isIcon ? (
        icon ?? children
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

export default Button;

"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { useId } from "react";
import type { SelectSize } from "./styles";
import { CHEVRON_WRAPPER_SIZE, ERROR_BASE, HELPER_BASE, LABEL_BASE, selectClass } from "./styles";

export type { SelectSize } from "./styles";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** sm | md | lg — default: "md" */
  size?: SelectSize;
  /** Rendered in a <label> above the select */
  label?: string;
  /** Shown below the select when there is no validationError */
  helperText?: string;
  /** When non-empty: turns border red and renders this message below the select */
  validationError?: string;
  /** <option> / <optgroup> elements */
  children: ReactNode;
}

export function Select({
  size = "md",
  label,
  helperText,
  validationError,
  disabled,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={selectId} className={LABEL_BASE}>
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className={selectClass(size, !!validationError, className)}
          {...props}
          aria-invalid={validationError ? "true" : undefined}
          aria-describedby={validationError ? errorId : helperText ? helperId : undefined}
        >
          {children}
        </select>

        <span
          className={`absolute inset-y-0 right-0 flex items-center justify-center pointer-events-none text-muted ${CHEVRON_WRAPPER_SIZE[size]}`}
          aria-hidden
        >
          <ChevronDown className="w-4 h-4" />
        </span>
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

export default Select;

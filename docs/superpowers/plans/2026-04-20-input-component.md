# Input Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable `Input` component with 3 sizes, label, helper/error text, start/end icons, and a password show/hide toggle.

**Architecture:** A `src/components/Input/` folder mirroring the Button component structure: `styles.ts` owns types and class composers; `index.tsx` owns the component logic. The component wraps a native `<input>` in a flex column with optional label above and helper/error text below. Icons are absolutely positioned inside a relative wrapper so they never affect input layout.

**Tech Stack:** Next.js 15, Tailwind CSS v4, clsx, tailwind-merge, lucide-react (Eye/EyeOff), TypeScript, React 19 (`useId`, `useState`)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/Input/styles.ts` | `InputSize` type, all class constants, `inputClass()` composer |
| Create | `src/components/Input/index.tsx` | `Input` component, `InputProps`, re-export `InputSize` |

No token changes needed — `--color-danger`, `--color-accent`, `--color-line`, `--color-bg`, `--color-muted` are all already defined.

---

### Task 1: Create Input style maps

**Files:**
- Create: `src/components/Input/styles.ts`

- [ ] **Step 1: Create the file**

Create `src/components/Input/styles.ts`:

```ts
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export type InputSize = "sm" | "md" | "lg";

/** Base classes shared by every input regardless of size/state */
export const INPUT_BASE =
  "w-full rounded-md border bg-surface font-body text-ink transition-colors " +
  "placeholder:text-muted-2 " +
  "focus:outline-none focus:ring-2 " +
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-bg";

/** Height + horizontal padding + font size per size */
export const INPUT_SIZE: Record<InputSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

/** Border + focus ring colours for default vs error states */
export const INPUT_STATE = {
  default: "border-line focus:border-accent focus:ring-accent/20",
  error:   "border-danger focus:border-danger focus:ring-danger/20",
};

/**
 * Left padding override when a startIcon is present.
 * Must be wide enough that text doesn't overlap the icon container.
 */
export const ICON_START_PAD: Record<InputSize, string> = {
  sm: "pl-8",
  md: "pl-10",
  lg: "pl-11",
};

/**
 * Right padding override when an endIcon or password toggle is present.
 */
export const ICON_END_PAD: Record<InputSize, string> = {
  sm: "pr-8",
  md: "pr-10",
  lg: "pr-11",
};

/**
 * Width of the absolutely-positioned icon containers (matches input height
 * so icons appear perfectly centred).
 */
export const ICON_WRAPPER_SIZE: Record<InputSize, string> = {
  sm: "w-8",
  md: "w-10",
  lg: "w-11",
};

/** Label above the input */
export const LABEL_BASE = "block mb-1 text-sm font-medium text-ink";

/** Helper text below the input (no error) */
export const HELPER_BASE = "mt-1 text-xs text-muted";

/** Error message below the input */
export const ERROR_BASE = "mt-1 text-xs text-danger";

/**
 * Builds the full className for the <input> element.
 *
 * @param size       - sm | md | lg
 * @param hasError   - true when validationError is non-empty
 * @param hasStart   - true when startIcon is provided (adds left padding)
 * @param hasEnd     - true when endIcon or password toggle is present (adds right padding)
 * @param className  - consumer override, applied last via twMerge
 */
export function inputClass(
  size: InputSize,
  hasError: boolean,
  hasStart: boolean,
  hasEnd: boolean,
  className?: string
): string {
  return twMerge(
    clsx(
      INPUT_BASE,
      INPUT_SIZE[size],
      hasError ? INPUT_STATE.error : INPUT_STATE.default,
      hasStart && ICON_START_PAD[size],
      hasEnd && ICON_END_PAD[size],
      className
    )
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Input/styles.ts
git commit -m "feat: add Input style maps and inputClass composer"
```

---

### Task 2: Implement Input component

**Files:**
- Create: `src/components/Input/index.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/Input/index.tsx`:

```tsx
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
          aria-invalid={!!validationError || undefined}
          aria-describedby={
            validationError ? errorId : helperText ? helperId : undefined
          }
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className={`absolute inset-y-0 right-0 flex items-center justify-center text-muted hover:text-ink transition-colors disabled:pointer-events-none ${ICON_WRAPPER_SIZE[size]}`}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Input/index.tsx
git commit -m "feat: add Input component with label, error, icons, password toggle"
```

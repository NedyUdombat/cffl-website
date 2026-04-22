# Button Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable `Button` component with 7 variants, 3 sizes, loading spinner, icon support, and full TypeScript props.

**Architecture:** A single `src/components/Button/` folder with a `styles.ts` (variant/size lookup maps + `buttonClass` composer) and `index.tsx` (component + types). New semantic color tokens (`info`, `info-tint`, `warning-tint`, `danger-tint`) are added to the global token files first so Tailwind picks them up.

**Tech Stack:** Next.js 15, Tailwind CSS v4, clsx, tailwind-merge, lucide-react, TypeScript, Vitest + @testing-library/react

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/styles/tokens.css` | Add `--color-info`, `--color-info-tint`, `--color-warning-tint`, `--color-danger-tint` |
| Modify | `src/styles/tokens.ts` | Mirror new tokens as TS constants |
| Create | `src/components/Button/styles.ts` | Types (`ButtonVariant`, `ButtonSize`), `BASE`, `VARIANT_STYLES`, `SIZE_STYLES`, `ICON_SIZE_STYLES`, `buttonClass()` |
| Create | `src/components/Button/index.tsx` | `Button` component, `Spinner`, re-exports types from styles |
| Create | `src/components/Button/Button.test.tsx` | Vitest + RTL unit tests |

---

### Task 1: Add new color tokens

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/tokens.ts`

- [ ] **Step 1: Add tokens to tokens.css**

In `src/styles/tokens.css`, inside the `@theme { }` block, after the `--color-line-2` line, add:

```css
  /* ── Semantic extras ── */
  --color-info:          #3b82f6;
  --color-info-tint:     #eff6ff;
  --color-warning-tint:  #fffbeb;
  --color-danger-tint:   #fff1f2;
```

Note: `--color-warning` (#f59e0b) already exists as `--color-tie`; `--color-danger` (#e60023) already exists as `--color-loss`. The new entries cover only the missing values.

- [ ] **Step 2: Mirror tokens in tokens.ts**

In `src/styles/tokens.ts`, inside the `T = { ... }` object, after the `tie` line, add:

```ts
  // Info
  info: "#3b82f6",
  infoTint: "#eff6ff",

  // Semantic aliases (for Button usage)
  warning: "#f59e0b",   // same as tie
  warningTint: "#fffbeb",
  danger: "#e60023",    // same as loss
  dangerTint: "#fff1f2",
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css src/styles/tokens.ts
git commit -m "feat: add info, warning, danger token aliases for Button"
```

---

### Task 2: Create Button style maps

**Files:**
- Create: `src/components/Button/styles.ts`

- [ ] **Step 1: Create the file**

Create `src/components/Button/styles.ts` with this content:

```ts
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "info"
  | "warning"
  | "transparent"
  | "icon";

export type ButtonSize = "sm" | "md" | "lg";

export const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-medium tracking-ui rounded-md transition-all duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 " +
  "disabled:pointer-events-none disabled:opacity-60 cursor-pointer select-none";

export const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:     "bg-accent text-white hover:opacity-90",
  secondary:   "bg-surface text-ink border border-line hover:bg-bg",
  danger:      "bg-loss text-white hover:opacity-90",
  info:        "bg-info text-white hover:opacity-90",
  warning:     "bg-tie text-white hover:opacity-90",
  transparent: "bg-transparent text-muted hover:text-ink hover:bg-line-2",
  icon:        "bg-transparent text-ink hover:bg-line-2",
};

export const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function buttonClass(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth?: boolean,
  className?: string
): string {
  const isIcon = variant === "icon";
  return twMerge(
    clsx(
      BASE,
      VARIANT_STYLES[variant],
      isIcon ? ICON_SIZE_STYLES[size] : SIZE_STYLES[size],
      fullWidth && !isIcon && "w-full",
      className
    )
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Button/styles.ts
git commit -m "feat: add Button style maps and buttonClass composer"
```

---

### Task 3: Write failing tests

**Files:**
- Create: `src/components/Button/Button.test.tsx`

- [ ] **Step 1: Create the test file**

Create `src/components/Button/Button.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./index";

describe("Button", () => {
  it("renders children as label", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-accent");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-surface");
  });

  it("applies danger variant classes", () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-loss");
  });

  it("applies info variant classes", () => {
    render(<Button variant="info">Info</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-info");
  });

  it("applies warning variant classes", () => {
    render(<Button variant="warning">Warn</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-tie");
  });

  it("applies transparent variant classes", () => {
    render(<Button variant="transparent">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent");
  });

  it("renders icon-only with icon variant", () => {
    render(<Button variant="icon" icon={<span data-testid="ico" />} aria-label="close" />);
    expect(screen.getByTestId("ico")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("h-10", "w-10");
  });

  it("applies sm size", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");
  });

  it("applies lg size", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-12");
  });

  it("shows spinner and hides content when loading", () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(btn.querySelector("[aria-hidden]")).toBeInTheDocument();
  });

  it("is disabled when disabled prop passed", () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders leftIcon before children", () => {
    render(<Button leftIcon={<span data-testid="left" />}>Label</Button>);
    const btn = screen.getByRole("button");
    const kids = Array.from(btn.childNodes);
    const leftIdx = kids.findIndex((n) => (n as Element).querySelector?.("[data-testid='left']"));
    const labelIdx = kids.findIndex((n) => n.textContent === "Label");
    expect(leftIdx).toBeLessThan(labelIdx);
  });

  it("renders rightIcon after children", () => {
    render(<Button rightIcon={<span data-testid="right" />}>Label</Button>);
    const btn = screen.getByRole("button");
    const kids = Array.from(btn.childNodes);
    const rightIdx = kids.findIndex((n) => (n as Element).querySelector?.("[data-testid='right']"));
    const labelIdx = kids.findIndex((n) => n.textContent === "Label");
    expect(rightIdx).toBeGreaterThan(labelIdx);
  });

  it("applies w-full when fullWidth is true", () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("does not apply w-full on icon variant", () => {
    render(<Button variant="icon" fullWidth icon={<span />} aria-label="x" />);
    expect(screen.getByRole("button")).not.toHaveClass("w-full");
  });

  it("forwards extra HTML props", () => {
    render(<Button data-testid="btn" type="submit">Submit</Button>);
    const btn = screen.getByTestId("btn");
    expect(btn).toHaveAttribute("type", "submit");
  });
});
```

- [ ] **Step 2: Run tests — expect failure (Button not yet implemented)**

```bash
npx vitest run src/components/Button/Button.test.tsx
```

Expected: all tests FAIL with "Cannot find module './index'"

---

### Task 4: Implement Button component

**Files:**
- Create: `src/components/Button/index.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/Button/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Run tests — expect all pass**

```bash
npx vitest run src/components/Button/Button.test.tsx
```

Expected: all 17 tests PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/Button/index.tsx src/components/Button/styles.ts src/components/Button/Button.test.tsx
git commit -m "feat: add Button component with variants, sizes, loading, icon support"
```

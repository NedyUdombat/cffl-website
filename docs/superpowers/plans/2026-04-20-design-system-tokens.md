# Design System Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a global design token system using Tailwind v4 `@theme` (CSS) + a mirrored `tokens.ts` (TS) at `src/styles/`, replacing the component-scoped `RosterTab/tokens.ts`.

**Architecture:** A single `src/styles/tokens.css` defines all design tokens via Tailwind v4's `@theme` directive — making them available as Tailwind utility classes (`text-accent`, `bg-surface`, `shadow-card`, etc.) and as CSS variables (`var(--color-accent)`). A mirrored `src/styles/tokens.ts` exports the same values as JS constants for components that use inline styles. The old `RosterTab/tokens.ts` is deleted after all imports are updated.

**Tech Stack:** Tailwind CSS v4 (`@tailwindcss/postcss`), TypeScript, Next.js 15

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/styles/tokens.css` | All `@theme` token definitions (colors, fonts, sizes, spacing, shadows, tracking) |
| Create | `src/styles/tokens.ts` | TS mirror of token values + position colors + position utility constants/functions |
| Modify | `src/app/globals.css` | Import `tokens.css`; remove `@layer base` font classes (replaced by `@theme`) |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/index.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/ListTable.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/Pagination.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/FiltersDropdown.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/EmptyState.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/ActiveFiltersStrip.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/RosterSkeleton.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/CardGrid.tsx` | Update import path |
| Modify | `src/containers/SingleTeam/Tabs/RosterTab/OrientationToggle.tsx` | Update import path |
| Delete | `src/containers/SingleTeam/Tabs/RosterTab/tokens.ts` | Replaced by `src/styles/tokens.ts` |

---

## Task 1: Create `src/styles/tokens.css`

**Files:**
- Create: `src/styles/tokens.css`

- [ ] **Step 1: Create the file**

```css
/* src/styles/tokens.css
   Design tokens for the CFFL app.
   All values here become Tailwind utility classes automatically:
     --color-accent  →  bg-accent, text-accent, border-accent, etc.
     --font-display  →  font-display
     --shadow-card   →  shadow-card
     --tracking-ui   →  tracking-ui
     --spacing-18    →  p-18, gap-18, m-18, etc.
*/

@theme {
  /* ── Brand ── */
  --color-accent: #ED3237;
  --color-accent-tint: #fce8ea;
  --color-accent-tint-2: #fdf2f3;
  --color-gold: #d4af37;

  /* ── Surfaces ── */
  --color-bg: #f3f4f6;
  --color-surface: #ffffff;
  --color-surface-2: #fafafa;

  /* ── Ink (text) ── */
  --color-ink: #0a0a0b;
  --color-ink-2: #1a1b1e;
  --color-muted: #6b7280;
  --color-muted-2: #9aa0aa;

  /* ── Borders ── */
  --color-line: #e7e8eb;
  --color-line-2: #eff0f2;

  /* ── Semantic / status ── */
  --color-win: #34a853;
  --color-loss: #e60023;
  --color-tie: #f59e0b;

  /* ── Font families ── */
  --font-display: 'Barlow Condensed', 'Oswald', Impact, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Mono', ui-monospace, Menlo, monospace;
  --font-body: 'DM Sans', 'Inter', ui-sans-serif, sans-serif;
  --font-machine: 'ITC Machine Std', sans-serif;
  --font-inter: 'Inter', ui-sans-serif, sans-serif;
  /* Aliases used in existing components */
  --font-barlow-condensed: 'Barlow Condensed', 'Oswald', Impact, sans-serif;
  --font-barlow: 'Barlow Condensed', sans-serif;

  /* ── Custom font sizes (not in Tailwind defaults) ── */
  --text-2xs: 10px;
  --text-3xs: 9px;

  /* ── Custom letter-spacing ── */
  --tracking-ui: 0.04em;
  --tracking-label: 0.1em;
  --tracking-wide-ui: 0.14em;
  --tracking-xwide: 0.18em;
  --tracking-xxwide: 0.22em;

  /* ── Custom spacing (values not covered by Tailwind default scale) ── */
  --spacing-13: 52px;
  --spacing-18: 72px;
  --spacing-22: 88px;

  /* ── Shadows ── */
  --shadow-subtle: 0 1px 2px rgba(10, 10, 15, 0.04);
  --shadow-focus: 0 0 0 3px rgba(10, 10, 15, 0.06);
  --shadow-card: 0 10px 30px rgba(10, 10, 15, 0.08);
  --shadow-raised: 0 4px 12px rgba(10, 10, 15, 0.12), 0 1px 3px rgba(10, 10, 15, 0.08);
  --shadow-deep: 0 2px 20px rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/tokens.css
git commit -m "feat: add design system tokens CSS (@theme)"
```

---

## Task 2: Create `src/styles/tokens.ts`

**Files:**
- Create: `src/styles/tokens.ts`

- [ ] **Step 1: Create the file**

```ts
// src/styles/tokens.ts
// TS mirror of src/styles/tokens.css @theme values.
// Use for inline styles where Tailwind classes can't be applied.
// Keep values in sync with tokens.css.

/* ─── Font families ─── */
export const DISPLAY = "'Barlow Condensed', 'Oswald', Impact, sans-serif";
export const MONO = "'JetBrains Mono', 'Fira Mono', ui-monospace, Menlo, monospace";
export const BODY = "'DM Sans', 'Inter', ui-sans-serif, sans-serif";
export const MACHINE = "'ITC Machine Std', sans-serif";
export const INTER = "'Inter', ui-sans-serif, sans-serif";

/* ─── Design tokens ─── */
export const T = {
  // Brand
  accent: "#ED3237",
  accentTint: "#fce8ea",
  accentTint2: "#fdf2f3",
  gold: "#d4af37",

  // Surfaces
  bg: "#f3f4f6",
  surface: "#ffffff",
  surface2: "#fafafa",

  // Ink
  ink: "#0a0a0b",
  ink2: "#1a1b1e",
  muted: "#6b7280",
  muted2: "#9aa0aa",

  // Borders
  line: "#e7e8eb",
  line2: "#eff0f2",

  // Semantic
  win: "#34a853",
  loss: "#e60023",
  tie: "#f59e0b",
} as const;

/* ─── Position colors (dynamic — not in @theme, applied via inline styles) ─── */
export const POSITION_COLORS: Record<string, string> = {
  QB: "#1d4ed8",
  WR: "#15803d",
  RB: "#0f766e",
  TE: "#0f766e",
  CB: "#b91c1c",
  LB: "#b45309",
  S:  "#7c3aed",
  DE: "#c2410c",
  C:  "#be185d",
  OL: "#374151",
  DL: "#1e3a5f",
  K:  "#6b21a8",
};

/* ─── Position sets ─── */
export const OFFENSIVE_POSITIONS = new Set(["QB", "WR", "RB", "C"]);
export const DEFENSIVE_POSITIONS = new Set(["CB", "S", "LB", "RSH"]);
export const ALL_POSITIONS = ["QB", "WR", "RB", "C", "CB", "S", "LB", "RSH"];

/* ─── Position side utility ─── */
export function getSide(positions: string[]): "Offense" | "Defense" | "Both" {
  const hasOff = positions.some((p) => OFFENSIVE_POSITIONS.has(p));
  const hasDef = positions.some((p) => DEFENSIVE_POSITIONS.has(p));
  if (hasOff && hasDef) return "Both";
  if (hasOff) return "Offense";
  if (hasDef) return "Defense";
  return "Offense";
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.ts
git commit -m "feat: add global tokens.ts mirror"
```

---

## Task 3: Update `globals.css`

Import `tokens.css` and remove the `@layer base` font class block — those classes are now auto-generated by `@theme`.

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the `@layer base` block and add import**

The current `globals.css` has an `@import "tailwindcss"` on line 17 and an `@layer base` block that manually defines font classes. Since `@theme` in `tokens.css` will auto-generate `font-machine`, `font-inter`, `font-barlow-condensed`, `font-barlow` etc. as utilities, the manual `@layer base` definitions are redundant and should be removed.

Replace this section in `globals.css`:

```css
@import "tailwindcss";
```

with:

```css
@import "tailwindcss";
@import "./tokens.css";
```

Then remove the entire `@layer base` block:

```css
/* DELETE THIS ENTIRE BLOCK: */
@layer base {
  .font-machine {
    font-family: "ITC Machine Std", sans-serif;
  }
  .font-barlow-condensed {
    font-family: var(--font-barlow-condensed), sans-serif;
  }
  .font-barlow {
    font-family: var(--font-barlow), sans-serif;
  }
  .font-inter {
    font-family: var(--font-inter), sans-serif;
  }
}
```

The final `globals.css` should look like:

```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=JetBrains+Mono:wght@400;500;700&display=swap");

/* === Custom Font: ITC Machine Std === */
@font-face {
  font-family: "ITC Machine Std";
  src: url("/fonts/MachineStd.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Optional: set it as the default for the whole site */
body {
  font-family: "ITC Machine Std", sans-serif;
}

@import "tailwindcss";
@import "./tokens.css";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.team-logo {
  width: 99px;
  height: 89px;
  opacity: 1;
  mix-blend-mode: luminosity;
  object-fit: contain;
  transform: rotate(0deg);
}
```

- [ ] **Step 2: Run the dev server and verify no CSS errors**

```bash
npm run dev
```

Expected: server starts, no PostCSS/Tailwind errors in terminal

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: import design tokens into globals.css, remove redundant @layer base fonts"
```

---

## Task 4: Update import paths in RosterTab files

All 9 files currently import from `"./tokens"`. Update each to `"@/styles/tokens"`.

**Files:**
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/index.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/ListTable.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/Pagination.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/FiltersDropdown.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/EmptyState.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/ActiveFiltersStrip.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/RosterSkeleton.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/CardGrid.tsx`
- Modify: `src/containers/SingleTeam/Tabs/RosterTab/OrientationToggle.tsx`

- [ ] **Step 1: Update all 9 import lines**

In each file, change:
```ts
import { ... } from "./tokens";
```
to:
```ts
import { ... } from "@/styles/tokens";
```

The named imports themselves (`T`, `DISPLAY`, `MONO`, `BODY`, `getSide`, `ALL_POSITIONS`, `BODY`) are all exported from the new `tokens.ts` with the same names — no destructuring changes needed.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors related to missing module `"./tokens"`

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/Tabs/RosterTab/
git commit -m "chore: update RosterTab token imports to @/styles/tokens"
```

---

## Task 5: Delete old `tokens.ts`

**Files:**
- Delete: `src/containers/SingleTeam/Tabs/RosterTab/tokens.ts`

- [ ] **Step 1: Confirm no remaining imports of the old path**

```bash
grep -r "from \"./tokens\"" src/containers/SingleTeam/Tabs/RosterTab/
```

Expected: no output (all imports updated in Task 4)

- [ ] **Step 2: Delete the file**

```bash
git rm src/containers/SingleTeam/Tabs/RosterTab/tokens.ts
```

- [ ] **Step 3: Final TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Final build check**

```bash
npm run build
```

Expected: build completes successfully, no TypeScript or CSS errors

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: remove scoped RosterTab/tokens.ts, now global at src/styles/tokens"
```

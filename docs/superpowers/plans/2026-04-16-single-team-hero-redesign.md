# Single Team Hero Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the SingleTeam hero section to use a centered identity block (logo ring → divider → team name `[ABBR]` → league sublabel) and strip ColorSwatch to a shape-only click-to-copy dot.

**Architecture:** Two isolated component changes — `HeroSection.tsx` gets a new centered layout replacing the bottom-left content stack; `ColorSwatch.tsx` is simplified to a bare colored circle. No prop interface changes, no new dependencies.

**Tech Stack:** Next.js 14, React, Tailwind CSS, Framer Motion, TypeScript

---

## File Map

| File | Change |
|---|---|
| `src/containers/SingleTeam/components/HeroSection.tsx` | Replace bottom-left content block with centered identity block; move social icons to centered bottom; move swatches to bottom-left |
| `src/containers/SingleTeam/components/ColorSwatch.tsx` | Remove label/hex text; keep circle shape; replace text feedback with CSS pulse animation |

---

### Task 1: Simplify ColorSwatch to shape-only with pulse feedback

**Files:**
- Modify: `src/containers/SingleTeam/components/ColorSwatch.tsx`

- [ ] **Step 1: Read the current file**

Read `src/containers/SingleTeam/components/ColorSwatch.tsx` to have it in context before editing.

- [ ] **Step 2: Replace the component with the simplified version**

Replace the entire file content with:

```tsx
"use client";

import { useState } from "react";

export function ColorSwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label={`Copy color ${color}`}
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: color,
        border: copied
          ? `1.5px solid ${color}`
          : "1.5px solid rgba(255,255,255,0.14)",
        transform: copied ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.15s ease, border-color 0.15s ease",
        cursor: "pointer",
        flexShrink: 0,
        outline: "none",
      }}
    />
  );
}
```

Note: the `label` prop is removed. Update all call sites in the next task.

- [ ] **Step 3: Verify no TypeScript errors**

Run:
```bash
pnpm tsc --noEmit
```

Expected: no errors relating to `ColorSwatch`. If there are errors about the `label` prop being passed from call sites, they will be fixed in Task 2.

- [ ] **Step 4: Commit**

```bash
git add src/containers/SingleTeam/components/ColorSwatch.tsx
git commit -m "refactor(ColorSwatch): strip to shape-only dot with pulse feedback on copy"
```

---

### Task 2: Redesign HeroSection — centered identity block

**Files:**
- Modify: `src/containers/SingleTeam/components/HeroSection.tsx`

- [ ] **Step 1: Read the current file**

Read `src/containers/SingleTeam/components/HeroSection.tsx` to have it in context before editing.

- [ ] **Step 2: Replace the bottom content block and logo placement**

The entire file should be replaced with the following. The background layers, top accent bar, and watermark are **unchanged**. Only the `{/* Team logo (top-right) */}` block and `{/* Bottom hero content */}` block are replaced with the new centered identity block, bottom social icons, and bottom-left swatches.

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ColorSwatch } from "./ColorSwatch";
import { SocialIconsRow } from "./SocialIconsRow";
import { EASE } from "./types";
import type { TeamSocialLinks } from "./types";

export function HeroSection({
  teamName,
  abbreviation,
  primaryColor,
  secondaryColor,
  foundedYear,
  bannerImage,
  logoImage,
  socialLinks,
}: {
  teamName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  foundedYear: number;
  bannerImage: string;
  logoImage?: string;
  socialLinks: TeamSocialLinks;
}) {
  const hasBanner = Boolean(bannerImage);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px", maxHeight: "900px" }}
    >
      {/* ── Background ──────────────────────────────────────────────────────── */}
      {hasBanner ? (
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt={`${teamName} banner`}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: "#09090f" }}>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 45%, ${primaryColor}1a 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-machine font-black leading-none"
              style={{
                fontSize: "clamp(220px, 68vw, 960px)",
                color: primaryColor,
                opacity: 0.08,
                letterSpacing: "-0.06em",
                lineHeight: 1,
              }}
            >
              {abbreviation}
            </span>
          </div>
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
            }}
          />
        </div>
      )}

      {/* ── Gradient overlay ────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: hasBanner
            ? `
              linear-gradient(to top, #09090f 0%, #09090f 6%, ${primaryColor}50 52%, transparent 82%),
              linear-gradient(to right, #09090f 0%, transparent 45%, transparent 55%, rgba(9,9,15,0.65) 100%)
            `
            : `linear-gradient(to top, #09090f 0%, #09090f 18%, transparent 75%)`,
        }}
      />

      {/* ── Top accent bar ──────────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ backgroundColor: primaryColor }}
      />

      {/* ── Watermark abbreviation (banner variant only) ─────────────────────── */}
      {hasBanner && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-machine font-black leading-none"
            style={{
              fontSize: "clamp(110px, 42vw, 560px)",
              color: primaryColor,
              opacity: 0.04,
              letterSpacing: "-0.04em",
            }}
          >
            {abbreviation}
          </span>
        </div>
      )}

      {/* ── Centered identity block ──────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">

        {/* Logo ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          style={{
            width: "clamp(90px, 12vw, 110px)",
            height: "clamp(90px, 12vw, 110px)",
            borderRadius: "50%",
            border: `2.5px solid ${primaryColor}`,
            background: `${primaryColor}1f`,
            boxShadow: `0 0 40px ${primaryColor}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {logoImage ? (
            <div
              style={{
                position: "relative",
                width: "65%",
                height: "65%",
              }}
            >
              <Image
                src={logoImage}
                alt={`${teamName} logo`}
                fill
                className="object-contain"
                style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.6))" }}
              />
            </div>
          ) : (
            <span
              className="font-machine font-black"
              style={{
                color: primaryColor,
                fontSize: "clamp(24px, 4vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              {abbreviation.slice(0, 3)}
            </span>
          )}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
          style={{
            width: 40,
            height: 2,
            backgroundColor: primaryColor,
            marginTop: 16,
            marginBottom: 16,
            transformOrigin: "center",
          }}
        />

        {/* Team name + [ABBR] */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          className="flex items-baseline justify-center flex-wrap gap-x-3"
        >
          <span
            className="font-machine font-black uppercase text-white"
            style={{
              fontSize: "clamp(28px, 5vw, 58px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {teamName}
          </span>
          <span
            className="font-machine font-black"
            style={{
              fontSize: "clamp(15px, 2.8vw, 32px)",
              color: primaryColor,
              opacity: 0.85,
              letterSpacing: "0.04em",
            }}
          >
            [{abbreviation}]
          </span>
        </motion.div>

        {/* League sublabel */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-machine uppercase text-white/45"
          style={{
            fontSize: "clamp(9px, 1.1vw, 11px)",
            letterSpacing: "0.28em",
            marginTop: 10,
          }}
        >
          CFFL · Lagos, Nigeria · Est. {foundedYear}
        </motion.p>
      </div>

      {/* ── Color swatches — bottom left ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute bottom-8 left-6 md:left-14 lg:left-20 flex items-center gap-2.5 z-10"
      >
        <ColorSwatch color={primaryColor} />
        <ColorSwatch color={secondaryColor} />
      </motion.div>

      {/* ── Social icons — bottom center ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
        className="absolute bottom-8 left-0 right-0 flex justify-center z-10"
      >
        <SocialIconsRow socialLinks={socialLinks} compact />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles cleanly**

Run:
```bash
pnpm tsc --noEmit
```

Expected: zero errors. If there are errors about `ColorSwatch` receiving a `label` prop (old call signature), confirm it was removed in Task 1.

- [ ] **Step 4: Run the dev server and visually verify**

```bash
pnpm dev
```

Open a team page (e.g. `/teams/<any-slug>`). Confirm:
- Logo ring is centered vertically and horizontally in the hero
- Team name appears with `[ABBR]` in team primary color to its right
- League sublabel appears below the name
- Two color dots appear bottom-left; clicking each copies its hex to clipboard
- Social icons appear bottom-center
- Top 3px accent bar is present
- Background watermark and gradients are unchanged
- On mobile (≤ 768px), the layout scales correctly via `clamp()`

- [ ] **Step 5: Commit**

```bash
git add src/containers/SingleTeam/components/HeroSection.tsx
git commit -m "feat(HeroSection): centered identity block with logo ring, name + [ABBR], league sublabel"
```

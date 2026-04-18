# Teams & SingleTeam Font System

**Date:** 2026-04-17
**Scope:** `/teams` and `/teams/[slug]` routes only — no other pages touched.

---

## Problem

All text in the Teams and SingleTeam pages currently uses `ITC Machine Std` (`.font-machine`) for
everything — hero names, headings, stat numbers, tab labels, player names, body copy, metadata.
This is a branding font designed for display and decorative use, not for reading. The goal is a
proper typographic hierarchy using three purpose-fit fonts.

---

## Font Pairing

| Font | Weights loaded | Role |
|---|---|---|
| **Barlow Condensed** | 700 (Bold), 800 (ExtraBold) | Hero team name, section headings, big stat numbers, jersey numbers |
| **Barlow** | 600 (SemiBold) | Sub-headings, nav tabs, card titles |
| **Inter** | Variable (100–900) | Body text, labels, table data, metadata, UI copy |

All three are loaded via `next/font/google` and scoped exclusively to the `/teams` subtree.

---

## Architecture

### 1. New `src/app/teams/layout.tsx`

Creates a wrapper `<div>` that injects three CSS variables into the `/teams` route tree:

```
--font-barlow-condensed
--font-barlow
--font-inter
```

These variables do not exist on any other page, so there is zero bleed into global styles.
The root layout and globals.css are untouched (aside from the three new utility classes below).

```tsx
import { Barlow_Condensed, Barlow, Inter } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${barlowCondensed.variable} ${barlow.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
```

### 2. Three utility classes added to `globals.css`

Added under `@layer base` so they're available as Tailwind-style classes:

```css
@layer base {
  .font-barlow-condensed { font-family: var(--font-barlow-condensed), sans-serif; }
  .font-barlow           { font-family: var(--font-barlow), sans-serif; }
  .font-inter            { font-family: var(--font-inter), sans-serif; }
}
```

On any page without the CSS variables defined (every page except `/teams`), these classes resolve
to `sans-serif` — which is equivalent to the existing fallback. Safe to add globally.

---

## Component Mapping

### `HeroSection.tsx` — team name `<h1>`
- **Before:** `font-machine font-black uppercase italic`
- **After:** `font-barlow-condensed font-extrabold uppercase italic`
- Rationale: Team name is the primary hero display text → Barlow Condensed ExtraBold (800)

### `SectionHeading.tsx` — section `<h2>`
- **Before:** `font-machine font-black uppercase tracking-widest`
- **After:** `font-barlow-condensed font-bold uppercase tracking-widest`
- Rationale: Section headings (Roster, Standings, Recent Results) → Barlow Condensed Bold (700)

### `StatCard.tsx`
- Stat value — **Before:** `font-machine font-black` → **After:** `font-barlow-condensed font-bold`
- Stat label — **Before:** `font-machine` → **After:** `font-inter`
- Rationale: Big numbers → Barlow Condensed; descriptive labels → Inter

### `TabBar.tsx` — tab button labels
- **Before:** `font-machine font-black uppercase tracking-wider`
- **After:** `font-barlow font-semibold uppercase tracking-wider`
- Rationale: Navigation tabs → Barlow SemiBold (600)

### `PlayerCard.tsx`
- Player name — **Before:** `font-machine font-black` → **After:** `font-inter font-semibold`
- Jersey # label (small `#N` below name) — **Before:** `font-machine` → **After:** `font-barlow-condensed`
- Position badge text — **Before:** `font-machine font-bold` → **After:** `font-inter font-bold`
- Jersey number watermark (large bg number) — **stays `font-machine`** (decorative, aria-hidden)
- Rationale: Player names and position labels are readable body-level text → Inter; jersey number
  reference in UI → Barlow Condensed

### `TeamsCard.tsx` — team name in card footer
- **Before:** no explicit font-family (inherits body/Tailwind default), `font-semibold`
- **After:** `font-barlow font-semibold`
- Rationale: Card titles → Barlow SemiBold

### Other SingleTeam components (MatchResultRow, StandingsTab, NewsCard, etc.)
- Table data, scores, dates, captions, metadata → `font-inter`
- Any remaining `font-machine` on readable text in these components gets replaced with the
  appropriate Inter class per context

---

## What stays as `font-machine` (ITC Machine Std)

These are decorative, brand-identity, or chrome elements that intentionally stay in the display
font:

- Background abbreviation watermarks (aria-hidden, not readable text)
- "VS" text in the Next Matchup glass card
- "LIVE SEASON" badge
- Breadcrumb navigation in HeroSection
- "Next Matchup" label and "Match Center" button
- Season record / rank chips
- `font-machine` references inside `Teams.tsx` error/empty-state **except** the label text and button copy, which become Inter (they are UI copy, per the "labels → Inter" rule)

---

## Out of Scope

- Root `layout.tsx` — not modified
- `globals.css` existing rules (body, font-machine, animations) — not modified
- All pages outside `/teams` — completely untouched
- Tailwind config — not modified

---

## Files Changed

| File | Change |
|---|---|
| `src/app/teams/layout.tsx` | **New** — font loader + CSS variable wrapper |
| `src/app/globals.css` | Add 3 utility classes under `@layer base` |
| `src/containers/SingleTeam/components/HeroSection.tsx` | `<h1>` font class |
| `src/containers/SingleTeam/components/SectionHeading.tsx` | `<h2>` font class |
| `src/containers/SingleTeam/components/StatCard.tsx` | Value + label font classes |
| `src/containers/SingleTeam/components/TabBar.tsx` | Button font class |
| `src/containers/SingleTeam/components/PlayerCard.tsx` | Name, jersey#, position font classes |
| `src/components/TeamsCard.tsx` | Team name font class |
| Other SingleTeam components | `font-machine` → `font-inter` on body/data text |

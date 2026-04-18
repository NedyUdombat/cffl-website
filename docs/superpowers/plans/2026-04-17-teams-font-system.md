# Teams Font System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Load Barlow Condensed, Barlow, and Inter via `next/font/google` and apply them to every text element across the `/teams` and `/teams/[slug]` routes, replacing the current uniform `ITC Machine Std` (`font-machine`) usage.

**Architecture:** A new `src/app/teams/layout.tsx` injects three CSS custom properties (`--font-barlow-condensed`, `--font-barlow`, `--font-inter`) scoped to a wrapper `<div>` — these variables exist nowhere else in the app. Three matching utility classes are added to `globals.css`. Each Teams/SingleTeam component then swaps `font-machine` for the appropriate utility class.

**Tech Stack:** Next.js 15 (`next/font/google`), Tailwind CSS v4, TypeScript.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/app/teams/layout.tsx` | **Create** | Load fonts, inject CSS variables for `/teams` subtree |
| `src/app/globals.css` | Modify | Add `.font-barlow-condensed`, `.font-barlow`, `.font-inter` utility classes |
| `src/containers/SingleTeam/components/SectionHeading.tsx` | Modify | `<h2>` → Barlow Condensed Bold |
| `src/containers/SingleTeam/components/StatCard.tsx` | Modify | Stat value → Barlow Condensed Bold; label → Inter |
| `src/containers/SingleTeam/components/TabBar.tsx` | Modify | Tab labels → Barlow SemiBold |
| `src/containers/SingleTeam/components/HeroSection.tsx` | Modify | Team name `<h1>` → Barlow Condensed ExtraBold |
| `src/containers/SingleTeam/components/PlayerCard.tsx` | Modify | Player name → Inter SemiBold; jersey # label → Barlow Condensed; position badge → Inter |
| `src/containers/Team/Teams.tsx` | Modify | Error/empty-state text → Inter |
| `src/components/TeamsCard.tsx` | Modify | Team name → Barlow SemiBold |
| `src/containers/SingleTeam/components/OverviewTab.tsx` | Modify | Section labels, coach names, card titles → Inter; inline stat values → Barlow Condensed |
| `src/containers/SingleTeam/components/MatchResultRow.tsx` | Modify | Opponent/location text → Inter; score → Barlow Condensed; date day → Barlow Condensed; result pill → Inter |
| `src/containers/SingleTeam/components/StandingsTab.tsx` | Modify | All table data → Inter; W–L record label → Barlow Condensed |
| `src/containers/SingleTeam/components/CoachCard.tsx` | Modify | Coach title → Inter; coach name → Inter SemiBold |
| `src/containers/SingleTeam/components/StaffTab.tsx` | Modify | Coach title/name and info items → Inter |
| `src/containers/SingleTeam/components/RosterTab.tsx` | Modify | Filter pills → Barlow SemiBold; count/empty message → Inter |
| `src/containers/SingleTeam/components/ResultsTab.tsx` | Modify | "Upcoming Fixtures" label → Inter |
| `src/containers/SingleTeam/components/NewsCard.tsx` | Modify | Date → Inter; article title → Inter SemiBold; "Read More" → Barlow SemiBold |
| `src/containers/SingleTeam/components/NewsTab.tsx` | Modify | Article titles → Inter SemiBold; dates → Inter; category badges → Barlow; "Read More" / "View All" → Barlow SemiBold |

---

## Task 1: Create the teams layout — font loader + CSS variable wrapper

**Files:**
- Create: `src/app/teams/layout.tsx`

This file is the scope boundary. It loads all three fonts with `next/font/google` and applies
their generated CSS variable class names to a wrapper `<div>`. Routes under `/teams` inherit
the variables via CSS cascade. No other page has these variables defined.

- [ ] **Step 1: Create `src/app/teams/layout.tsx`**

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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /path/to/project && pnpm tsc --noEmit
```

Expected: no errors (font imports are built into Next.js 15, no new packages needed).

---

## Task 2: Add CSS utility classes to globals.css

**Files:**
- Modify: `src/app/globals.css`

These three classes are safe to add globally. On pages without the CSS variables (every page
except `/teams`), they resolve to `sans-serif` — the same fallback as before. They extend the
existing `@layer base` block that already contains `.font-machine`.

- [ ] **Step 1: Add the three classes to the existing `@layer base` block in `globals.css`**

Find the existing block:
```css
@layer base {
  .font-machine {
    font-family: "ITC Machine Std", sans-serif;
  }
}
```

Replace it with:
```css
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

- [ ] **Step 2: Commit the foundation**

```bash
git add src/app/teams/layout.tsx src/app/globals.css
git commit -m "feat: load Barlow Condensed, Barlow, and Inter for /teams route

Adds a teams layout that injects three CSS custom properties scoped
to the /teams subtree. Three matching utility classes added to globals.css.
No other pages are affected."
```

---

## Task 3: SectionHeading and StatCard — headings and stat numbers

**Files:**
- Modify: `src/containers/SingleTeam/components/SectionHeading.tsx`
- Modify: `src/containers/SingleTeam/components/StatCard.tsx`

### SectionHeading.tsx

The `<h2>` currently uses `font-machine font-black`. Section headings (Roster, Standings, Recent
Results, etc.) map to Barlow Condensed Bold (700). `font-bold` = weight 700, which is one of the
two weights we loaded.

- [ ] **Step 1: Update `SectionHeading.tsx`**

Change line 18. Before:
```tsx
      <h2 className="font-machine font-black text-xl md:text-2xl uppercase tracking-widest text-white leading-none">
```

After:
```tsx
      <h2 className="font-barlow-condensed font-bold text-xl md:text-2xl uppercase tracking-widest text-white leading-none">
```

### StatCard.tsx

Stat value (big number) → Barlow Condensed Bold. Stat label (e.g. "Wins", "Win %") → Inter.

- [ ] **Step 2: Update `StatCard.tsx`**

Change lines 15–20. Before:
```tsx
      <span
        className="font-machine font-black text-4xl md:text-5xl leading-none tabular-nums"
        style={{ color: primaryColor }}
      >
        {value}
      </span>
      <span className="mt-2 text-[10px] font-machine uppercase tracking-[0.22em] text-white/40">
```

After:
```tsx
      <span
        className="font-barlow-condensed font-bold text-4xl md:text-5xl leading-none tabular-nums"
        style={{ color: primaryColor }}
      >
        {value}
      </span>
      <span className="mt-2 text-[10px] font-inter uppercase tracking-[0.22em] text-white/40">
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/SectionHeading.tsx \
        src/containers/SingleTeam/components/StatCard.tsx
git commit -m "feat: apply Barlow Condensed to section headings and stat numbers"
```

---

## Task 4: TabBar — navigation tab labels

**Files:**
- Modify: `src/containers/SingleTeam/components/TabBar.tsx`

Tab labels (Overview, Roster, Matches, etc.) → Barlow SemiBold. Replace `font-machine font-black`
with `font-barlow font-semibold`. Keep `uppercase tracking-wider` as-is.

- [ ] **Step 1: Update the button `className` in `TabBar.tsx`**

Change line 39. Before:
```tsx
          "relative px-5 py-4 text-sm font-machine font-black uppercase tracking-wider whitespace-nowrap transition-colors duration-150",
```

After:
```tsx
          "relative px-5 py-4 text-sm font-barlow font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-150",
```

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/TabBar.tsx
git commit -m "feat: apply Barlow SemiBold to tab bar labels"
```

---

## Task 5: HeroSection — team name h1

**Files:**
- Modify: `src/containers/SingleTeam/components/HeroSection.tsx`

Only the `<h1>` (team name) changes. Everything else in HeroSection stays as `font-machine`:
abbreviation watermarks (decorative, aria-hidden), breadcrumb, "LIVE SEASON" badge, record/rank
chips, "VS" in the matchup card, "Next Matchup" label, "Match Center" button — these are all
brand/chrome elements that keep ITC Machine Std intentionally.

- [ ] **Step 1: Update the `<h1>` in `HeroSection.tsx`**

Change line 251. Before:
```tsx
                className="font-machine font-black uppercase text-white leading-none italic"
```

After:
```tsx
                className="font-barlow-condensed font-extrabold uppercase text-white leading-none italic"
```

Note: `font-extrabold` = weight 800, which is one of the two weights loaded for Barlow Condensed.

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/HeroSection.tsx
git commit -m "feat: apply Barlow Condensed ExtraBold to hero team name"
```

---

## Task 6: PlayerCard and RosterTab — player roster

**Files:**
- Modify: `src/containers/SingleTeam/components/PlayerCard.tsx`
- Modify: `src/containers/SingleTeam/components/RosterTab.tsx`

### PlayerCard.tsx

Three distinct text elements, three different mappings:
- Player name → `font-inter font-semibold` (readable body text)
- Jersey `#N` label (small text below name) → `font-barlow-condensed` (number reference)
- Position badge → `font-inter font-bold`

The **jersey number watermark** (large background number, `aria-hidden`) stays `font-machine` —
it is decorative, not a readable text element.
The **captain badge** "CAP" stays `font-machine` — it is a brand label.

- [ ] **Step 1: Update player name in `PlayerCard.tsx`**

Change line 63. Before:
```tsx
        <p className="font-machine font-black text-base text-gray-900 leading-tight truncate">
```

After:
```tsx
        <p className="font-inter font-semibold text-base text-gray-900 leading-tight truncate">
```

- [ ] **Step 2: Update jersey # label in `PlayerCard.tsx`**

Change line 73. Before:
```tsx
          <span className="text-gray-400 text-sm font-machine">
```

After:
```tsx
          <span className="text-gray-400 text-sm font-barlow-condensed">
```

- [ ] **Step 3: Update position badge text in `PlayerCard.tsx`**

Change line 67. Before:
```tsx
            className="inline-block px-2 py-0.5 rounded text-[9px] font-machine font-bold uppercase text-white"
```

After:
```tsx
            className="inline-block px-2 py-0.5 rounded text-[9px] font-inter font-bold uppercase text-white"
```

### RosterTab.tsx

- Filter pill buttons (position + gender) → `font-barlow font-semibold` (nav-tab level)
- Player count `"N / N players"` → `font-inter`
- Empty state message `"No players match this filter."` → `font-inter`

- [ ] **Step 4: Update `pillBase` constant in `RosterTab.tsx`**

Change line 41. Before:
```tsx
    "px-3.5 py-1.5 rounded-full text-[11px] font-machine font-black uppercase tracking-wider transition-all duration-150 cursor-pointer border";
```

After:
```tsx
    "px-3.5 py-1.5 rounded-full text-[11px] font-barlow font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer border";
```

- [ ] **Step 5: Update player count span in `RosterTab.tsx`**

Change line 62. Before:
```tsx
          <span className="text-xs text-gray-400 font-machine">
```

After:
```tsx
          <span className="text-xs text-gray-400 font-inter">
```

- [ ] **Step 6: Update empty state message in `RosterTab.tsx`**

Change line 104. Before:
```tsx
          <p className="text-center text-gray-400 font-machine py-16">
```

After:
```tsx
          <p className="text-center text-gray-400 font-inter py-16">
```

- [ ] **Step 7: Commit**

```bash
git add src/containers/SingleTeam/components/PlayerCard.tsx \
        src/containers/SingleTeam/components/RosterTab.tsx
git commit -m "feat: apply Inter and Barlow Condensed to player cards and roster filters"
```

---

## Task 7: TeamsCard — team listing card names

**Files:**
- Modify: `src/components/TeamsCard.tsx`

The team name `<motion.span>` on the teams listing page currently has `font-semibold` with no
explicit font family (inherits the body default). Add `font-barlow` to match the card-title
mapping.

- [ ] **Step 1: Update the team name span in `TeamsCard.tsx`**

Change line 70. Before:
```tsx
            className="text-sm md:text-base font-semibold uppercase tracking-widest"
```

After:
```tsx
            className="text-sm md:text-base font-barlow font-semibold uppercase tracking-widest"
```

- [ ] **Step 2: Update Teams.tsx error/empty state text**

In `src/containers/Team/Teams.tsx`, the error state label on line 49 and empty state label on
line 87 use `font-machine` for UI chrome. These are UI copy, not brand decoration → Inter.

Line 49, before:
```tsx
              <p className="font-machine text-sm tracking-widest uppercase text-white/40">
```

After:
```tsx
              <p className="font-inter text-sm tracking-widest uppercase text-white/40">
```

Line 57, before:
```tsx
              <p className="text-xs text-white/25 max-w-xs">
```
(no change needed — already no explicit font family)

Line 59, before:
```tsx
              className="mt-2 px-6 py-2.5 text-xs tracking-widest uppercase font-machine border border-white/20 rounded-lg text-white/70 hover:border-white/50 hover:text-white transition-all duration-200 cursor-pointer"
```

After:
```tsx
              className="mt-2 px-6 py-2.5 text-xs tracking-widest uppercase font-inter border border-white/20 rounded-lg text-white/70 hover:border-white/50 hover:text-white transition-all duration-200 cursor-pointer"
```

Line 87, before:
```tsx
              <p className="font-machine text-sm tracking-widest uppercase text-white/40">
```

After:
```tsx
              <p className="font-inter text-sm tracking-widest uppercase text-white/40">
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TeamsCard.tsx src/containers/Team/Teams.tsx
git commit -m "feat: apply Barlow SemiBold to teams listing cards and Inter to Teams page UI copy"
```

---

## Task 8: OverviewTab — overview tab body text

**Files:**
- Modify: `src/containers/SingleTeam/components/OverviewTab.tsx`

`SectionHeading` is already handled in Task 3 (it's a shared component). The remaining
`font-machine` usages in OverviewTab are:

- "2025 Season Stats" section label → Inter
- Inline stat values (the `text-3xl` numbers, different from `StatCard`) → Barlow Condensed Bold
- Inline stat labels → Inter
- "Standings" label → Inter
- "Full table" button → Inter
- Standings snippet: rank, team name, record → Inter
- "Recent Results" label → Inter
- "All results" button → Inter
- "Coaching Staff" label → Inter
- "Full staff" button → Inter
- Coach title (tiny `[9px]` label) → Inter
- Coach name (`font-machine font-black text-base`) → Inter SemiBold

- [ ] **Step 1: Update OverviewTab.tsx**

Replace the entire file content with:

```tsx
"use client";

import { motion } from "framer-motion";
import { ChevronRight, UserCircle } from "lucide-react";
import { fadeUp, staggerGrid } from "./types";
import type { CoachData, MatchResult, Standing, TeamStats } from "./types";
import { MatchResultRow } from "./MatchResultRow";
import { SectionHeading } from "./SectionHeading";
import type { Tab } from "./TabBar";

export function OverviewTab({
  stats,
  standings,
  teamSlug,
  results,
  headCoach,
  assistantCoach,
  primaryColor,
  onTabChange,
}: {
  stats: TeamStats;
  standings: Standing[];
  teamSlug: string;
  results: MatchResult[];
  headCoach: CoachData;
  assistantCoach: CoachData;
  primaryColor: string;
  onTabChange: (tab: Tab) => void;
}) {
  const winPct =
    stats.wins + stats.losses > 0
      ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
      : 0;

  const currentIdx = standings.findIndex((s) => s.teamSlug === teamSlug);
  const snippet = standings.slice(
    Math.max(0, currentIdx - 1),
    Math.min(standings.length, currentIdx + 2),
  );

  const last3 = results.slice(0, 3);

  const statItems = [
    { label: "Wins",     value: stats.wins          },
    { label: "Losses",   value: stats.losses         },
    { label: "Win %",    value: `${winPct}%`         },
    { label: "Pts For",  value: stats.pointsScored   },
    { label: "Pts Agst", value: stats.pointsAllowed  },
  ];

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Overview</SectionHeading>
        </div>

        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ── Card 1: Season Stats ─────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
          >
            <p className="text-xs text-gray-400 uppercase tracking-widest font-inter mb-5">
              2025 Season Stats
            </p>
            <div className="flex items-end gap-0">
              {statItems.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center text-center px-1 border-r border-gray-100 last:border-r-0"
                >
                  <span
                    className="font-barlow-condensed font-bold text-3xl leading-none tabular-nums"
                    style={{ color: primaryColor }}
                  >
                    {value}
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-inter mt-1.5 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 2: Standings Snapshot ───────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
                Standings
              </p>
              <button
                type="button"
                onClick={() => onTabChange("standings")}
                className="flex items-center gap-0.5 text-[11px] font-inter text-gray-400 hover:text-gray-700 transition-colors"
              >
                Full table <ChevronRight size={12} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-1">
              {snippet.map((s) => {
                const isCurrent = s.teamSlug === teamSlug;
                return (
                  <div
                    key={s.teamSlug}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={
                      isCurrent
                        ? {
                            background: `linear-gradient(90deg, ${primaryColor}14 0%, transparent 100%)`,
                            borderLeft: `2px solid ${primaryColor}`,
                          }
                        : {}
                    }
                  >
                    <span className="text-xs text-gray-400 font-inter w-4 flex-shrink-0">
                      {s.rank}
                    </span>
                    <span
                      className={[
                        "font-inter text-sm flex-1 truncate",
                        isCurrent ? "font-semibold text-gray-900" : "font-normal text-gray-600",
                      ].join(" ")}
                    >
                      {s.teamName}
                    </span>
                    <span
                      className={[
                        "font-inter text-xs tabular-nums",
                        isCurrent ? "font-semibold text-gray-900" : "text-gray-400",
                      ].join(" ")}
                    >
                      {s.wins}W–{s.losses}L
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Card 3: Last 3 Results ───────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
                Recent Results
              </p>
              <button
                type="button"
                onClick={() => onTabChange("results")}
                className="flex items-center gap-0.5 text-[11px] font-inter text-gray-400 hover:text-gray-700 transition-colors"
              >
                All results <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {last3.map((result) => (
                <MatchResultRow key={result.date + result.opponent} result={result} />
              ))}
            </div>
          </motion.div>

          {/* ── Card 4: Coaching Staff Snapshot ─────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
                Coaching Staff
              </p>
              <button
                type="button"
                onClick={() => onTabChange("staff")}
                className="flex items-center gap-0.5 text-[11px] font-inter text-gray-400 hover:text-gray-700 transition-colors"
              >
                Full staff <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {[headCoach, assistantCoach].map((coach) => (
                <div key={coach.title} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}18` }}
                  >
                    <UserCircle size={22} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-inter">
                      {coach.title}
                    </p>
                    <p className="font-inter font-semibold text-base text-gray-900 leading-tight mt-0.5">
                      {coach.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/OverviewTab.tsx
git commit -m "feat: apply font system to OverviewTab"
```

---

## Task 9: MatchResultRow — result and fixture rows

**Files:**
- Modify: `src/containers/SingleTeam/components/MatchResultRow.tsx`

Both `MatchResultRow` and `FixtureRow` live in this file.

Mapping:
- Date **month** abbreviation (MAR, APR…) → Inter Bold (metadata)
- Date **day** number → Barlow Condensed Bold (numeric display)
- Opponent name → Inter SemiBold (readable text)
- "Home" / "Away" caption → Inter (metadata)
- Score numbers → Barlow Condensed Bold (numeric display)
- "W" / "L" result pill → Inter Bold
- "TBD" fixture pill → Inter Bold
- Kickoff time in fixture row → Inter (metadata)

- [ ] **Step 1: Replace `MatchResultRow.tsx` with the updated file**

```tsx
"use client";

import type { MatchResult, Fixture } from "./types";

// ─── Result row ─────────────────────────────────────────────────────────────
export function MatchResultRow({ result }: { result: MatchResult }) {
  const isWin = result.result === "W";
  const [year, month, day] = result.date.split("-");
  const monthAbbr = new Date(`${year}-${month}-${day}`).toLocaleString("en", { month: "short" }).toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex items-stretch hover:bg-gray-50 transition-colors duration-150">
      {/* Left accent bar */}
      <div
        className="w-1 flex-shrink-0"
        style={{ backgroundColor: isWin ? "#16a34a" : "#dc2626" }}
      />

      <div className="flex items-center gap-4 px-4 py-3 flex-1 min-w-0">
        {/* Date block */}
        <div className="bg-gray-900 text-white rounded px-2.5 py-1.5 text-center flex-shrink-0 min-w-[44px]">
          <p className="text-[9px] font-inter font-bold leading-none">{monthAbbr}</p>
          <p className="text-sm font-barlow-condensed font-bold leading-none mt-0.5">{day}</p>
        </div>

        {/* Opponent */}
        <div className="flex-1 min-w-0">
          <p className="font-inter font-semibold text-sm text-gray-900 truncate">
            {result.isHome ? "vs" : "@"} {result.opponent}
          </p>
          <p className="text-[10px] text-gray-400 font-inter uppercase tracking-wide mt-0.5">
            {result.isHome ? "Home" : "Away"}
          </p>
        </div>

        {/* Score */}
        <div className="flex items-baseline gap-1.5 flex-shrink-0 font-barlow-condensed font-bold text-lg tabular-nums">
          <span style={{ color: isWin ? "#111827" : "#9ca3af" }}>
            {result.teamScore}
          </span>
          <span className="text-gray-300 text-base">–</span>
          <span style={{ color: isWin ? "#9ca3af" : "#111827" }}>
            {result.opponentScore}
          </span>
        </div>

        {/* Result pill */}
        <span
          className={[
            "flex-shrink-0 px-2.5 py-1 rounded text-[10px] font-inter font-bold uppercase",
            isWin
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600",
          ].join(" ")}
        >
          {result.result}
        </span>
      </div>
    </div>
  );
}

// ─── Fixture row ─────────────────────────────────────────────────────────────
export function FixtureRow({ fixture }: { fixture: Fixture }) {
  const [year, month, day] = fixture.date.split("-");
  const monthAbbr = new Date(`${year}-${month}-${day}`).toLocaleString("en", { month: "short" }).toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex items-stretch hover:bg-gray-50 transition-colors duration-150">
      {/* Left accent bar — gray for upcoming */}
      <div className="w-1 flex-shrink-0 bg-gray-200" />

      <div className="flex items-center gap-4 px-4 py-3 flex-1 min-w-0">
        {/* Date block */}
        <div className="bg-gray-100 text-gray-600 rounded px-2.5 py-1.5 text-center flex-shrink-0 min-w-[44px]">
          <p className="text-[9px] font-inter font-bold leading-none">{monthAbbr}</p>
          <p className="text-sm font-barlow-condensed font-bold leading-none mt-0.5">{day}</p>
        </div>

        {/* Opponent */}
        <div className="flex-1 min-w-0">
          <p className="font-inter font-semibold text-sm text-gray-700 truncate">
            {fixture.isHome ? "vs" : "@"} {fixture.opponent}
          </p>
          <p className="text-[10px] text-gray-400 font-inter uppercase tracking-wide mt-0.5">
            {fixture.isHome ? "Home" : "Away"} · {fixture.kickoffTime}
          </p>
        </div>

        {/* TBD pill */}
        <span className="flex-shrink-0 px-2.5 py-1 rounded text-[10px] font-inter font-bold uppercase bg-gray-100 text-gray-500">
          TBD
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/MatchResultRow.tsx
git commit -m "feat: apply font system to MatchResultRow and FixtureRow"
```

---

## Task 10: StandingsTab — league table

**Files:**
- Modify: `src/containers/SingleTeam/components/StandingsTab.tsx`

`SectionHeading` → already handled (shared component, Task 3).

Remaining mappings:
- "Season Form" label → Inter
- "W–L" wins/losses summary → Barlow Condensed Bold (numeric summary)
- Table header column labels → Inter Bold
- Table row: rank, team name, GP/W/L/PF/PA/+/- → Inter

- [ ] **Step 1: Replace `StandingsTab.tsx`**

```tsx
"use client";

import type { Standing } from "./types";
import { SectionHeading } from "./SectionHeading";

export function StandingsTab({
  standings,
  form,
  teamSlug,
  primaryColor,
}: {
  standings: Standing[];
  form: ('W' | 'L')[];
  teamSlug: string;
  primaryColor: string;
}) {
  const wins = form.filter((r) => r === "W").length;
  const losses = form.filter((r) => r === "L").length;

  const sorted = [...standings].sort((a, b) => b.wins - a.wins || a.losses - b.losses);

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Standings</SectionHeading>
        </div>

        {/* ── Form bar ──────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-inter">
              Season Form
            </span>
            <span className="font-barlow-condensed font-bold text-sm text-gray-900">
              {wins}W – {losses}L
            </span>
          </div>
          <div className="flex gap-1">
            {form.map((r, i) => (
              <div
                key={i}
                className="flex-1 h-3 rounded-sm"
                style={{ backgroundColor: r === "W" ? "#16a34a" : "#dc2626" }}
                title={r === "W" ? "Win" : "Loss"}
              />
            ))}
          </div>
        </div>

        {/* ── League table ──────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-[24px_1fr_40px_40px_40px_56px_56px_56px] gap-0 bg-gray-50 px-4 py-3">
            {["#", "Team", "GP", "W", "L", "PF", "PA", "+/−"].map((col, i) => (
              <span
                key={col}
                className={[
                  "text-[10px] text-gray-400 uppercase tracking-wider font-inter font-bold",
                  i > 1 ? "text-center" : "",
                  i === 7 ? "text-right" : "",
                ].join(" ")}
              >
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((s) => {
            const isCurrent = s.teamSlug === teamSlug;
            const diff = s.pointsFor - s.pointsAgainst;
            const diffColor =
              diff > 0 ? "#16a34a" : diff < 0 ? "#dc2626" : "#9ca3af";

            return (
              <div
                key={s.teamSlug}
                className="grid grid-cols-[24px_1fr_40px_40px_40px_56px_56px_56px] gap-0 border-t border-gray-50 px-4 py-3 items-center"
                style={
                  isCurrent
                    ? {
                        background: `linear-gradient(90deg, ${primaryColor}14 0%, transparent 100%)`,
                        borderLeft: `2px solid ${primaryColor}`,
                      }
                    : {}
                }
              >
                <span className="text-xs text-gray-400 font-inter">{s.rank}</span>
                <span
                  className={[
                    "font-inter text-sm truncate",
                    isCurrent ? "font-semibold text-gray-900" : "font-normal text-gray-700",
                  ].join(" ")}
                >
                  {s.teamName}
                </span>
                <span className="text-xs text-gray-500 font-inter text-center">{s.gp}</span>
                <span className={["text-xs font-inter text-center", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.wins}</span>
                <span className={["text-xs font-inter text-center", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.losses}</span>
                <span className={["text-xs font-inter text-center tabular-nums", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.pointsFor}</span>
                <span className={["text-xs font-inter text-center tabular-nums", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.pointsAgainst}</span>
                <span
                  className="text-xs font-inter font-semibold text-right tabular-nums"
                  style={{ color: isCurrent ? diffColor : "#9ca3af" }}
                >
                  {diff > 0 ? `+${diff}` : diff}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/StandingsTab.tsx
git commit -m "feat: apply font system to StandingsTab"
```

---

## Task 11: CoachCard and StaffTab — staff components

**Files:**
- Modify: `src/containers/SingleTeam/components/CoachCard.tsx`
- Modify: `src/containers/SingleTeam/components/StaffTab.tsx`

Both coach title (tiny metadata label) and coach name → Inter. Coach names are human names,
the canonical body-text use case.

### CoachCard.tsx

- [ ] **Step 1: Update `CoachCard.tsx`**

Change line 19. Before:
```tsx
        <p className="text-white/35 text-[9px] font-machine uppercase tracking-[0.22em]">
```

After:
```tsx
        <p className="text-white/35 text-[9px] font-inter uppercase tracking-[0.22em]">
```

Change line 22. Before:
```tsx
        <h3 className="text-white font-black font-machine text-base mt-0.5 leading-tight">
```

After:
```tsx
        <h3 className="text-white font-semibold font-inter text-base mt-0.5 leading-tight">
```

### StaffTab.tsx

Four changes:
1. Coach title label (line 57)
2. Coach name `<h3>` (line 60)
3. "Team Contact & Info" section label (line 71)
4. Info item label (line 79)
5. Info item value (line 82)

- [ ] **Step 2: Update `StaffTab.tsx`**

Line 57, before:
```tsx
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-machine">
```
After:
```tsx
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-inter">
```

Line 60, before:
```tsx
                <h3 className="font-machine font-black text-xl text-gray-900 leading-tight mt-0.5">
```
After:
```tsx
                <h3 className="font-inter font-semibold text-xl text-gray-900 leading-tight mt-0.5">
```

Line 71, before:
```tsx
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-machine mb-4">
```
After:
```tsx
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-inter mb-4">
```

Line 79, before:
```tsx
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-machine leading-none">
```
After:
```tsx
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-inter leading-none">
```

Line 82, before:
```tsx
                    <p className="font-machine font-black text-sm text-gray-900 mt-0.5">
```
After:
```tsx
                    <p className="font-inter font-semibold text-sm text-gray-900 mt-0.5">
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/CoachCard.tsx \
        src/containers/SingleTeam/components/StaffTab.tsx
git commit -m "feat: apply Inter to coach names and staff metadata"
```

---

## Task 12: ResultsTab — upcoming fixtures label

**Files:**
- Modify: `src/containers/SingleTeam/components/ResultsTab.tsx`

`SectionHeading` → already handled (Task 3). One remaining `font-machine` is the "Upcoming
Fixtures" section divider label.

- [ ] **Step 1: Update `ResultsTab.tsx`**

Change line 33. Before:
```tsx
              <p className="text-xs text-gray-400 uppercase tracking-widest font-machine">
```

After:
```tsx
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
```

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/ResultsTab.tsx
git commit -m "feat: apply Inter to ResultsTab section labels"
```

---

## Task 13: NewsCard — standalone news card component

**Files:**
- Modify: `src/containers/SingleTeam/components/NewsCard.tsx`

This component is a standalone card used independently of `NewsTab`. Three changes:
- Date badge → Inter Bold (metadata)
- Article title `<h3>` → Inter SemiBold
- "Read More" CTA → Barlow SemiBold

- [ ] **Step 1: Update `NewsCard.tsx`**

Line 40, before:
```tsx
          <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-machine font-bold uppercase bg-black/55 backdrop-blur-sm text-white/60 rounded leading-none">
```
After:
```tsx
          <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-inter font-bold uppercase bg-black/55 backdrop-blur-sm text-white/60 rounded leading-none">
```

Line 45, before:
```tsx
          <h3 className="text-white font-machine font-black text-sm leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity duration-300">
```
After:
```tsx
          <h3 className="text-white font-inter font-semibold text-sm leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity duration-300">
```

Lines 49–52, before:
```tsx
          <div
            className="mt-3 flex items-center gap-1 text-[11px] font-machine uppercase tracking-wider"
```
After:
```tsx
          <div
            className="mt-3 flex items-center gap-1 text-[11px] font-barlow font-semibold uppercase tracking-wider"
```

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/NewsCard.tsx
git commit -m "feat: apply Inter and Barlow SemiBold to NewsCard"
```

---

## Task 14: NewsTab — feature and grid article cards

**Files:**
- Modify: `src/containers/SingleTeam/components/NewsTab.tsx`

Mapping:
- Category badge (e.g. "Match Report") → Barlow SemiBold (card-title level label)
- Date caption → Inter (metadata)
- Article title `<h3>` → Inter SemiBold (readable body heading)
- Excerpt `<p>` → already has no explicit font family (inherits fine, no change needed)
- "Read More" CTA → Barlow SemiBold (nav-level CTA)
- "View All News" link → Barlow SemiBold

- [ ] **Step 1: Replace `NewsTab.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fadeUp, staggerGrid } from "./types";
import type { MockNewsArticle } from "./types";
import { SectionHeading } from "./SectionHeading";

function FeatureCard({
  article,
  teamSlug,
  primaryColor,
}: {
  article: MockNewsArticle;
  teamSlug: string;
  primaryColor: string;
}) {
  return (
    <Link
      href={`/teams/${teamSlug}/news/${article.slug}`}
      className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-5"
    >
      {/* Image */}
      <div className="relative h-72 w-full">
        <Image
          src={article.imageSrc}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

        {/* Category badge */}
        <span
          className="absolute top-4 left-4 px-2.5 py-1 rounded text-[10px] font-barlow font-semibold uppercase text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {article.category}
        </span>

        {/* Date */}
        <span className="absolute top-4 right-4 text-white/60 text-[10px] font-inter">
          {article.date}
        </span>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-inter font-semibold text-xl text-white leading-snug group-hover:opacity-80 transition-opacity duration-200">
            {article.title}
          </h3>
        </div>
      </div>

      {/* Excerpt + CTA */}
      <div className="bg-white px-5 py-4 flex items-center justify-between gap-4">
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <span
          className="flex items-center gap-1 text-[11px] font-barlow font-semibold uppercase whitespace-nowrap flex-shrink-0"
          style={{ color: primaryColor }}
        >
          Read More <ChevronRight size={12} />
        </span>
      </div>
    </Link>
  );
}

export function NewsTab({
  news,
  teamSlug,
  primaryColor,
}: {
  news: MockNewsArticle[];
  teamSlug: string;
  primaryColor: string;
}) {
  const [feature, ...rest] = news;

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Team News</SectionHeading>
        </div>

        {/* Feature article */}
        {feature && (
          <FeatureCard
            article={feature}
            teamSlug={teamSlug}
            primaryColor={primaryColor}
          />
        )}

        {/* Remaining articles */}
        {rest.length > 0 && (
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {rest.map((article) => (
              <motion.div key={article.id} variants={fadeUp}>
                <Link
                  href={`/teams/${teamSlug}/news/${article.slug}`}
                  className="group block rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 h-full flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={article.imageSrc}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-barlow font-semibold uppercase text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[10px] text-gray-400 font-inter mb-1.5">{article.date}</p>
                    <h3 className="font-inter font-semibold text-sm text-gray-900 leading-snug line-clamp-2 flex-1 group-hover:opacity-70 transition-opacity">
                      {article.title}
                    </h3>
                    <span
                      className="mt-3 flex items-center gap-1 text-[10px] font-barlow font-semibold uppercase tracking-wider"
                      style={{ color: primaryColor }}
                    >
                      Read More <ChevronRight size={10} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View all link */}
        <div className="mt-8 text-center">
          <Link
            href={`/teams/${teamSlug}/news`}
            className="inline-flex items-center gap-1.5 font-barlow font-semibold text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{ color: primaryColor }}
          >
            View All News <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/containers/SingleTeam/components/NewsTab.tsx
git commit -m "feat: apply Inter and Barlow SemiBold to news article cards"
```

---

## Task 15: Final build verification

- [ ] **Step 1: Run the build**

```bash
pnpm build
```

Expected: Build completes with no TypeScript errors and no import errors. The font loading
in `layout.tsx` will generate Next.js optimised font URLs at build time.

If the build fails with a font-related error, check that:
- Font names match exactly (`Barlow_Condensed`, `Barlow`, `Inter` — note underscores for multi-word names)
- Weights are strings, not numbers: `weight: ["700", "800"]` not `weight: [700, 800]`
- The `variable` option is set (without it, `next/font` uses `className` mode instead of CSS variable mode)

- [ ] **Step 2: Visual spot-check on dev server**

```bash
pnpm dev
```

Navigate to `/teams` and `/teams/<any-slug>` and verify:

| Element | Expected font appearance |
|---|---|
| Team name in hero | Condensed, heavy — Barlow Condensed ExtraBold |
| "Roster", "Standings", etc. section headings | Condensed, bold — Barlow Condensed Bold |
| Stat numbers (W/L/Win%) | Condensed, bold numerals — Barlow Condensed Bold |
| Tab bar (Overview, Roster…) | SemiBold sans-serif — Barlow SemiBold |
| Player names | Clean readable — Inter SemiBold |
| Table data (standings rows, scores) | Clean readable — Inter |
| Dates, captions, labels | Clean readable — Inter |
| Team name on /teams listing card | SemiBold sans-serif — Barlow SemiBold |
| Abbreviation watermarks (background) | No change — still ITC Machine Std |
| Any page outside /teams | No change — existing fonts unaffected |

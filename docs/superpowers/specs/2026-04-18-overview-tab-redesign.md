# Team Overview Tab — Redesign Spec

**Date:** 2026-04-18
**Status:** Approved (user-supplied design)

---

## Overview

Replace the existing 4-card OverviewTab grid with a premium two-column editorial layout that is darker, more sports-media-inspired, and visually heavier than the current implementation.

---

## Layout

Two-column CSS grid. Left column ≈ 60%, right column ≈ 40% (`grid-cols-[3fr_2fr]`). Both columns start at the same vertical position. Gap: 4 (tight). Stack to single column on mobile (`< lg`).

Outer section background: `#f5f5f5`.

---

## Left Column — top to bottom

### 1. Season Stats Bar
- A single dark strip (`bg-[#0a0e1a]`, `rounded-xl`)
- Five stats inline in one row: Wins, Losses, Win %, Pts For, Pts Agst
- Each stat: large bold white number (barlow-condensed) + small muted uppercase label (inter)
- Dividers between stats: `border-r border-white/10`
- Flush right: pulsing red dot (Tailwind `animate-ping`) + "LIVE UPDATE" muted label

### 2. Team Form
- White card, label: "RECENT FORM" with red bullet prefix
- Horizontally scrollable row of match result chips (overflow-x-auto, no scrollbar)
- Each chip (pill-card, `bg-gray-50 border border-gray-100 rounded-xl`):
  - CSS letter-avatar for opponent (24–28px circle, deterministic color from name hash)
  - H or A badge in tiny muted text
  - Score as `{teamScore}–{opponentScore}` in tabular bold
  - W/L pill: green (#16a34a) for W, red (#dc2626) for L
- Source: `results` prop (all past results)

### 3. Featured Story Card
- Full-width editorial card
- Background: `linear-gradient(135deg, #0a0e1a, #101828, #0d1b2a)` — no images
- Top: `EXCLUSIVE FEATURE` red pill + `5 MIN READ` muted label
- Headline: large, bold, all-caps italic, white, barlow-condensed
- Bottom row (border-top divider): Person icon + author, Calendar icon + date — muted gray
- Static/hardcoded content drawn from mockNews[3] (Captain interview)

### 4. Top Highlights
- White card with section label + "VIEW ALL" flush-right link
- Two equal-width cards in a grid
- Each card:
  - Dark gradient background (`#0a0e1a → #1a1a2e → #16213e`), `padding-bottom: 56.25%` aspect ratio
  - Centered Play button (frosted circle)
  - Duration badge bottom-left (9px bold white, semi-opaque bg)
  - Below: category in tiny muted uppercase, headline in bold white-ish small text (2 lines max)
- Content: static mock clip data

---

## Right Column (Sidebar) — top to bottom

### 1. Conference Standings
- White card
- Section label: "WESTERN CONFERENCE" with red bullet
- Table: Pos | Team (badge + name) | GP | Pts
  - Pts = wins × 3 (calculated)
  - CSS letter-avatar (22px) for each team
  - Active team row: `borderLeft: 2px solid #e63946`, `bg: rgba(230,57,70,0.04)`
  - Dividers: `divide-y divide-gray-100`
- "Full Table" link → `onTabChange("standings")`

### 2. Fixtures & Results
- White card
- Section label: "FIXTURES & RESULTS" with red bullet, "All" link → `onTabChange("matches")`
- Upcoming fixtures (dark `#0a0e1a` bg): date label + "Upcoming · HH:MM", team badge + abbr + VS + abbr + badge + H/A
- Past results (gray-50 bg, border-gray-100): date label + "Final", team badge + abbr + score + abbr + badge + H/A
- Source: `fixtures` prop (first 2) + `results` prop (first 3)

---

## Data / Props Changes

New OverviewTab props (replacing headCoach/assistantCoach with fixtures + teamAbbreviation):

```ts
{
  stats: TeamStats;
  standings: Standing[];
  teamSlug: string;
  teamAbbreviation: string;
  results: MatchResult[];
  fixtures: Fixture[];
  primaryColor: string;
  onTabChange: (tab: Tab) => void;
}
```

SingleTeam.tsx changes:
- Import `mockFixtures` from mockTeamData
- Pass `fixtures={mockFixtures}` and `teamAbbreviation={singleTeam.abbreviation ?? ""}` to OverviewTab
- Remove headCoach/assistantCoach from OverviewTab call

---

## Design Tokens

| Token | Value |
|---|---|
| Dark bg | `#0a0e1a` |
| Section bg | `#f5f5f5` |
| Accent red | `#e63946` |
| Win green | `#16a34a` |
| Loss red | `#dc2626` |
| Primary text | `#111` on light, `white` on dark |
| Section label | 11px, uppercase, bold, tracking-widest, barlow-condensed |
| Body | inter |
| Headers | barlow-condensed, font-black |

---

## Constraints

- No `<img>` tags — all badges are CSS letter-avatars
- No box-shadows on cards — use background contrast and 1px borders
- Tailwind utility classes throughout
- Framer Motion: use existing `fadeUp` + `staggerGrid` variants
- Fully responsive: single column on mobile

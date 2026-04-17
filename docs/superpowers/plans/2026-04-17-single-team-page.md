# SingleTeam Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a rich, data-dense SingleTeam page with tabbed navigation (Overview · Roster · Results · Standings · Staff · News) on a white background, using mock data for standings/results/news until Sanity schema catches up.

**Architecture:** Client-side tab `useState` in `SingleTeam.tsx`; all data fetched once (existing Sanity query + mock imports); six tab components each rendering their own section; mock data centralised in `mockTeamData.ts` with typed interfaces matching the shape a future Sanity response would return.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, TanStack Query (all existing)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/containers/SingleTeam/mockTeamData.ts` | **Create** | All mock data (standings, results, fixtures, form, news, player genders) |
| `src/containers/SingleTeam/components/types.ts` | **Modify** | Add Standing, MatchResult, Fixture, MockNewsArticle, PlayerGender; extend Player |
| `src/containers/SingleTeam/components/HeroSection.tsx` | **Modify** | Accept `leagueRank?: number` prop, render in info strip |
| `src/containers/SingleTeam/components/PlayerCard.tsx` | **Rewrite** | Photo-forward card: gradient header, avatar overlap, white body |
| `src/containers/SingleTeam/components/TabBar.tsx` | **Create** | Sticky tab strip, active underline in primaryColor |
| `src/containers/SingleTeam/components/MatchResultRow.tsx` | **Create** | Shared row used by OverviewTab + ResultsTab |
| `src/containers/SingleTeam/components/OverviewTab.tsx` | **Create** | 2×2 snapshot grid: stats, standings, last-3 results, staff |
| `src/containers/SingleTeam/components/RosterTab.tsx` | **Create** | Position + gender filter pills + PlayerCard grid |
| `src/containers/SingleTeam/components/ResultsTab.tsx` | **Create** | Full result list + upcoming fixtures |
| `src/containers/SingleTeam/components/StandingsTab.tsx` | **Create** | Form bar + full league table |
| `src/containers/SingleTeam/components/StaffTab.tsx` | **Create** | Coach cards + team info strip |
| `src/containers/SingleTeam/components/NewsTab.tsx` | **Create** | Feature card (first article) + NewsCard grid |
| `src/containers/SingleTeam/SingleTeam.tsx` | **Rewrite** | Tab state, data wiring, remove old sections |

**Files to delete** (their responsibilities are absorbed by the tabs above):
- `src/containers/SingleTeam/components/StatsStrip.tsx`
- `src/containers/SingleTeam/components/RosterSection.tsx`
- `src/containers/SingleTeam/components/CoachingSection.tsx`
- `src/containers/SingleTeam/components/TeamNewsSection.tsx`
- `src/containers/SingleTeam/components/FooterSocialSection.tsx`

---

## Task 1: Extend types and create mock data

**Files:**
- Modify: `src/containers/SingleTeam/components/types.ts`
- Create: `src/containers/SingleTeam/mockTeamData.ts`

- [ ] **Step 1: Extend types.ts with new interfaces**

Replace the file contents entirely (preserving all existing exports, adding new ones):

```typescript
// src/containers/SingleTeam/components/types.ts

export type PlayerGender = 'Male' | 'Female';

export interface Player {
  id: number;
  jerseyNumber: number;
  name: string;
  position: string;
  photo?: string;
  isCaptain?: boolean;
  gender: PlayerGender;
}

export interface CoachData {
  name: string;
  title: string;
}

export interface NewsArticle {
  id: number;
  imageSrc: string;
  writeup: string;
  date: string;
  slug: string;
}

export interface TeamSocialLinks {
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
}

export interface TeamStats {
  wins: number;
  losses: number;
  pointsScored: number;
  pointsAllowed: number;
}

export interface CarouselItem {
  src: string;
  caption: string;
}

export interface Standing {
  rank: number;
  teamName: string;
  teamSlug: string;
  gp: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
}

export interface MatchResult {
  date: string;        // ISO "2026-04-12"
  opponent: string;
  teamScore: number;   // this team's score
  opponentScore: number;
  isHome: boolean;
  result: 'W' | 'L';
}

export interface Fixture {
  date: string;        // ISO "2026-04-19"
  opponent: string;
  kickoffTime: string; // "14:00"
  isHome: boolean;
}

export interface MockNewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageSrc: string;
  slug: string;
}

export interface SingleTeamProps {
  slug: string;
}

export const EASE = [0.22, 1, 0.36, 1] as const;

export const POSITION_COLORS: Record<string, string> = {
  QB: '#1d4ed8',
  WR: '#15803d',
  RB: '#0f766e',
  CB: '#b91c1c',
  LB: '#b45309',
  S: '#7c3aed',
  DE: '#c2410c',
  TE: '#0f766e',
  C: '#be185d',
  OL: '#374151',
  DL: '#1e3a5f',
  K: '#6b21a8',
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};
```

- [ ] **Step 2: Create mockTeamData.ts**

```typescript
// src/containers/SingleTeam/mockTeamData.ts

import type {
  Standing,
  MatchResult,
  Fixture,
  MockNewsArticle,
  PlayerGender,
  TeamStats,
} from './components/types';

// ─── League standings ──────────────────────────────────────────────────────
// teamSlug must match the URL slug of the team whose page is being viewed.
// Update teamSlug values if your real team slugs differ.
export const mockStandings: Standing[] = [
  { rank: 1, teamName: 'Lagos Lions',       teamSlug: 'lagos-lions',       gp: 6, wins: 5, losses: 1, pointsFor: 182, pointsAgainst: 87  },
  { rank: 2, teamName: 'Abuja Eagles',      teamSlug: 'abuja-eagles',      gp: 6, wins: 4, losses: 2, pointsFor: 154, pointsAgainst: 103 },
  { rank: 3, teamName: 'PH Bolts',          teamSlug: 'ph-bolts',          gp: 6, wins: 3, losses: 3, pointsFor: 131, pointsAgainst: 128 },
  { rank: 4, teamName: 'Kano Chiefs',       teamSlug: 'kano-chiefs',       gp: 6, wins: 2, losses: 4, pointsFor: 110, pointsAgainst: 149 },
  { rank: 5, teamName: 'Enugu Storm',       teamSlug: 'enugu-storm',       gp: 6, wins: 1, losses: 5, pointsFor: 94,  pointsAgainst: 187 },
];

// ─── Season stats ──────────────────────────────────────────────────────────
export const mockStats: TeamStats = {
  wins: 4,
  losses: 2,
  pointsScored: 154,
  pointsAllowed: 103,
};

// ─── Recent results ────────────────────────────────────────────────────────
export const mockResults: MatchResult[] = [
  { date: '2026-04-12', opponent: 'Lagos Lions',  teamScore: 21, opponentScore: 14, isHome: true,  result: 'W' },
  { date: '2026-04-05', opponent: 'Abuja Eagles', teamScore: 10, opponentScore: 28, isHome: false, result: 'L' },
  { date: '2026-03-29', opponent: 'PH Bolts',     teamScore: 35, opponentScore: 7,  isHome: true,  result: 'W' },
  { date: '2026-03-22', opponent: 'Enugu Storm',  teamScore: 28, opponentScore: 14, isHome: false, result: 'W' },
  { date: '2026-03-15', opponent: 'Kano Chiefs',  teamScore: 17, opponentScore: 21, isHome: true,  result: 'L' },
  { date: '2026-03-08', opponent: 'Lagos Lions',  teamScore: 31, opponentScore: 10, isHome: false, result: 'W' },
];

// ─── Upcoming fixtures ─────────────────────────────────────────────────────
export const mockFixtures: Fixture[] = [
  { date: '2026-04-19', opponent: 'Kano Chiefs',  kickoffTime: '14:00', isHome: true  },
  { date: '2026-04-26', opponent: 'Enugu Storm',  kickoffTime: '16:00', isHome: false },
  { date: '2026-05-03', opponent: 'PH Bolts',     kickoffTime: '12:00', isHome: true  },
];

// ─── Season form (oldest → most recent) ───────────────────────────────────
export const mockForm: ('W' | 'L')[] = ['W', 'L', 'W', 'W', 'L', 'W'];

// ─── Player genders (keyed by player name for quick lookup) ───────────────
// Add an entry for every player in the Sanity roster.
// Players not listed here default to 'Male'.
export const mockPlayerGenders: Record<string, PlayerGender> = {
  'Amaka Osei':     'Female',
  'Chisom Nwosu':   'Female',
  'Blessing Adaora':'Female',
};

// ─── News articles ─────────────────────────────────────────────────────────
export const mockNews: MockNewsArticle[] = [
  {
    id: 1,
    title: 'Match Report: 21–14 Victory Over Lagos Lions',
    excerpt: 'A dominant second-half performance sealed a crucial home victory as the team climbed to second place in the CFFL standings.',
    date: '2026-04-12',
    category: 'Match Report',
    imageSrc: 'https://picsum.photos/seed/cffl-news-1/800/400',
    slug: 'match-report-21-14-victory-lagos-lions',
  },
  {
    id: 2,
    title: 'Pre-Season Training Camp Begins This Weekend',
    excerpt: 'Coaches and players gather for the annual two-day training camp ahead of the second half of the season.',
    date: '2026-04-08',
    category: 'Training',
    imageSrc: 'https://picsum.photos/seed/cffl-news-2/800/400',
    slug: 'pre-season-training-camp-begins',
  },
  {
    id: 3,
    title: 'Three New Players Join the Roster',
    excerpt: 'The team announces signings from across Nigeria, bolstering both the offensive line and defensive backfield.',
    date: '2026-04-02',
    category: 'Transfers',
    imageSrc: 'https://picsum.photos/seed/cffl-news-3/800/400',
    slug: 'three-new-players-join-roster',
  },
  {
    id: 4,
    title: 'Captain Speaks Ahead of Rivalry Fixture',
    excerpt: 'In an exclusive interview, the team captain shares his thoughts on the upcoming clash and what the squad has been working on.',
    date: '2026-03-28',
    category: 'Interview',
    imageSrc: 'https://picsum.photos/seed/cffl-news-4/800/400',
    slug: 'captain-speaks-ahead-rivalry-fixture',
  },
  {
    id: 5,
    title: 'CFFL Community Day Recap',
    excerpt: 'Hundreds of fans turned out for the annual community day event, with flag football clinics for children of all ages.',
    date: '2026-03-20',
    category: 'Community',
    imageSrc: 'https://picsum.photos/seed/cffl-news-5/800/400',
    slug: 'cffl-community-day-recap',
  },
];
```

- [ ] **Step 3: Type-check**

```bash
cd /path/to/cffl-landing-page
pnpm tsc --noEmit
```

Expected: no errors related to the new types file (there may be pre-existing errors from `ignoreBuildErrors: true` — ignore those).

- [ ] **Step 4: Commit**

```bash
git add src/containers/SingleTeam/components/types.ts src/containers/SingleTeam/mockTeamData.ts
git commit -m "feat: add Standing, MatchResult, Fixture, MockNewsArticle types and mock data"
```

---

## Task 2: Hero rank refinement

**Files:**
- Modify: `src/containers/SingleTeam/components/HeroSection.tsx`

- [ ] **Step 1: Add `leagueRank` prop to HeroSection**

Add `leagueRank?: number` to the props destructuring and interface:

```typescript
// In HeroSection.tsx — change the props signature from:
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
  // ...
})

// To:
export function HeroSection({
  teamName,
  abbreviation,
  primaryColor,
  secondaryColor,
  foundedYear,
  bannerImage,
  logoImage,
  socialLinks,
  leagueRank,
}: {
  teamName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  foundedYear: number;
  bannerImage: string;
  logoImage?: string;
  socialLinks: TeamSocialLinks;
  leagueRank?: number;
})
```

- [ ] **Step 2: Add rank to the info strip**

Find the existing info strip array inside HeroSection.tsx:

```typescript
// Existing:
{[
  { label: "Conference", value: "CFFL" },
  { label: "Founded", value: String(foundedYear) },
  { label: "Location", value: "Lagos, NG" },
].map(...)}
```

Replace with (add rank at the end, conditionally):

```typescript
{[
  { label: "Conference", value: "CFFL" },
  { label: "Founded", value: String(foundedYear) },
  { label: "Location", value: "Lagos, NG" },
  ...(leagueRank !== undefined ? [{ label: "Rank", value: `#${leagueRank}` }] : []),
].map(({ label, value }, i, arr) => (
  <div key={label} className="flex items-center gap-5 flex-shrink-0">
    <div className="flex items-center gap-2">
      <span
        className="text-white/35 text-[10px] uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {label}
      </span>
      <span
        className="text-[11px] font-bold whitespace-nowrap"
        style={{
          fontFamily: "ITC Machine Std, sans-serif",
          color: label === "Rank" ? primaryColor : "white",
        }}
      >
        {value}
      </span>
    </div>
    {i < arr.length - 1 && <div className="h-3 w-px bg-white/15" />}
  </div>
))}
```

- [ ] **Step 3: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/containers/SingleTeam/components/HeroSection.tsx
git commit -m "feat: add leagueRank prop to HeroSection info strip"
```

---

## Task 3: Rewrite PlayerCard (photo-forward, white background)

**Files:**
- Rewrite: `src/containers/SingleTeam/components/PlayerCard.tsx`

- [ ] **Step 1: Rewrite PlayerCard.tsx**

```typescript
"use client";

import { motion } from "framer-motion";
import { Star, UserCircle } from "lucide-react";
import Image from "next/image";
import { fadeUp, POSITION_COLORS } from "./types";
import type { Player } from "./types";

export function PlayerCard({
  player,
  primaryColor,
}: {
  player: Player;
  primaryColor: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      {/* ── Gradient header ─────────────────────────────────────────────── */}
      <div
        className="relative h-36 flex items-center justify-center overflow-visible"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Captain badge */}
        {player.isCaptain && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-yellow-400 text-yellow-900 text-[9px] font-machine font-black uppercase z-10 leading-none">
            <Star size={8} fill="currentColor" />
            <span>CAP</span>
          </div>
        )}

        {/* Jersey number watermark */}
        <span
          className="absolute font-machine font-black text-white/10 select-none leading-none"
          style={{ fontSize: "clamp(72px, 12vw, 110px)" }}
          aria-hidden="true"
        >
          {player.jerseyNumber}
        </span>

        {/* Avatar circle — overlaps bottom edge */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center z-10 overflow-hidden shadow-sm">
          {player.photo ? (
            <Image
              src={player.photo}
              alt={player.name}
              fill
              className="object-cover"
            />
          ) : (
            <UserCircle size={40} className="text-gray-300" />
          )}
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────────────── */}
      <div className="pt-12 pb-5 px-4 text-center">
        <p className="font-machine font-black text-base text-gray-900 leading-tight truncate">
          {player.name}
        </p>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span
            className="inline-block px-2 py-0.5 rounded text-[9px] font-machine font-bold uppercase text-white"
            style={{ backgroundColor: POSITION_COLORS[player.position] ?? "#374151" }}
          >
            {player.position}
          </span>
          <span className="text-gray-400 text-sm font-machine">
            #{player.jerseyNumber}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/PlayerCard.tsx
git commit -m "feat: rewrite PlayerCard to photo-forward white-bg style"
```

---

## Task 4: Create TabBar component

**Files:**
- Create: `src/containers/SingleTeam/components/TabBar.tsx`

- [ ] **Step 1: Create TabBar.tsx**

```typescript
"use client";

const TABS = [
  { id: "overview",   label: "Overview"  },
  { id: "roster",     label: "Roster"    },
  { id: "results",    label: "Results"   },
  { id: "standings",  label: "Standings" },
  { id: "staff",      label: "Staff"     },
  { id: "news",       label: "News"      },
] as const;

export type Tab = typeof TABS[number]["id"];

export function TabBar({
  activeTab,
  onTabChange,
  primaryColor,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  primaryColor: string;
}) {
  return (
    <nav
      className="sticky top-0 z-40 bg-white border-b border-gray-200 overflow-x-auto"
      aria-label="Team page sections"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20">
        <div className="flex items-end gap-0 min-w-max">
          {TABS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={[
                  "relative px-5 py-4 text-sm font-machine font-black uppercase tracking-wider whitespace-nowrap transition-colors duration-150",
                  isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-700",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
                {/* Active underline */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/TabBar.tsx
git commit -m "feat: create TabBar component with sticky active-underline tabs"
```

---

## Task 5: Create MatchResultRow (shared component)

**Files:**
- Create: `src/containers/SingleTeam/components/MatchResultRow.tsx`

- [ ] **Step 1: Create MatchResultRow.tsx**

This component is used by both OverviewTab (last 3 results) and ResultsTab (full list).

```typescript
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
          <p className="text-[9px] font-machine font-bold leading-none">{monthAbbr}</p>
          <p className="text-sm font-machine font-black leading-none mt-0.5">{day}</p>
        </div>

        {/* Opponent */}
        <div className="flex-1 min-w-0">
          <p className="font-machine font-black text-sm text-gray-900 truncate">
            {result.isHome ? "vs" : "@"} {result.opponent}
          </p>
          <p className="text-[10px] text-gray-400 font-machine uppercase tracking-wide mt-0.5">
            {result.isHome ? "Home" : "Away"}
          </p>
        </div>

        {/* Score */}
        <div className="flex items-baseline gap-1.5 flex-shrink-0 font-machine font-black text-lg tabular-nums">
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
            "flex-shrink-0 px-2.5 py-1 rounded text-[10px] font-machine font-black uppercase",
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
          <p className="text-[9px] font-machine font-bold leading-none">{monthAbbr}</p>
          <p className="text-sm font-machine font-black leading-none mt-0.5">{day}</p>
        </div>

        {/* Opponent */}
        <div className="flex-1 min-w-0">
          <p className="font-machine font-black text-sm text-gray-700 truncate">
            {fixture.isHome ? "vs" : "@"} {fixture.opponent}
          </p>
          <p className="text-[10px] text-gray-400 font-machine uppercase tracking-wide mt-0.5">
            {fixture.isHome ? "Home" : "Away"} · {fixture.kickoffTime}
          </p>
        </div>

        {/* TBD pill */}
        <span className="flex-shrink-0 px-2.5 py-1 rounded text-[10px] font-machine font-black uppercase bg-gray-100 text-gray-500">
          TBD
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/MatchResultRow.tsx
git commit -m "feat: create MatchResultRow and FixtureRow shared components"
```

---

## Task 6: Create OverviewTab

**Files:**
- Create: `src/containers/SingleTeam/components/OverviewTab.tsx`

- [ ] **Step 1: Create OverviewTab.tsx**

```typescript
"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { UserCircle } from "lucide-react";
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
  const wins = stats.wins;
  const losses = stats.losses;

  const statItems = [
    { label: "Wins",     value: wins     },
    { label: "Losses",   value: losses   },
    { label: "Win %",    value: `${winPct}%` },
    { label: "Pts For",  value: stats.pointsScored  },
    { label: "Pts Agst", value: stats.pointsAllowed },
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
            <p className="text-xs text-gray-400 uppercase tracking-widest font-machine mb-5">
              2025 Season Stats
            </p>
            <div className="flex items-end gap-0">
              {statItems.map(({ label, value }, i) => (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center text-center px-1 border-r border-gray-100 last:border-r-0"
                >
                  <span
                    className="font-machine font-black text-3xl leading-none tabular-nums"
                    style={{ color: primaryColor }}
                  >
                    {value}
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-machine mt-1.5 leading-snug">
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
              <p className="text-xs text-gray-400 uppercase tracking-widest font-machine">
                Standings
              </p>
              <button
                type="button"
                onClick={() => onTabChange("standings")}
                className="flex items-center gap-0.5 text-[11px] font-machine text-gray-400 hover:text-gray-700 transition-colors"
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
                    <span className="text-xs text-gray-400 font-machine w-4 flex-shrink-0">
                      {s.rank}
                    </span>
                    <span
                      className={[
                        "font-machine text-sm flex-1 truncate",
                        isCurrent ? "font-black text-gray-900" : "font-medium text-gray-600",
                      ].join(" ")}
                    >
                      {s.teamName}
                    </span>
                    <span className={["font-machine text-xs tabular-nums", isCurrent ? "font-black text-gray-900" : "text-gray-400"].join(" ")}>
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
              <p className="text-xs text-gray-400 uppercase tracking-widest font-machine">
                Recent Results
              </p>
              <button
                type="button"
                onClick={() => onTabChange("results")}
                className="flex items-center gap-0.5 text-[11px] font-machine text-gray-400 hover:text-gray-700 transition-colors"
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
              <p className="text-xs text-gray-400 uppercase tracking-widest font-machine">
                Coaching Staff
              </p>
              <button
                type="button"
                onClick={() => onTabChange("staff")}
                className="flex items-center gap-0.5 text-[11px] font-machine text-gray-400 hover:text-gray-700 transition-colors"
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
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-machine">
                      {coach.title}
                    </p>
                    <p className="font-machine font-black text-base text-gray-900 leading-tight mt-0.5">
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

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/OverviewTab.tsx
git commit -m "feat: create OverviewTab with stats, standings snapshot, last-3 results, coaching snapshot"
```

---

## Task 7: Create RosterTab

**Files:**
- Create: `src/containers/SingleTeam/components/RosterTab.tsx`

- [ ] **Step 1: Create RosterTab.tsx**

```typescript
"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { staggerGrid } from "./types";
import type { Player, PlayerGender } from "./types";
import { PlayerCard } from "./PlayerCard";
import { SectionHeading } from "./SectionHeading";

type PositionFilter = "All" | string;
type GenderFilter = "All" | PlayerGender;

export function RosterTab({
  roster,
  primaryColor,
}: {
  roster: Player[];
  primaryColor: string;
}) {
  const [posFilter, setPosFilter] = useState<PositionFilter>("All");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("All");

  // Derive unique positions from the actual roster
  const positions = useMemo<string[]>(() => {
    const seen = new Set<string>();
    roster.forEach((p) => { if (p.position) seen.add(p.position); });
    return Array.from(seen).sort();
  }, [roster]);

  const filtered = useMemo(
    () =>
      roster.filter((p) => {
        const posMatch = posFilter === "All" || p.position === posFilter;
        const genMatch = genderFilter === "All" || p.gender === genderFilter;
        return posMatch && genMatch;
      }),
    [roster, posFilter, genderFilter],
  );

  const pillBase =
    "px-3.5 py-1.5 rounded-full text-[11px] font-machine font-black uppercase tracking-wider transition-all duration-150 cursor-pointer border";

  const activePill = (color: string) => ({
    backgroundColor: color,
    color: "#fff",
    borderColor: color,
  });

  const inactivePill = {
    backgroundColor: "transparent",
    color: "#6b7280",
    borderColor: "#e5e7eb",
  };

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading + count */}
        <div className="flex items-center justify-between mb-6">
          <SectionHeading primaryColor={primaryColor}>Roster</SectionHeading>
          <span className="text-xs text-gray-400 font-machine">
            {filtered.length} / {roster.length} players
          </span>
        </div>

        {/* ── Position filters ─────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(["All", ...positions] as PositionFilter[]).map((pos) => {
            const isActive = posFilter === pos;
            return (
              <button
                key={pos}
                type="button"
                onClick={() => setPosFilter(pos)}
                className={pillBase}
                style={isActive ? activePill(primaryColor) : inactivePill}
              >
                {pos}
              </button>
            );
          })}
        </div>

        {/* ── Gender filters ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["All", "Male", "Female"] as GenderFilter[]).map((g) => {
            const isActive = genderFilter === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGenderFilter(g)}
                className={pillBase}
                style={isActive ? activePill(primaryColor) : inactivePill}
              >
                {g}
              </button>
            );
          })}
        </div>

        {/* ── Player grid ─────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 font-machine py-16">
            No players match this filter.
          </p>
        ) : (
          <motion.div
            key={`${posFilter}-${genderFilter}`}
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                primaryColor={primaryColor}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/RosterTab.tsx
git commit -m "feat: create RosterTab with position and gender filter pills"
```

---

## Task 8: Create ResultsTab

**Files:**
- Create: `src/containers/SingleTeam/components/ResultsTab.tsx`

- [ ] **Step 1: Create ResultsTab.tsx**

```typescript
"use client";

import type { MatchResult, Fixture } from "./types";
import { MatchResultRow, FixtureRow } from "./MatchResultRow";
import { SectionHeading } from "./SectionHeading";

export function ResultsTab({
  results,
  fixtures,
  primaryColor,
}: {
  results: MatchResult[];
  fixtures: Fixture[];
  primaryColor: string;
}) {
  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Recent Results */}
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Recent Results</SectionHeading>
        </div>
        <div className="flex flex-col gap-2.5">
          {results.map((result) => (
            <MatchResultRow key={result.date + result.opponent} result={result} />
          ))}
        </div>

        {/* Upcoming Fixtures */}
        {fixtures.length > 0 && (
          <>
            <div className="mt-10 mb-4 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-machine">
                Upcoming Fixtures
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {fixtures.map((fixture) => (
                <FixtureRow key={fixture.date + fixture.opponent} fixture={fixture} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/ResultsTab.tsx
git commit -m "feat: create ResultsTab with W/L accent rows and upcoming fixtures"
```

---

## Task 9: Create StandingsTab

**Files:**
- Create: `src/containers/SingleTeam/components/StandingsTab.tsx`

- [ ] **Step 1: Create StandingsTab.tsx**

```typescript
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
            <span className="text-xs text-gray-400 uppercase tracking-widest font-machine">
              Season Form
            </span>
            <span className="font-machine font-black text-sm text-gray-900">
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
                  "text-[10px] text-gray-400 uppercase tracking-wider font-machine font-bold",
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
                <span className="text-xs text-gray-400 font-machine">{s.rank}</span>
                <span
                  className={[
                    "font-machine text-sm truncate",
                    isCurrent ? "font-black text-gray-900" : "font-medium text-gray-700",
                  ].join(" ")}
                >
                  {s.teamName}
                </span>
                <span className="text-xs text-gray-500 font-machine text-center">{s.gp}</span>
                <span className={["text-xs font-machine text-center", isCurrent ? "font-black text-gray-900" : "text-gray-700"].join(" ")}>{s.wins}</span>
                <span className={["text-xs font-machine text-center", isCurrent ? "font-black text-gray-900" : "text-gray-700"].join(" ")}>{s.losses}</span>
                <span className={["text-xs font-machine text-center tabular-nums", isCurrent ? "font-black text-gray-900" : "text-gray-700"].join(" ")}>{s.pointsFor}</span>
                <span className={["text-xs font-machine text-center tabular-nums", isCurrent ? "font-black text-gray-900" : "text-gray-700"].join(" ")}>{s.pointsAgainst}</span>
                <span
                  className="text-xs font-machine font-bold text-right tabular-nums"
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

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/StandingsTab.tsx
git commit -m "feat: create StandingsTab with form bar and full league table"
```

---

## Task 10: Create StaffTab

**Files:**
- Create: `src/containers/SingleTeam/components/StaffTab.tsx`

- [ ] **Step 1: Create StaffTab.tsx**

```typescript
"use client";

import { UserCircle, Mail, Phone, Globe, MapPin } from "lucide-react";
import type { CoachData } from "./types";
import { SectionHeading } from "./SectionHeading";

export function StaffTab({
  headCoach,
  assistantCoach,
  primaryColor,
  email,
  phone,
  url,
  country,
  state,
}: {
  headCoach: CoachData;
  assistantCoach: CoachData;
  primaryColor: string;
  email?: string;
  phone?: string;
  url?: string;
  country?: string;
  state?: string;
}) {
  const coaches = [headCoach, assistantCoach];

  const infoItems = [
    { icon: Mail,  label: "Email",   value: email   },
    { icon: Phone, label: "Phone",   value: phone   },
    { icon: Globe, label: "Website", value: url     },
    { icon: MapPin,label: "Location",value: [state, country].filter(Boolean).join(", ") || undefined },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Coaching Staff</SectionHeading>
        </div>

        {/* ── Coach cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {coaches.map((coach) => (
            <div
              key={coach.title}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-5"
              style={{ borderLeft: `4px solid ${primaryColor}` }}
            >
              <div
                className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}18` }}
              >
                <UserCircle size={28} style={{ color: primaryColor }} />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-machine">
                  {coach.title}
                </p>
                <h3 className="font-machine font-black text-xl text-gray-900 leading-tight mt-0.5">
                  {coach.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ── Team info strip ───────────────────────────────────────────── */}
        {infoItems.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-machine mb-4">
              Team Contact & Info
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} className="text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-machine leading-none">
                      {label}
                    </p>
                    <p className="font-machine font-black text-sm text-gray-900 mt-0.5">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/StaffTab.tsx
git commit -m "feat: create StaffTab with coach cards and team info strip"
```

---

## Task 11: Create NewsTab

**Files:**
- Create: `src/containers/SingleTeam/components/NewsTab.tsx`

- [ ] **Step 1: Create NewsTab.tsx**

```typescript
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
          className="absolute top-4 left-4 px-2.5 py-1 rounded text-[10px] font-machine font-black uppercase text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {article.category}
        </span>

        {/* Date */}
        <span className="absolute top-4 right-4 text-white/60 text-[10px] font-machine">
          {article.date}
        </span>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-machine font-black text-xl text-white leading-snug group-hover:opacity-80 transition-opacity duration-200">
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
          className="flex items-center gap-1 text-[11px] font-machine font-black uppercase whitespace-nowrap flex-shrink-0"
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
            {rest.map((article, i) => (
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
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-machine font-black uppercase text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[10px] text-gray-400 font-machine mb-1.5">{article.date}</p>
                    <h3 className="font-machine font-black text-sm text-gray-900 leading-snug line-clamp-2 flex-1 group-hover:opacity-70 transition-opacity">
                      {article.title}
                    </h3>
                    <span
                      className="mt-3 flex items-center gap-1 text-[10px] font-machine uppercase tracking-wider"
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
            className="inline-flex items-center gap-1.5 font-machine font-black text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
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

- [ ] **Step 2: Type-check**

```bash
pnpm tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/containers/SingleTeam/components/NewsTab.tsx
git commit -m "feat: create NewsTab with feature card and article grid"
```

---

## Task 12: Rewrite SingleTeam.tsx and clean up dead files

**Files:**
- Rewrite: `src/containers/SingleTeam/SingleTeam.tsx`
- Delete: `src/containers/SingleTeam/components/StatsStrip.tsx`
- Delete: `src/containers/SingleTeam/components/RosterSection.tsx`
- Delete: `src/containers/SingleTeam/components/CoachingSection.tsx`
- Delete: `src/containers/SingleTeam/components/TeamNewsSection.tsx`
- Delete: `src/containers/SingleTeam/components/FooterSocialSection.tsx`

- [ ] **Step 1: Rewrite SingleTeam.tsx**

```typescript
"use client";

import { useState } from "react";
import { ErrorState } from "./components/ErrorState";
import { HeroSection } from "./components/HeroSection";
import { LoadingState } from "./components/LoadingState";
import { OverviewTab } from "./components/OverviewTab";
import { RosterTab } from "./components/RosterTab";
import { ResultsTab } from "./components/ResultsTab";
import { StandingsTab } from "./components/StandingsTab";
import { StaffTab } from "./components/StaffTab";
import { NewsTab } from "./components/NewsTab";
import { TabBar } from "./components/TabBar";
import type { Tab } from "./components/TabBar";
import type { SingleTeamProps } from "./components/types";
import useSingleTeamLogic from "./logic";
import {
  mockStandings,
  mockStats,
  mockResults,
  mockFixtures,
  mockForm,
  mockNews,
  mockPlayerGenders,
} from "./mockTeamData";

export type { SingleTeamProps };

const isColorDark = (hex: string) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
};

const SingleTeam = ({ slug }: Pick<SingleTeamProps, "slug">) => {
  const { singleTeam, isPending, isError, error, refetch } = useSingleTeamLogic(slug);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />;
  if (!singleTeam) return <ErrorState message="This team could not be found." />;

  const primaryColor = singleTeam.primaryColor ?? "#111827";
  const textOnPrimary = isColorDark(primaryColor) ? "#ffffff" : "#000000";

  // Build roster: merge Sanity players with mock gender data
  const roster = (singleTeam.players ?? []).map((p, i) => ({
    id: i,
    jerseyNumber: p.number ?? 0,
    name: p.name ?? "",
    position: p.positions?.[0] ?? "",
    photo: (p.photo as unknown as string) ?? undefined,
    isCaptain: p.isCaptain ?? false,
    gender: mockPlayerGenders[p.name ?? ""] ?? ("Male" as const),
  }));

  const headCoach = { name: singleTeam.headCoach ?? "TBD", title: "Head Coach" };
  const assistantCoach = { name: singleTeam.asstHeadCoach ?? "TBD", title: "Asst. Head Coach" };

  // Find this team's rank from mock standings (match by slug)
  const leagueRank = mockStandings.find((s) => s.teamSlug === slug)?.rank;

  const socialLinks = {
    instagram: singleTeam.socialLinks?.instagram ?? undefined,
    youtube:   singleTeam.socialLinks?.youtube   ?? undefined,
    tiktok:    singleTeam.socialLinks?.tiktok    ?? undefined,
    twitter:   singleTeam.socialLinks?.twitter   ?? undefined,
  };

  return (
    <main className="min-h-screen w-full bg-white text-gray-800">
      <HeroSection
        teamName={singleTeam.name ?? ""}
        abbreviation={singleTeam.abbreviation ?? ""}
        primaryColor={primaryColor}
        secondaryColor={singleTeam.secondaryColor ?? "#ffffff"}
        foundedYear={singleTeam.foundedYear ?? 0}
        bannerImage={(singleTeam.bannerImage as unknown as string) ?? ""}
        logoImage={(singleTeam.logo as unknown as string) ?? undefined}
        socialLinks={socialLinks}
        leagueRank={leagueRank}
      />

      <TabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        primaryColor={primaryColor}
      />

      {activeTab === "overview" && (
        <OverviewTab
          stats={mockStats}
          standings={mockStandings}
          teamSlug={slug}
          results={mockResults}
          headCoach={headCoach}
          assistantCoach={assistantCoach}
          primaryColor={primaryColor}
          onTabChange={setActiveTab}
        />
      )}

      {activeTab === "roster" && (
        <RosterTab
          roster={roster}
          primaryColor={primaryColor}
        />
      )}

      {activeTab === "results" && (
        <ResultsTab
          results={mockResults}
          fixtures={mockFixtures}
          primaryColor={primaryColor}
        />
      )}

      {activeTab === "standings" && (
        <StandingsTab
          standings={mockStandings}
          form={mockForm}
          teamSlug={slug}
          primaryColor={primaryColor}
        />
      )}

      {activeTab === "staff" && (
        <StaffTab
          headCoach={headCoach}
          assistantCoach={assistantCoach}
          primaryColor={primaryColor}
          email={singleTeam.email ?? undefined}
          phone={singleTeam.phone ?? undefined}
          url={singleTeam.url ?? undefined}
          country={singleTeam.country ?? undefined}
          state={singleTeam.state ?? undefined}
        />
      )}

      {activeTab === "news" && (
        <NewsTab
          news={mockNews}
          teamSlug={slug}
          primaryColor={primaryColor}
        />
      )}
    </main>
  );
};

export default SingleTeam;
```

- [ ] **Step 2: Delete dead files**

```bash
rm src/containers/SingleTeam/components/StatsStrip.tsx
rm src/containers/SingleTeam/components/RosterSection.tsx
rm src/containers/SingleTeam/components/CoachingSection.tsx
rm src/containers/SingleTeam/components/TeamNewsSection.tsx
rm src/containers/SingleTeam/components/FooterSocialSection.tsx
```

- [ ] **Step 3: Type-check**

```bash
pnpm tsc --noEmit
```

Fix any type errors before continuing. Common issues:
- `singleTeam.email` — check the `Team` type from `sanity.types.ts`; if the field name differs, adjust accordingly
- `singleTeam.url` — same
- `p.photo as unknown as string` — this cast is intentional; the Sanity-generated type resolves to a complex asset reference, the query already resolves it to a URL string

- [ ] **Step 4: Start dev server and visually verify**

```bash
pnpm dev
```

Open `http://localhost:3006/teams/[any-existing-slug]` and verify:
- Hero renders with rank pill in the info strip
- Sticky TabBar appears below the Hero and stays on scroll
- Overview tab shows all 4 cards
- Roster tab shows player cards with filter pills
- Results tab shows W/L rows and upcoming fixtures
- Standings tab shows form bar and league table
- Staff tab shows coach cards
- News tab shows feature card and article grid
- White background throughout (no dark bg below Hero)

- [ ] **Step 5: Commit**

```bash
git add src/containers/SingleTeam/SingleTeam.tsx
git commit -m "feat: wire SingleTeam page with tabbed navigation and all new tab components"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Hero rank pill | Task 2 |
| TabBar — sticky, 6 tabs, primaryColor underline | Task 4 |
| Overview — 2×2 grid: stats, standings, results, coaching | Task 6 |
| Roster — photo-forward 3-col cards | Task 3 |
| Roster — position + gender filter pills | Task 7 |
| Results — W/L accent rows + upcoming fixtures divider | Tasks 5, 8 |
| Standings — form bar + full table, current team highlighted | Task 9 |
| Staff — coach cards + team info strip | Task 10 |
| News — feature card + article grid + view all link | Task 11 |
| mockTeamData.ts — all mock types and values | Task 1 |
| White background throughout below Hero | Task 12 (main wrapper `bg-white`) |
| Dead files removed | Task 12 |
| Player gender merged from mock | Task 12 (roster build) |
| leagueRank flows from mock → HeroSection | Tasks 2, 12 |

All spec sections covered. No gaps found.

**Placeholder scan:** No TBDs, all code blocks are complete, all method signatures consistent across tasks.

**Type consistency check:**
- `Standing` defined in Task 1, used in Tasks 6, 9, 12 ✓
- `MatchResult` defined in Task 1, used in Tasks 5, 6, 8 ✓
- `Fixture` defined in Task 1, used in Tasks 5, 8 ✓
- `MockNewsArticle` defined in Task 1, used in Tasks 11, 12 ✓
- `Player.gender` added in Task 1, populated in Task 12, consumed in Task 7 ✓
- `Player.photo` added in Task 1, populated in Task 12, consumed in Task 3 ✓
- `Tab` type exported from `TabBar.tsx`, imported in `SingleTeam.tsx` and `OverviewTab.tsx` ✓
- `MatchResultRow` + `FixtureRow` exported from Task 5 file, imported in Tasks 6 and 8 ✓

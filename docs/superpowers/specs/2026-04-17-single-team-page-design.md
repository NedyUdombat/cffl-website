# SingleTeam Page — Design Spec
**Date:** 2026-04-17
**Branch:** ch-fix-issues-in-homepage
**Status:** Approved — ready for implementation

---

## 1. Overview

Build out the SingleTeam page (`/teams/[slug]`) to be rich, data-dense, and visually world-class — consistent with the existing Hero and the rest of the app (font-machine headings, DM Sans body, framer-motion animations, Tailwind). The page transitions from a dark Hero into a **white-background** body. All new sections live below the Hero.

**Design references:** UEFA/CL, NFL.com, NBA.com, Premier League, La Liga.

---

## 2. Data Strategy

### Real data (already in Sanity query)
- Team name, abbreviation, slug, logo, bannerImage, primaryColor, secondaryColor
- foundedYear, country, state, headCoach, asstHeadCoach, email, phone, url
- players[] — name, number, positions[], photo, isCaptain
- socialLinks — instagram, youtube, tiktok, twitter

### Mock data (centralised in `src/containers/SingleTeam/mockTeamData.ts`)
All mocks must be typed to match the shape a real Sanity response would return, so swapping real data in the future only requires changing the data source import.

```ts
// Shapes required in mockTeamData.ts
export interface MockStanding {
  rank: number;
  teamName: string;
  teamSlug: string;    // identifies the current team
  gp: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
}

export interface MockResult {
  date: string;         // ISO "2026-04-12"
  opponent: string;
  homeScore: number;    // this team's score
  awayScore: number;    // opponent's score
  isHome: boolean;
  result: 'W' | 'L';
}

export interface MockFixture {
  date: string;         // ISO
  opponent: string;
  kickoffTime: string;  // "14:00"
  isHome: boolean;
}

export interface MockForm {
  results: ('W' | 'L')[];  // oldest → most recent
}

// Mock news articles (until real CMS articles exist for the team)
export interface MockNewsArticle {
  id: number;
  title: string;
  excerpt: string;       // 1–2 sentence summary
  date: string;          // ISO "2026-04-10"
  category: string;      // e.g. "Match Report", "Transfer", "Training"
  imageSrc: string;      // placeholder image URL (unsplash or /public asset)
  slug: string;          // used in href /teams/[slug]/news/[newsSlug]
}

// Player gender added to augment Sanity player data
export type PlayerGender = 'Male' | 'Female';
export interface MockPlayerGender {
  playerName: string;
  gender: PlayerGender;
}
```

Mock values: 4–6 teams in standings, 4–5 results, 3 upcoming fixtures, 6-item form array, gender for each player.

---

## 3. Architecture

### File changes

| File | Action |
|---|---|
| `src/containers/SingleTeam/mockTeamData.ts` | **Create** — all mock data |
| `src/containers/SingleTeam/components/types.ts` | **Extend** — add new interfaces (Standing, Result, Fixture) |
| `src/containers/SingleTeam/components/HeroSection.tsx` | **Refine** — add rank pill to info strip |
| `src/containers/SingleTeam/SingleTeam.tsx` | **Rewrite** — add tab state, pass data to tab components |
| `src/containers/SingleTeam/components/TabBar.tsx` | **Create** |
| `src/containers/SingleTeam/components/OverviewTab.tsx` | **Create** |
| `src/containers/SingleTeam/components/RosterTab.tsx` | **Create** |
| `src/containers/SingleTeam/components/ResultsTab.tsx` | **Create** |
| `src/containers/SingleTeam/components/StandingsTab.tsx` | **Create** |
| `src/containers/SingleTeam/components/StaffTab.tsx` | **Create** |
| `src/containers/SingleTeam/components/PlayerCard.tsx` | **Rewrite** — photo-forward style, white bg |
| `src/containers/SingleTeam/components/StatsStrip.tsx` | **Remove** — replaced by Overview tab stats card |
| `src/containers/SingleTeam/components/CoachingSection.tsx` | **Remove** — replaced by StaffTab |
| `src/containers/SingleTeam/components/RosterSection.tsx` | **Remove** — replaced by RosterTab |
| `src/containers/SingleTeam/components/NewsTab.tsx` | **Create** |
| `src/containers/SingleTeam/components/TeamNewsSection.tsx` | **Remove** — replaced by NewsTab |
| `src/containers/SingleTeam/components/FooterSocialSection.tsx` | **Remove** — social links already in Hero |

### Tab state

```ts
type Tab = 'overview' | 'roster' | 'results' | 'standings' | 'staff' | 'news';
const [activeTab, setActiveTab] = useState<Tab>('overview');
```

Single `useState` in `SingleTeam.tsx`. All data fetched once on mount via the existing `useSingleTeamLogic` hook + mock imports. No additional queries.

---

## 4. Section Specs

### 4.1 Hero refinement

Add league rank to the existing info strip (the dark bar at the bottom of the Hero):

```
2025 Season  |  Conference: CFFL  |  Founded: 2022  |  Location: Lagos, NG  |  Rank: #2
```

- Rank value computed in `SingleTeam.tsx` by finding the current team's entry in `mockStandings` (matched by slug) and reading its `rank` field
- Passed to `HeroSection` as a new optional `leagueRank?: number` prop
- Displayed as `#N` in `font-machine`, colored `primaryColor`; omitted if prop is undefined

### 4.2 Tab Bar (`TabBar.tsx`)

```
[ Overview ]  [ Roster ]  [ Results ]  [ Standings ]  [ Staff ]  [ News ]
```

- Positioned immediately below the Hero
- `sticky top-0 z-40 bg-white border-b border-gray-200`
- Active tab: 2px bottom border in `primaryColor`, text `text-gray-900 font-black font-machine`
- Inactive: `text-gray-400 font-machine`, hover `text-gray-700`
- Mobile: horizontally scrollable (`overflow-x-auto`), no wrapping
- Props: `activeTab`, `onTabChange`, `primaryColor`
- Tabs: `overview | roster | results | standings | staff | news`

### 4.3 Overview Tab (`OverviewTab.tsx`)

White background. `SectionHeading` with primaryColor accent at top.

**2×2 grid** (`grid-cols-1 md:grid-cols-2 gap-6`), all cards `bg-white border border-gray-100 rounded-2xl shadow-sm p-6`:

**Card 1 — Season Stats**
- 5 stat numbers in a horizontal strip: Wins · Losses · Win% · Pts For · Pts Against
- Number: `font-machine font-black text-4xl` in `primaryColor`
- Label: `text-xs text-gray-400 uppercase tracking-widest` below each number
- Source: mock `TeamStats` (wins, losses, pointsScored, pointsAllowed)

**Card 2 — Standings Snapshot**
- Rank badge: `#N` large `font-machine font-black` on dark `bg-gray-900` pill
- Mini table: 3 rows — team above, this team (highlighted), team below
- Current team row: `bg-[primaryColor]/8 font-black`, left `2px solid primaryColor`
- "View full standings →" link to switch to standings tab (`onClick`)
- Source: `MockStanding[]`

**Card 3 — Last 3 Results**
- 3 result rows (same anatomy as Results tab, see §4.5)
- "See all results →" link to switch to results tab
- Source: first 3 items of `MockResult[]`

**Card 4 — Coaching Staff Snapshot**
- 2 rows: head coach + asst head coach
- Each row: avatar circle (primaryColor/15 bg, icon), title label, name
- Source: real Sanity `headCoach` + `asstHeadCoach` strings

### 4.4 Roster Tab (`RosterTab.tsx`)

**Filter bar** (above grid):
- Row 1 — Position pills: `[ All ] [ QB ] [ WR ] …` — only positions present in the roster
- Row 2 — Gender pills: `[ All ] [ Male ] [ Female ]`
- Active pill: `bg-[primaryColor] text-white`
- Inactive pill: `border border-gray-200 text-gray-500 hover:border-gray-400`
- Filter logic: client-side array filter, no queries

**Card grid** — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`:

Each `PlayerCard`:
- Header: `h-36` gradient (`primaryColor` → 20% darker), contains:
  - Large faded jersey number watermark (`text-8xl opacity-10 font-machine font-black text-white`)
  - Centered avatar circle `w-20 h-20`, overlapping bottom edge (`-mb-10 relative z-10`)
  - Photo (Next.js `Image`) if `player.photo` exists, else `UserCircle` icon
  - Captain badge: gold star + `CAP` top-left
- Body (below header, `pt-12 pb-5 px-4 text-center`):
  - Name: `font-machine font-black text-base text-gray-900`
  - Position badge: colored by `POSITION_COLORS`
  - Jersey number: `text-gray-400 text-sm`
- Hover: `shadow-md scale-[1.02] transition-all duration-200`
- Border: `border border-gray-100 rounded-2xl overflow-hidden`
- Gender sourced from `MockPlayerGender[]` matched by player name; unmatched players default to `'Male'` and always appear under "All"

### 4.5 Results Tab (`ResultsTab.tsx`)

**Recent Results** — `SectionHeading` + list of `MockResult[]`:

Each row — `bg-white border border-gray-100 rounded-xl overflow-hidden flex items-center`:
- Left accent bar: `w-1 self-stretch` — green `#16a34a` (W), red `#dc2626` (L)
- Date block: dark pill `bg-gray-900 text-white font-machine text-xs` showing `MMM / DD`
- Opponent: `font-machine font-black text-sm text-gray-900`, truncated
- Score: `font-machine font-black text-lg` — team score / opponent score; winning score `text-gray-900`, losing score `text-gray-400`
- Result pill (right-aligned): `W` — `bg-green-50 text-green-700`, `L` — `bg-red-50 text-red-600`
- Row hover: `bg-gray-50 transition-colors duration-150`

**Upcoming Fixtures** divider:
- `text-xs text-gray-400 uppercase tracking-widest font-machine mt-8 mb-3 border-t border-gray-100 pt-6`

Each fixture row — same anatomy, but:
- Left accent bar: `bg-gray-200`
- Score area replaced by kick-off time `text-gray-400 text-sm`
- Result pill replaced by `TBD` — `bg-gray-100 text-gray-500`

### 4.6 Standings Tab (`StandingsTab.tsx`)

**Form bar card** — `bg-white border border-gray-100 rounded-2xl p-5 mb-6`:
- Header: `"Season Form"` left, `"4W – 2L"` right (`font-machine font-black`)
- Bar: `flex gap-1`, each segment `h-3 flex-1 rounded-sm` — green (W) / red (L), oldest → most recent
- Source: `MockForm.results[]`

**League table** — `bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm`:
- Header row: `bg-gray-50 text-xs text-gray-400 uppercase tracking-wider px-4 py-3`
- Columns: `#` · `Team` · `GP` · `W` · `L` · `PF` · `PA` · `+/-`
- Body rows: `border-t border-gray-50 px-4 py-3 font-medium text-gray-700`
- **Current team row:** `bg-gradient-to-r from-[primaryColor]/8 to-transparent border-l-2 border-l-[primaryColor] font-black text-gray-900`
- Diff column: positive → `text-green-600`, negative → `text-red-500`, zero → `text-gray-400`
- Source: `MockStanding[]` sorted by wins desc

### 4.7 News Tab (`NewsTab.tsx`)

White background. `SectionHeading` ("Team News") with primaryColor accent.

**Layout:** Asymmetric editorial grid on desktop:
- First article: full-width feature card (`h-72` image, large title, excerpt, date + category badge)
- Remaining articles: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5` standard cards below

**Feature card** (first article):
- `rounded-2xl overflow-hidden border border-gray-100 shadow-sm`
- Image: `relative h-72 w-full` — Next.js `Image` with `object-cover`, gradient overlay `from-black/60 to-transparent`
- Category badge: `absolute top-4 left-4` — `bg-[primaryColor] text-white text-xs font-machine uppercase px-2 py-1 rounded`
- Date: `absolute top-4 right-4` — `text-white/70 text-xs font-machine`
- Title: `absolute bottom-4 left-4 right-4` — `font-machine font-black text-xl text-white leading-snug`
- Below image: excerpt `text-gray-500 text-sm p-5`, "Read More →" in `primaryColor`

**Standard cards** (remaining articles):
- Reuse existing `NewsCard` component (already styled correctly for white bg context)
- `NewsCard` receives `article`, `slug`, `primaryColor`, `index` — no changes needed

**Data source:** `MockNewsArticle[]` from `mockTeamData.ts`. Include 4–6 mock articles with realistic CFFL-themed titles (e.g. "Match Report: 21–14 Victory Over Lagos Lions", "Pre-Season Training Camp Begins"). Use a public placeholder image URL for `imageSrc`.

**"View all news →" link** below the grid: `href={/teams/${slug}/news}`, `font-machine text-sm`, `primaryColor`.

### 4.8 Staff Tab (`StaffTab.tsx`)

**Coaching cards** — `grid-cols-1 sm:grid-cols-2 gap-5`:

Each card — `bg-white border border-gray-100 rounded-2xl shadow-sm p-6 border-l-4 border-l-[primaryColor] flex items-center gap-5`:
- Avatar circle `w-16 h-16 rounded-full bg-[primaryColor]/15 flex items-center justify-center`
- Icon: `Users` from lucide, color `primaryColor`, size 28
- Right: title `text-xs text-gray-400 uppercase tracking-widest font-machine`, name `font-machine font-black text-xl text-gray-900`

**Team info strip** — `bg-gray-50 rounded-2xl p-6 mt-6` (only shown if at least one field present):
- Horizontal list of contact/meta: Email · Phone · Website · Country · State
- Each: label `text-xs text-gray-400` + value `font-machine font-black text-sm text-gray-900`
- Only renders fields that are non-null in Sanity data

---

## 5. Shared conventions

- **Section heading:** reuse existing `SectionHeading` component (primaryColor left accent bar + font-machine h2)
- **Animations:** `framer-motion` `fadeUp` + `staggerGrid` (already in `types.ts`) for all new card grids
- **White section wrapper:** `<section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">`
- **Max width:** `max-w-7xl mx-auto` inside every section
- **No dark backgrounds** below the Hero (StatsStrip dark section removed)
- **Fonts:** `font-machine` for all headings, numbers, labels; `font-sans` / DM Sans for body copy

---

## 6. What is NOT in scope

- Real Sanity data for standings, results, fixtures — mock only for now
- Gender field on Sanity player schema — mock only for now
- News is now a full tab (§4.7) — `TeamNewsSection` and `FooterSocialSection` are removed from below the tab area; social links are already in the Hero
- HighlightsCarousel — kept but hidden when empty (no change)
- Any routing changes — slug-based page unchanged

# Global Competition Context Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Persist the user's selected competition globally in localStorage and expose it via React Context so any component or query hook can read/set it without prop drilling.

**Architecture:** A `CompetitionProvider` in `src/app/providers.tsx` wraps the app, reads the stored competition `_id` from localStorage on mount, resolves it to a full object via the competitions query, and provides `selectedCompetition` / `setSelectedCompetition` globally. `TopAppBar` reads from context to reflect the persisted selection in its dropdown. `SingleTeam` wires `onCompetitionChange` directly to `setSelectedCompetition`.

**Tech Stack:** React Context, localStorage, TypeScript, `@tanstack/react-query` (competitions already fetched via `useFetchCompetitions`)

---

## File Map

| File | Action |
|------|--------|
| `src/contexts/CompetitionContext.tsx` | **Create** — context definition, `CompetitionProvider`, `useCompetition` hook |
| `src/app/providers.tsx` | **Modify** — add `CompetitionProvider` inside `TeamsProvider` |
| `src/containers/SingleTeam/SingleTeam.tsx` | **Modify** — consume `useCompetition`, pass `setSelectedCompetition` to `HeroSection` |
| `src/components/TopAppBar.tsx` | **Modify** — consume `useCompetition` to seed dropdown from persisted value; fix wrong `Competition` import |

---

### Task 1: Create `src/contexts/CompetitionContext.tsx`

**Files:**
- Create: `src/contexts/CompetitionContext.tsx`

- [ ] **Step 1: Create the context file**

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { COMPETITIONS_QUERYResult } from "../../sanity.types";
import useFetchCompetitions from "@/queries/competitions/useFetchCompetitions";

export type CompetitionItem = COMPETITIONS_QUERYResult[number];

type CompetitionContextType = {
  selectedCompetition: CompetitionItem | undefined;
  setSelectedCompetition: (competition: CompetitionItem | undefined) => void;
};

const STORAGE_KEY = "cffl_selected_competition_id";

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: React.ReactNode }) {
  const { competitions } = useFetchCompetitions();
  const [selectedCompetition, setSelectedCompetitionState] = useState<CompetitionItem | undefined>(undefined);

  // On competitions load, resolve stored _id → full object
  useEffect(() => {
    if (!competitions?.length) return;
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (!storedId) return;
    const match = competitions.find((c) => c._id === storedId);
    if (match) setSelectedCompetitionState(match);
  }, [competitions]);

  function setSelectedCompetition(competition: CompetitionItem | undefined) {
    setSelectedCompetitionState(competition);
    if (competition) {
      localStorage.setItem(STORAGE_KEY, competition._id);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <CompetitionContext.Provider value={{ selectedCompetition, setSelectedCompetition }}>
      {children}
    </CompetitionContext.Provider>
  );
}

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (!context) throw new Error("useCompetition must be used within a CompetitionProvider");
  return context;
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors related to `CompetitionContext.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/contexts/CompetitionContext.tsx
git commit -m "feat: add CompetitionContext with localStorage persistence"
```

---

### Task 2: Add `CompetitionProvider` to `src/app/providers.tsx`

**Files:**
- Modify: `src/app/providers.tsx`

Current content for reference:
```tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { TeamsProvider } from "@/contexts/TeamContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TeamsProvider>{children}</TeamsProvider>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 1: Update `providers.tsx`**

Replace the entire file content with:

```tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { TeamsProvider } from "@/contexts/TeamContext";
import { CompetitionProvider } from "@/contexts/CompetitionContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TeamsProvider>
        <CompetitionProvider>
          {children}
        </CompetitionProvider>
      </TeamsProvider>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/providers.tsx
git commit -m "feat: wrap app with CompetitionProvider"
```

---

### Task 3: Update `TopAppBar` to read from context

**Files:**
- Modify: `src/components/TopAppBar.tsx`

The current file imports the wrong `Competition` type (the raw Sanity document type from `sanity.types`) instead of `COMPETITIONS_QUERYResult[number]`. This task fixes that and adds context awareness so the dropdown reflects the persisted selection on reload.

- [ ] **Step 1: Replace `src/components/TopAppBar.tsx`**

```tsx
"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetchCompetitions from "@/queries/competitions/useFetchCompetitions";
import { useCompetition, type CompetitionItem } from "@/contexts/CompetitionContext";

interface TopAppBarProps {
  teamName: string;
  onCompetitionChange?: (competition: CompetitionItem) => void;
}

const TopAppBar = ({ teamName, onCompetitionChange }: TopAppBarProps) => {
  const { competitions } = useFetchCompetitions();
  const { selectedCompetition } = useCompetition();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (!competitions?.length) return;
    // Prefer the globally persisted competition
    if (selectedCompetition) {
      setSelectedId(selectedCompetition._id);
      return;
    }
    // Fall back to active competition
    const defaultComp = competitions.find((c) => c.status === "active") ?? competitions[0];
    if (defaultComp) {
      setSelectedId(defaultComp._id);
      onCompetitionChange?.(defaultComp);
    }
  }, [competitions, selectedCompetition]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const comp = competitions?.find((c) => c._id === e.target.value);
    if (!comp) return;
    setSelectedId(comp._id);
    onCompetitionChange?.(comp);
  }

  return (
    <div
      className="absolute top-0 inset-x-0 z-20"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 h-12 flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] font-inter">
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 transition-colors uppercase"
          >
            CFFL
          </Link>
          <ChevronRight className="text-white/25 w-3 h-3 shrink-0" />
          <Link
            href="/teams"
            className="text-white/40 hover:text-white/70 transition-colors uppercase"
          >
            TEAMS
          </Link>
          <ChevronRight className="text-white/25 w-3 h-3 shrink-0" />
          <span className="text-white uppercase">{teamName}</span>
        </div>

        {/* Competitions dropdown */}
        {competitions?.length ? (
          <select
            value={selectedId}
            onChange={handleChange}
            className="text-[10px] font-bold tracking-[0.12em] font-inter uppercase text-white/80 bg-transparent border border-white/20 rounded px-2 py-1 cursor-pointer outline-none hover:border-white/40 transition-colors"
          >
            {competitions.map((comp) => (
              <option key={comp._id} value={comp._id} className="bg-black text-white normal-case">
                {comp.name ?? comp._id}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    </div>
  );
};

export default TopAppBar;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/TopAppBar.tsx
git commit -m "feat: TopAppBar reads persisted competition from context"
```

---

### Task 4: Wire `onCompetitionChange` in `SingleTeam.tsx`

**Files:**
- Modify: `src/containers/SingleTeam/SingleTeam.tsx`

Line 104 currently has `onCompetitionChange={}` (empty, causes a compile error). This task fills it in using `setSelectedCompetition` from `useCompetition`.

- [ ] **Step 1: Add `useCompetition` import**

At the top of `src/containers/SingleTeam/SingleTeam.tsx`, add the import alongside the existing imports:

```tsx
import { useCompetition } from "@/contexts/CompetitionContext";
```

- [ ] **Step 2: Destructure `setSelectedCompetition` inside the component**

After the existing `useSingleTeamLogic` call (around line 49), add:

```tsx
const { setSelectedCompetition } = useCompetition();
```

- [ ] **Step 3: Pass it to `HeroSection`**

Replace the current broken prop on line 104:

```tsx
onCompetitionChange={}
```

With:

```tsx
onCompetitionChange={setSelectedCompetition}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/containers/SingleTeam/SingleTeam.tsx
git commit -m "feat: wire onCompetitionChange to global competition context"
```

---

### Task 5: Smoke test

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Navigate to any team page**

Open `http://localhost:3000/teams/<any-slug>`. Confirm the competitions dropdown appears in the top bar.

- [ ] **Step 3: Select a competition**

Pick a competition from the dropdown. Open DevTools → Application → Local Storage. Confirm `cffl_selected_competition_id` is set to the selected competition's `_id`.

- [ ] **Step 4: Reload the page**

Hard-reload (`Cmd+Shift+R`). Confirm the dropdown still shows the previously selected competition — not reset to default.

- [ ] **Step 5: Navigate to a different team page**

Confirm the same competition is selected on the new team page (global persistence across pages).

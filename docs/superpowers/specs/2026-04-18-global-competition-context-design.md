---
title: Global Competition Context
date: 2026-04-18
status: approved
---

# Global Competition Context

## Goal

Persist the user's selected competition across page reloads and team pages. The selected competition is stored in `localStorage` and made available globally via React Context so query hooks and components can consume it without prop drilling.

If no competition has been selected (first visit or cleared storage), `selectedCompetition` is `undefined` — this is an acceptable state and no default is forced.

## Files

| File | Action |
|------|--------|
| `src/contexts/CompetitionContext.tsx` | Create — context, provider, `useCompetition` hook |
| `src/app/providers.tsx` | Edit — wrap children with `CompetitionProvider` |
| `src/containers/SingleTeam/SingleTeam.tsx` | Edit — wire `onCompetitionChange` to `setSelectedCompetition` from context |

## Context Shape

```ts
type CompetitionContextType = {
  selectedCompetition: Competition | undefined;
  setSelectedCompetition: (competition: Competition | undefined) => void;
};

// Competition is COMPETITIONS_QUERYResult[number]
```

## localStorage

- Key: `"cffl_selected_competition_id"`
- Value: the competition `_id` string
- On mount: read the stored `_id`, resolve the full object from `useFetchCompetitions`, set state
- On change: write new `_id` to localStorage, update state with full object

> Only the `_id` is persisted — not the full object — so the data is always fresh from the query.

## CompetitionContext.tsx

Follows the same pattern as `src/contexts/TeamContext.tsx`:

```ts
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { COMPETITIONS_QUERYResult } from "../../sanity.types";
import useFetchCompetitions from "@/queries/competitions/useFetchCompetitions";

type Competition = COMPETITIONS_QUERYResult[number];

type CompetitionContextType = {
  selectedCompetition: Competition | undefined;
  setSelectedCompetition: (competition: Competition | undefined) => void;
};

const STORAGE_KEY = "cffl_selected_competition_id";

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: React.ReactNode }) {
  const { competitions } = useFetchCompetitions();
  const [selectedCompetition, setSelectedCompetitionState] = useState<Competition | undefined>(undefined);

  // On competitions load, resolve stored ID to full object
  useEffect(() => {
    if (!competitions?.length) return;
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (!storedId) return;
    const match = competitions.find((c) => c._id === storedId);
    if (match) setSelectedCompetitionState(match);
  }, [competitions]);

  function setSelectedCompetition(competition: Competition | undefined) {
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

## providers.tsx change

Wrap `TeamsProvider` (or its children) with `CompetitionProvider`:

```tsx
<QueryClientProvider client={queryClient}>
  <TeamsProvider>
    <CompetitionProvider>
      {children}
    </CompetitionProvider>
  </TeamsProvider>
</QueryClientProvider>
```

## SingleTeam.tsx change

```tsx
const { setSelectedCompetition } = useCompetition();
// ...
<HeroSection
  ...
  onCompetitionChange={setSelectedCompetition}
/>
```

## TopAppBar behaviour

`TopAppBar` already calls `onCompetitionChange` on dropdown change. It should also use `useCompetition()` to read `selectedCompetition._id` as its initial dropdown value, so the UI reflects the persisted selection on reload.

The `useEffect` in `TopAppBar` that sets the default should be updated to prefer the stored competition over the active one:

```ts
useEffect(() => {
  if (!competitions?.length) return;
  // If a competition is already selected globally, reflect it in the dropdown
  if (selectedCompetition) {
    setSelectedId(selectedCompetition._id);
    return;
  }
  // Otherwise fall back to active competition
  const defaultComp = competitions.find((c) => c.status === "active") ?? competitions[0];
  if (defaultComp) {
    setSelectedId(defaultComp._id);
    onCompetitionChange?.(defaultComp);
  }
}, [competitions, selectedCompetition]);
```

## Data flow summary

```
localStorage (cffl_selected_competition_id)
       ↓ on mount
CompetitionProvider (resolves _id → full object)
       ↓ via useCompetition()
TopAppBar    ← reads selectedCompetition to set dropdown default
       ↓ onCompetitionChange (user selects)
SingleTeam   → setSelectedCompetition → updates context + localStorage
       ↓
Any query hook → useCompetition() → selectedCompetition._id as filter
```

# useFetchMatches — Filtered & Paginated Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `useFetchMatches` to accept optional filter params (status, competition, team, homeTeam, awayTeam, date, matchDay) and return page-based paginated results with a parallel count query.

**Architecture:** A single parameterised GROQ query uses `$param == null` guards to skip unset filters. A parallel count query provides total for pagination metadata. Both run via `useQueries` and are merged before returning. Each unique filter combination gets its own React Query cache entry.

**Tech Stack:** Next.js 15, React Query v5 (`useQueries`), Sanity GROQ (`defineQuery`), TypeScript, Vitest, @testing-library/react

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/queries/matches/useFetchMatches.ts` | Hook + `MatchFilters` type + GROQ queries |
| Create | `src/queries/matches/useFetchMatches.test.tsx` | Unit tests for the hook |
| Create | `vitest.config.ts` | Vitest configuration |
| Create | `vitest.setup.ts` | Test setup file |
| Modify | `package.json` | Add `test` script, install test deps |

---

## Task 1: Install Vitest and testing dependencies

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

- [ ] **Step 1: Install deps**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

Expected output: packages added to devDependencies.

- [ ] **Step 2: Add test script to `package.json`**

In the `"scripts"` block, add after the existing entries:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

Create `/Users/nedy/Documents/Projects/cffl-landing-page/vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 4: Create `vitest.setup.ts`**

Create `/Users/nedy/Documents/Projects/cffl-landing-page/vitest.setup.ts`:

```typescript
import "@testing-library/jest-dom";
```

- [ ] **Step 5: Verify setup with a smoke test**

Run:
```bash
pnpm test
```

Expected: `No test files found` or passing (not a config error).

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json
git commit -m "chore: add vitest and testing-library setup"
```

---

## Task 2: Write failing tests for `useFetchMatches`

**Files:**
- Create: `src/queries/matches/useFetchMatches.test.tsx`

- [ ] **Step 1: Create the test file**

Create `/Users/nedy/Documents/Projects/cffl-landing-page/src/queries/matches/useFetchMatches.test.tsx`:

```typescript
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach } from "vitest";
import useFetchMatches from "./useFetchMatches";

vi.mock("@/sanity/lib/client", () => ({
  client: { fetch: vi.fn() },
}));

vi.mock("next-sanity", () => ({
  defineQuery: (q: string) => q,
}));

import { client } from "@/sanity/lib/client";

const mockFetch = client.fetch as ReturnType<typeof vi.fn>;

const mockMatches = [
  {
    _id: "match-1",
    matchDay: 1,
    matchNumber: 1,
    date: "2026-01-10",
    time: "15:00",
    location: "Lagos Stadium",
    homeTeam: { _ref: "team-a", _type: "reference" as const },
    awayTeam: { _ref: "team-b", _type: "reference" as const },
    homeScore: null,
    awayScore: null,
    competition: null,
    status: "scheduled" as const,
  },
];

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useFetchMatches", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockImplementation((query: string) => {
      if (query.trimStart().startsWith("count(")) return Promise.resolve(1);
      return Promise.resolve(mockMatches);
    });
  });

  it("returns all matches with default pagination when no filters provided", async () => {
    const { result } = renderHook(() => useFetchMatches(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.data).toEqual(mockMatches);
    expect(result.current.pagination).toEqual({
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    });
  });

  it("passes null for all unset filter params so GROQ skips them", async () => {
    const { result } = renderHook(() => useFetchMatches(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        status: null,
        competitionId: null,
        competitionSlug: null,
        team: null,
        teamSlug: null,
        homeTeam: null,
        homeTeamSlug: null,
        awayTeam: null,
        awayTeamSlug: null,
        date: null,
        matchDay: null,
      }),
    );
  });

  it("passes status param when status filter is set", async () => {
    const { result } = renderHook(
      () => useFetchMatches({ status: "scheduled" }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ status: "scheduled" }),
    );
  });

  it("passes competition _id as competitionId param", async () => {
    const { result } = renderHook(
      () => useFetchMatches({ competition: "comp-abc" }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ competitionId: "comp-abc" }),
    );
  });

  it("passes competitionSlug param", async () => {
    const { result } = renderHook(
      () => useFetchMatches({ competitionSlug: "premier-league" }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ competitionSlug: "premier-league" }),
    );
  });

  it("passes team _id param for home-or-away team filter", async () => {
    const { result } = renderHook(
      () => useFetchMatches({ team: "team-xyz" }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ team: "team-xyz" }),
    );
  });

  it("passes homeTeam _id for home-only filter", async () => {
    const { result } = renderHook(
      () => useFetchMatches({ homeTeam: "team-xyz" }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ homeTeam: "team-xyz" }),
    );
  });

  it("passes awayTeamSlug for away-only filter by slug", async () => {
    const { result } = renderHook(
      () => useFetchMatches({ awayTeamSlug: "lagos-lions" }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ awayTeamSlug: "lagos-lions" }),
    );
  });

  it("computes correct pagination for page 2 with 25 total results", async () => {
    mockFetch.mockImplementation((query: string) => {
      if (query.trimStart().startsWith("count(")) return Promise.resolve(25);
      return Promise.resolve(mockMatches);
    });

    const { result } = renderHook(
      () => useFetchMatches({ page: 2, pageSize: 10 }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.pagination).toEqual({
      total: 25,
      page: 2,
      pageSize: 10,
      totalPages: 3,
      hasNextPage: true,
      hasPrevPage: true,
    });
  });

  it("computes correct GROQ offset and limit for page 3 pageSize 5", async () => {
    mockFetch.mockImplementation((query: string) => {
      if (query.trimStart().startsWith("count(")) return Promise.resolve(20);
      return Promise.resolve(mockMatches);
    });

    const { result } = renderHook(
      () => useFetchMatches({ page: 3, pageSize: 5 }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    // page 3, pageSize 5 → offset = 10, limit = 15
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ offset: 10, limit: 15 }),
    );
  });

  it("hasNextPage is false on the last page", async () => {
    mockFetch.mockImplementation((query: string) => {
      if (query.trimStart().startsWith("count(")) return Promise.resolve(10);
      return Promise.resolve(mockMatches);
    });

    const { result } = renderHook(
      () => useFetchMatches({ page: 1, pageSize: 10 }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.pagination.hasNextPage).toBe(false);
    expect(result.current.pagination.hasPrevPage).toBe(false);
  });

  it("combines multiple filters together", async () => {
    const { result } = renderHook(
      () =>
        useFetchMatches({
          status: "completed",
          competition: "comp-1",
          matchDay: 3,
        }),
      { wrapper },
    );
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        status: "completed",
        competitionId: "comp-1",
        matchDay: 3,
      }),
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm test
```

Expected: FAIL — `useFetchMatches` does not yet accept filters or return `pagination`.

---

## Task 3: Implement `useFetchMatches` with filters and pagination

**Files:**
- Modify: `src/queries/matches/useFetchMatches.ts`

- [ ] **Step 1: Rewrite the hook**

Replace the entire contents of `src/queries/matches/useFetchMatches.ts` with:

```typescript
import { useQueries } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { MATCHES_QUERYResult } from "../../../sanity.types";

export interface MatchFilters {
  status?: "scheduled" | "completed" | "cancelled";

  competition?: string;      // filter by competition _id (default)
  competitionSlug?: string;  // alternative: filter by competition slug

  team?: string;             // _id — matches where team is homeTeam OR awayTeam
  teamSlug?: string;         // slug — same, home OR away

  homeTeam?: string;         // _id — specifically home team only
  homeTeamSlug?: string;     // slug — specifically home team only

  awayTeam?: string;         // _id — specifically away team only
  awayTeamSlug?: string;     // slug — specifically away team only

  date?: string;
  matchDay?: number;

  page?: number;             // default: 1
  pageSize?: number;         // default: 10
}

const MATCHES_QUERY = defineQuery(`*[_type == "match"
  && ($status == null || status == $status)
  && ($competitionId == null || competition._ref == $competitionId)
  && ($competitionSlug == null || competition->slug.current == $competitionSlug)
  && ($team == null || homeTeam._ref == $team || awayTeam._ref == $team)
  && ($teamSlug == null || homeTeam->slug.current == $teamSlug || awayTeam->slug.current == $teamSlug)
  && ($homeTeam == null || homeTeam._ref == $homeTeam)
  && ($homeTeamSlug == null || homeTeam->slug.current == $homeTeamSlug)
  && ($awayTeam == null || awayTeam._ref == $awayTeam)
  && ($awayTeamSlug == null || awayTeam->slug.current == $awayTeamSlug)
  && ($date == null || date == $date)
  && ($matchDay == null || matchDay == $matchDay)
] | order(matchNumber asc) [$offset...$limit]`);

const MATCHES_COUNT_QUERY = defineQuery(`count(*[_type == "match"
  && ($status == null || status == $status)
  && ($competitionId == null || competition._ref == $competitionId)
  && ($competitionSlug == null || competition->slug.current == $competitionSlug)
  && ($team == null || homeTeam._ref == $team || awayTeam._ref == $team)
  && ($teamSlug == null || homeTeam->slug.current == $teamSlug || awayTeam->slug.current == $teamSlug)
  && ($homeTeam == null || homeTeam._ref == $homeTeam)
  && ($homeTeamSlug == null || homeTeam->slug.current == $homeTeamSlug)
  && ($awayTeam == null || awayTeam._ref == $awayTeam)
  && ($awayTeamSlug == null || awayTeam->slug.current == $awayTeamSlug)
  && ($date == null || date == $date)
  && ($matchDay == null || matchDay == $matchDay)
])`);

const useFetchMatches = (filters: MatchFilters = {}) => {
  const {
    status,
    competition,
    competitionSlug,
    team,
    teamSlug,
    homeTeam,
    homeTeamSlug,
    awayTeam,
    awayTeamSlug,
    date,
    matchDay,
    page = 1,
    pageSize = 10,
  } = filters;

  const offset = (page - 1) * pageSize;
  const limit = page * pageSize;

  const params = {
    status: status ?? null,
    competitionId: competition ?? null,
    competitionSlug: competitionSlug ?? null,
    team: team ?? null,
    teamSlug: teamSlug ?? null,
    homeTeam: homeTeam ?? null,
    homeTeamSlug: homeTeamSlug ?? null,
    awayTeam: awayTeam ?? null,
    awayTeamSlug: awayTeamSlug ?? null,
    date: date ?? null,
    matchDay: matchDay ?? null,
    offset,
    limit,
  };

  const [dataResult, countResult] = useQueries({
    queries: [
      {
        queryKey: ["matches", filters],
        queryFn: () => client.fetch<MATCHES_QUERYResult>(MATCHES_QUERY, params),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["matches-count", filters],
        queryFn: () => client.fetch<number>(MATCHES_COUNT_QUERY, params),
        refetchOnWindowFocus: false,
      },
    ],
  });

  const total = countResult.data ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: dataResult.data ?? [],
    pagination: {
      total,
      page,
      pageSize,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    isPending: dataResult.isPending || countResult.isPending,
    isError: dataResult.isError || countResult.isError,
    error: dataResult.error ?? countResult.error,
    refetch: () => {
      dataResult.refetch();
      countResult.refetch();
    },
  };
};

export default useFetchMatches;
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
pnpm test
```

Expected: All tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/queries/matches/useFetchMatches.ts src/queries/matches/useFetchMatches.test.tsx
git commit -m "feat: add filter params and pagination to useFetchMatches"
```

---

## Task 4: Regenerate Sanity types

The GROQ query string has changed, so the generated types need to be updated.

- [ ] **Step 1: Run typegen**

```bash
pnpm sanity:typegen
```

Expected: `sanity.types.ts` is updated to reflect the new parameterised query. This may add a new `MATCHES_QUERYResult` variant or update the existing mapping.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: No TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add sanity.types.ts
git commit -m "chore: regenerate sanity types after matches query update"
```

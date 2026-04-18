# Design: `useFetchMatches` — Filtered & Paginated

**Date:** 2026-04-18
**Status:** Approved

---

## Overview

Extend `src/queries/matches/useFetchMatches.ts` to accept optional filter params and page-based pagination. All params are optional — omitting all of them returns all matches paginated with defaults.

---

## Params Interface

```typescript
interface MatchFilters {
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
```

All fields are optional and combinable. `team`/`teamSlug` match either homeTeam or awayTeam. `homeTeam`/`awayTeam` (and slug variants) filter by position specifically.

---

## GROQ Query

A single parameterised query using `|| $param == null` to skip conditions when params are not provided. Pagination via GROQ slice.

```groq
*[_type == "match"
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
] | order(matchNumber asc) [$offset...$limit]
```

A parallel count query (`count(...)` with the same filter conditions, no slice) provides the total for pagination metadata.

---

## React Query Setup

- **queryKey:** `["matches", filters]` — unique cache entry per param combination
- **Two parallel queries:** data query + count query, merged before returning
- **`isPending`:** true if either query is still loading
- **`refetchOnWindowFocus`:** false (consistent with existing hooks)

---

## Return Shape

```typescript
{
  data: MATCHES_QUERYResult;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}
```

---

## Usage Examples

```typescript
// All matches (defaults: page 1, pageSize 10)
useFetchMatches()

// All matches involving a team (home or away), page 2
useFetchMatches({ team: "abc123", page: 2, pageSize: 10 })

// Only home games for a team by slug
useFetchMatches({ homeTeamSlug: "lagos-lions" })

// Only away games for a team by slug
useFetchMatches({ awayTeamSlug: "lagos-lions" })

// Scheduled matches in a competition
useFetchMatches({ competition: "xyz456", status: "scheduled" })

// Matches on a specific match day
useFetchMatches({ matchDay: 3 })
```

---

## Pagination Defaults

| Param | Default |
|-------|---------|
| `page` | `1` |
| `pageSize` | `10` |

Offset is computed as `(page - 1) * pageSize`. Limit is `page * pageSize` (GROQ slice is `[offset..limit]` exclusive end).

---

## Files Affected

- `src/queries/matches/useFetchMatches.ts` — rewrite to accept `MatchFilters`, add count query, update return shape

import { useQueries } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { MATCHES_QUERYResult } from "../../../sanity.types";

export interface MatchFilters {
  status?: "scheduled" | "completed" | "cancelled";

  competition?: string; // filter by competition _id (default)
  competitionSlug?: string; // alternative: filter by competition slug

  team?: string; // _id — matches where team is homeTeam OR awayTeam
  teamSlug?: string; // slug — same, home OR away

  homeTeam?: string; // _id — specifically home team only
  homeTeamSlug?: string; // slug — specifically home team only

  awayTeam?: string; // _id — specifically away team only
  awayTeamSlug?: string; // slug — specifically away team only

  date?: string;
  matchDay?: number;

  page?: number; // default: 1
  pageSize?: number; // default: 10
  enabled?: boolean; // default: true
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
] | order(date asc) [$offset...$limit] {
  _id,
  matchDay,
  matchNumber,
  date,
  time,
  location,
  homeScore,
  awayScore,
  status,
  "homeTeam": homeTeam-> {
    _id,
    name,
    abbreviation,
    "logo": logo.asset->url,
    "slug": slug.current,
  },
  "awayTeam": awayTeam-> {
    _id,
    name,
    abbreviation,
    "logo": logo.asset->url,
    "slug": slug.current,
  },
  competition,
}`);

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
    pageSize = 20,
    enabled = true,
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
        enabled,
      },
      {
        queryKey: ["matches-count", filters],
        queryFn: () => client.fetch<number>(MATCHES_COUNT_QUERY, params),
        refetchOnWindowFocus: false,
        enabled,
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

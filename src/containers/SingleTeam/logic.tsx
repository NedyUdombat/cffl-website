import useFetchMatches from "@/queries/matches/useFetchMatches";
import useFetchSingleTeam from "@/queries/teams/useFetchSingleTeam";
import type { OverviewStats } from "./types";

const useSingleTeamLogic = (slug: string) => {
  const { singleTeam, isPending, isError, error, refetch } = useFetchSingleTeam(slug);

  const { data: nextMatchData } = useFetchMatches({
    status: "scheduled",
    team: singleTeam?._id,
    pageSize: 20,
    enabled: !!singleTeam?._id,
  });

  const { data: matchResults } = useFetchMatches({
    status: "completed",
    team: singleTeam?._id,
    pageSize: 20,
    enabled: !!singleTeam?._id,
  });

  const nextMatch = nextMatchData?.[0];
  const isHome = nextMatch?.homeTeam?._id === singleTeam?._id;
  const opponent = isHome ? nextMatch?.awayTeam : nextMatch?.homeTeam;
  const nextMatchup = nextMatch
    ? {
        opponentAbbr: opponent?.abbreviation ?? "",
        opponentName: opponent?.name ?? "",
        opponentLogo: opponent?.logo ?? undefined,
        dateStr: `${nextMatch.date ?? "TBD"} · ${nextMatch.time ?? ""}`,
        location: nextMatch.location ?? undefined,
        slug: opponent?.slug,
      }
    : undefined;
  const teamId = singleTeam?._id;
  const wins =
    matchResults?.filter((match) => {
      const isHome = match.homeTeam._id === teamId;
      return isHome ? match.homeScore > match.awayScore : match.awayScore > match.homeScore;
    }).length ?? 0;

  const draws = matchResults?.filter((match) => match.homeScore === match.awayScore).length ?? 0;

  const losses =
    matchResults?.filter((match) => {
      const isHome = match.homeTeam._id === teamId;
      return isHome ? match.homeScore < match.awayScore : match.awayScore < match.homeScore;
    }).length ?? 0;

  const winPct = matchResults?.length ? Math.round((wins / matchResults.length) * 100) : 0;

  const ptsFor =
    matchResults?.reduce((acc, match) => {
      const isHome = match.homeTeam._id === teamId;
      return acc + (isHome ? match.homeScore : match.awayScore);
    }, 0) ?? 0;

  const ptsAgainst =
    matchResults?.reduce((acc, match) => {
      const isHome = match.homeTeam._id === teamId;
      return acc + (isHome ? match.awayScore : match.homeScore);
    }, 0) ?? 0;

  return {
    singleTeam,
    isPending,
    isError,
    error,
    refetch,

    nextMatchup,
    matchResults,
    nextMatchData,

    overviewStats: {
      wins,
      draws,
      losses,
      winPct,
      ptsFor,
      ptsAgainst,
    } as OverviewStats,
  };
};

export default useSingleTeamLogic;

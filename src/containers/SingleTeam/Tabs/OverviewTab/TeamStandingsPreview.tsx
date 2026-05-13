import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import StandingsTable, { COMPACT_COLUMNS } from "@/components/StandingsTable";
import type { CompetitionItem } from "@/contexts/CompetitionContext";
import { computeStandings } from "@/lib/compute-standings";
import useFetchMatches from "@/queries/matches/useFetchMatches";
import team from "@/sanity/schemaTypes/team";
import { fadeUp } from "../../types";

function useStandings(competitionId: string) {
  const { data: matches, isPending } = useFetchMatches({
    status: "completed",
    competition: competitionId,
    pageSize: 200,
    enabled: !!competitionId,
  });

  const rows = useMemo(() => computeStandings(matches ?? []), [matches]);
  return { rows, isPending };
}

interface StandingOverviewProps {
  competition: CompetitionItem | undefined;
  teamId: string;
  teamSlug: string;
}

const MAX_ROWS = 5;

function TeamStandingsPreview({ competition, teamId, teamSlug }: StandingOverviewProps) {
  const { rows } = useStandings(competition?._id);

  const teamIndex = rows.findIndex((r) => r.team._id === teamId);
  // Centre the window around the team, clamped so we don't go out of bounds
  const center = teamIndex >= 0 ? teamIndex : 0;
  const start = Math.max(0, Math.min(center - Math.floor(MAX_ROWS / 2), rows.length - MAX_ROWS));
  const slicedRows = rows.slice(start, start + MAX_ROWS);

  return (
    <motion.div variants={fadeUp} className="bg-white p-4 rounded-xl  flex flex-col gap-3">
      <p className="text-2xs font-bold uppercase tracking-widest text-gray-400">
        <span className="text-red-500 mr-1">•</span> {competition?.name}
      </p>
      <StandingsTable
        rows={slicedRows}
        highlightTeamId={teamId}
        startIndex={start}
        columns={COMPACT_COLUMNS}
        compact
      />
      <Link
        href={`/teams/${teamSlug}?tab=standings`}
        className="text-center text-2xs  uppercase tracking-widest text-gray-500 hover:text-red-400 transition-colors"
      >
        Full Table →
      </Link>
    </motion.div>
  );
}

export default TeamStandingsPreview;

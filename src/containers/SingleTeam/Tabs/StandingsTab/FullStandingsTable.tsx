import { useMemo } from "react";
import type { StandingRow } from "@/components/StandingsTable";
import StandingsTable, { ALL_COLUMNS } from "@/components/StandingsTable";
import type { CompetitionItem } from "@/contexts/CompetitionContext";
import { computeStandings } from "@/lib/compute-standings";
import useFetchMatches from "@/queries/matches/useFetchMatches";

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
}

const ZONES = [
  {
    label: "Playoff Round 1",
    from: 2,
    to: 5,
    border: "border-l-4 border-l-blue-500",
    bg: "!bg-blue-50",
    dot: "bg-blue-500",
  },
  {
    label: "Playoff Round 2 (Bye Week)",
    from: 0,
    to: 1,
    border: "border-l-4 border-l-emerald-500",
    bg: "!bg-emerald-50",
    dot: "bg-emerald-500",
  },
];

function getRowClassName(_row: StandingRow, index: number): string {
  const zone = ZONES.find((z) => index >= z.from && index <= z.to);
  if (!zone) return "";
  return `${zone.border} ${zone.bg}`;
}

const FullStandingsTable = ({ competition, teamId }: StandingOverviewProps) => {
  const { rows, isPending } = useStandings(competition?._id);

  if (isPending) return <div className="text-gray-500 text-sm py-8">Loading standings...</div>;

  return (
    <div>
      <StandingsTable
        rows={rows}
        columns={ALL_COLUMNS}
        sortable
        // highlightTeamId={teamId}
        getRowClassName={getRowClassName}
      />

      {/* ── Legend ── */}
      <div className="flex flex-col gap-2 mt-4 px-1 border-t border-gray-300 pt-2">
        {ZONES.map((zone) => (
          <div key={zone.label} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm shrink-0 ${zone.dot}`} />
            <span className="text-[11px] text-gray-500">{zone.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullStandingsTable;

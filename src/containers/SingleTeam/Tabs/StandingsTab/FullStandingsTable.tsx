import { useMemo } from "react";
import type { StandingRow } from "@/components/StandingsTable/types";
import StandingsTable, { ALL_COLUMNS } from "@/components/StandingsTable";
import type { ColumnDef } from "@/components/Table/types";
import type { CompetitionItem } from "@/contexts/CompetitionContext";
import { computeStandings } from "@/lib/compute-standings";
import useFetchMatches from "@/queries/matches/useFetchMatches";

type FormChip = { matchDay: number | null; isWin: boolean; isDraw: boolean; oppAbbr: string };

function useStandings(competitionId: string) {
  const { data: matches, isPending } = useFetchMatches({
    status: "completed",
    competition: competitionId,
    pageSize: 200,
    enabled: !!competitionId,
  });

  const rows = useMemo(() => computeStandings(matches ?? []), [matches]);

  const formByTeam = useMemo(() => {
    const map = new Map<string, FormChip[]>();
    for (const m of matches ?? []) {
      const hId = m.homeTeam?._id;
      const aId = m.awayTeam?._id;
      const hScore = m.homeScore ?? 0;
      const aScore = m.awayScore ?? 0;
      if (hId) {
        const prev = map.get(hId) ?? [];
        map.set(hId, [
          ...prev,
          {
            matchDay: m.matchDay ?? null,
            isWin: hScore > aScore,
            isDraw: hScore === aScore,
            oppAbbr: m.awayTeam?.abbreviation ?? "?",
          },
        ]);
      }
      if (aId) {
        const prev = map.get(aId) ?? [];
        map.set(aId, [
          ...prev,
          {
            matchDay: m.matchDay ?? null,
            isWin: aScore > hScore,
            isDraw: hScore === aScore,
            oppAbbr: m.homeTeam?.abbreviation ?? "?",
          },
        ]);
      }
    }
    return map;
  }, [matches]);

  return { rows, isPending, formByTeam };
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
    border: "border-l-4 border-l-info",
    bg: "!bg-info-tint",
    dot: "bg-info",
  },
  {
    label: "Playoff Round 2 (Bye Week)",
    from: 0,
    to: 1,
    border: "border-l-4 border-l-win",
    bg: "!bg-win/10",
    dot: "bg-win",
  },
];

function getRowClassName(_row: StandingRow, index: number): string {
  const zone = ZONES.find((z) => index >= z.from && index <= z.to);
  if (!zone) return "";
  return `${zone.border} ${zone.bg}`;
}

const FullStandingsTable = ({ competition }: StandingOverviewProps) => {
  const { rows, isPending, formByTeam } = useStandings(competition?._id);

  const formColumn: ColumnDef<StandingRow> = useMemo(
    () => ({
      key: "form",
      header: "Form",
      className: "text-center max-w-[105px]",
      cell: (row) => {
        const chips = formByTeam.get(row.team._id) ?? [];
        const padded = [...chips, ...Array(Math.max(0, 5 - chips.length)).fill(null)];
        const ids = padded.map(() => crypto.randomUUID());

        return (
          <div className="flex justify-between">
            {padded.map((chip, i) =>
              chip === null ? (
                <div
                  key={ids[i]}
                  className="w-6 h-6 shrink-0 flex items-center justify-center rounded-md bg-muted-2"
                >
                  <p className="text-[11px] font-inter font-semibold text-white leading-none">-</p>
                </div>
              ) : (
                <div
                  key={ids[i]}
                  className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-md ${
                    chip.isWin ? "bg-win" : chip.isDraw ? "bg-tie" : "bg-loss"
                  }`}
                >
                  <p className="text-3xs font-inter font-semibold text-white leading-none">
                    {chip.isWin ? "W" : chip.isDraw ? "T" : "L"}
                  </p>
                </div>
              )
            )}
          </div>
        );
      },
    }),
    [formByTeam]
  );

  if (isPending) return <div className="text-muted text-sm py-8">Loading standings...</div>;

  return (
    <div>
      <StandingsTable
        rows={rows}
        columns={ALL_COLUMNS}
        extraColumns={[formColumn]}
        sortable
        // highlightTeamId={teamId}
        getRowClassName={getRowClassName}
      />

      {/* ── Legend ── */}
      <div className="flex flex-col gap-2 mt-4 px-1 border-t border-line pt-2">
        {ZONES.map((zone) => (
          <div key={zone.label} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm shrink-0 ${zone.dot}`} />
            <span className="text-[11px] text-muted">{zone.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullStandingsTable;

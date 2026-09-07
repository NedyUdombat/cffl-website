import { useState } from "react";
import CategoriesToggle from "@/components/CategoriesToggle";
import EmptyState from "@/components/EmptyState";
import { Table } from "@/components/Table";
import type { ColumnDef } from "@/components/Table/types";
import useFetchRosterEntries from "@/queries/players/useFetchRosterEntries";
import { CATEGORIES } from "./categories";
import makeDummyStats from "./dummy-stats";
import { buildColumns, playerCol } from "./helpers";
import Leaderboard from "./Leaderboard";
import TeamSummary from "./TeamSummary";
import type { Category, PlayerStatRow, StatsTabProps } from "./types";

const StatsTab = ({ teamId, competitionId }: StatsTabProps) => {
  const [category, setCategory] = useState<Category>("passing");

  const { data: roster, isPending } = useFetchRosterEntries({
    team: teamId,
    competition: competitionId,
    enabled: !!teamId,
  });

  const rows: PlayerStatRow[] = roster.map((entry) => ({
    ...entry,
    ...makeDummyStats(entry._id),
  }));

  const columns: ColumnDef<PlayerStatRow>[] = [playerCol, ...buildColumns(category)];
  const activeCat = CATEGORIES.find((c) => c.id === category)!;

  return (
    <section className="bg-bg-2">
      <div className="max-w-[1440px] mx-auto py-8 px-6 md:px-14 lg:px-20 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4 flex-wrap ">
          <h2 className="font-mono text-xl">Player Statistics</h2>

          <CategoriesToggle items={CATEGORIES} value={category} onChange={setCategory} />
        </div>

        {/* ── Team Summary ── */}
        {isPending ? null : <TeamSummary rows={rows} category={category} />}

        {/* ── Leaderboard ── */}
        {isPending ? null : <Leaderboard rows={rows} category={category} />}

        {/* ── Table card ── */}
        <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-line-2 bg-surface-2">
            <span className={`w-1 h-5 rounded-full ${activeCat.borderAccent} shrink-0`} />
            <span
              className={`font-mono font-semibold text-sm uppercase tracking-[0.14em] ${activeCat.accentColor}`}
            >
              {activeCat.label}
            </span>
            <span className="font-mono text-[10px] text-muted ml-auto">
              * Dummy data — stats not yet seeded
            </span>
          </div>

          {isPending ? (
            <div className="py-16 text-center">
              <div className="inline-block w-5 h-5 border-2 border-line border-t-muted rounded-full animate-spin" />
              <p className="mt-3 font-mono text-xs text-muted">Loading players…</p>
            </div>
          ) : (
            <div className="p-5">
              <Table
                data={rows}
                columns={columns}
                getRowKey={(row) => row._id}
                sortable
                defaultSortKey="gamesPlayed"
                defaultSortDir="desc"
                striped
                emptyState={<EmptyState title="No players found" />}
                tdClassName="text-ink align-middle"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsTab;

import LeaderboardCard from "@/components/LeaderboardCard";
import { CATEGORIES, LEADERBOARD_DEFS } from "./categories";
import type { Category, PlayerStatRow } from "./types";

const Leaderboard = ({ rows, category }: { rows: PlayerStatRow[]; category: Category }) => {
  const defs = LEADERBOARD_DEFS[category];
  const activeCat = CATEGORIES.find((c) => c.id === category)!;

  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <span className={`w-1 h-5 rounded-full ${activeCat.borderAccent} shrink-0 self-center`} />
        <h3 className="font-mono font-semibold text-base uppercase tracking-[0.14em] text-ink">
          Season Leaders
        </h3>
        <span className="font-mono text-[10px] text-muted">Top 5 per category</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x scrollbar-none">
        {defs.map((def) => (
          <div key={def.abbr} className="snap-start">
            <LeaderboardCard def={def} rows={rows} accentColor={activeCat.accentColor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

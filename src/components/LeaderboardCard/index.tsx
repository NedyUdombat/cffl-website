import Image from "next/image";
import { LEADERBOARD_ROWS } from "@/containers/SingleTeam/Tabs/StatsTab/categories";
import { getDisplayName, getInitials } from "@/containers/SingleTeam/Tabs/StatsTab/helpers";
import type { LeaderDef, PlayerStatRow } from "@/containers/SingleTeam/Tabs/StatsTab/types";

const LeaderboardCard = ({
  def,
  rows,
  accentColor,
}: {
  def: LeaderDef;
  rows: PlayerStatRow[];
  accentColor: string;
}) => {
  const ranked = [...rows]
    .filter((r) => def.getValue(r) > 0)
    .sort((a, b) => def.getValue(b) - def.getValue(a))
    .slice(0, LEADERBOARD_ROWS);

  const slots: (PlayerStatRow | null)[] = [
    ...ranked,
    ...Array<null>(Math.max(0, LEADERBOARD_ROWS - ranked.length)).fill(null),
  ];

  return (
    <div className="bg-white border border-line rounded-xl overflow-hidden flex-shrink-0 w-[248px] shadow-sm">
      {/* Card header */}
      <div className="relative px-4 pt-4 pb-3 border-b border-line-2 bg-surface-2 overflow-hidden">
        {/* Ghost background text */}
        <span
          className="absolute right-2 bottom-0 font-mono font-bold text-[64px] leading-none text-ink/[0.04] select-none pointer-events-none translate-y-2"
          aria-hidden
        >
          {def.abbr}
        </span>
        <p className="font-mono font-bold text-2xl text-ink leading-none tracking-wide relative z-10">
          {def.abbr}
        </p>
        <p className="font-mono text-[9px] text-muted uppercase tracking-[0.14em] mt-1 relative z-10">
          {def.label}
        </p>
      </div>

      {/* Ranked rows */}
      <div>
        {slots.map((player, i) => {
          const isTop = i === 0;
          const statValue = player ? def.getValue(player) : null;

          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length padding slots
              key={player?._id ?? `empty-${i}`}
              className={[
                "flex items-center gap-3 px-4 border-b border-line-2 last:border-b-0 transition-colors",
                player ? "h-[52px] hover:bg-line-2" : "h-[52px]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {player ? (
                <>
                  {/* Avatar */}
                  <div
                    className={[
                      "size-8 rounded-full grid place-items-center shrink-0 relative overflow-hidden ring-1",
                      isTop ? "ring-win/40 bg-win/10" : "ring-line bg-surface-2",
                    ].join(" ")}
                  >
                    {player.player?.photo ? (
                      <Image
                        src={player.player.photo}
                        alt={getDisplayName(player)}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-mono font-semibold text-[10px] text-muted">
                        {getInitials(player)}
                      </span>
                    )}
                  </div>

                  {/* Name + number */}
                  <div className="flex-1 min-w-0">
                    <p className="font-mono font-semibold text-sm text-ink leading-tight tracking-wide truncate">
                      {getDisplayName(player)}
                    </p>
                    <p className="font-mono text-[9px] text-muted leading-tight">
                      #{String(player.jerseyNumber ?? 0).padStart(2, "0")}
                    </p>
                  </div>

                  {/* Stat value */}
                  <span
                    className={[
                      "font-mono font-bold text-2xl tabular-nums leading-none shrink-0",
                      isTop ? accentColor : "text-ink",
                    ].join(" ")}
                  >
                    {statValue}
                  </span>
                </>
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderboardCard;

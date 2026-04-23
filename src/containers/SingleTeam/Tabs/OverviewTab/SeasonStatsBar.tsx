import { motion } from "framer-motion";
import type { OverviewStats } from "../../types";
import { fadeUp } from "../../types";

export function SeasonStatsBar({ stats }: { stats: OverviewStats }) {
  const items = [
    { label: "Wins", value: stats.wins },
    { label: "Draws", value: stats.draws },
    { label: "Losses", value: stats.losses },
    { label: "Win %", value: `${stats.winPct}%` },
    { label: "Pts For", value: stats.ptsFor },
    { label: "Pts Agst", value: stats.ptsAgainst },
  ];

  return (
    <motion.div variants={fadeUp}>
      <div className="flex items-center rounded-xl px-5 py-3.5 bg-white">
        <div className="flex flex-1 items-stretch">
          {items.map(({ label, value }) => (
            <div
              key={label}
              className="flex-1 flex flex-col items-center text-center px-2 border-r last:border-r-0"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span className="font-barlow-condensed font-black text-2xl sm:text-3xl text-primary leading-none tabular-nums">
                {value}
              </span>
              <span
                className="text-[9px] uppercase tracking-widest mt-1 font-mono"
                style={{ color: "#4b5563" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

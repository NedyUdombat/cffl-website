"use client";

import type { Standing } from "./types";
import { SectionHeading } from "./SectionHeading";

export function StandingsTab({
  standings,
  form,
  teamSlug,
  primaryColor,
}: {
  standings: Standing[];
  form: ('W' | 'L')[];
  teamSlug: string;
  primaryColor: string;
}) {
  const wins = form.filter((r) => r === "W").length;
  const losses = form.filter((r) => r === "L").length;

  const sorted = [...standings].sort((a, b) => b.wins - a.wins || a.losses - b.losses);

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Standings</SectionHeading>
        </div>

        {/* ── Form bar ──────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-inter">
              Season Form
            </span>
            <span className="font-barlow-condensed font-bold text-sm text-gray-900">
              {wins}W – {losses}L
            </span>
          </div>
          <div className="flex gap-1">
            {form.map((r, i) => (
              <div
                key={i}
                className="flex-1 h-3 rounded-sm"
                style={{ backgroundColor: r === "W" ? "#16a34a" : "#dc2626" }}
                title={r === "W" ? "Win" : "Loss"}
              />
            ))}
          </div>
        </div>

        {/* ── League table ──────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-[24px_1fr_40px_40px_40px_56px_56px_56px] gap-0 bg-gray-50 px-4 py-3">
            {["#", "Team", "GP", "W", "L", "PF", "PA", "+/−"].map((col, i) => (
              <span
                key={col}
                className={[
                  "text-[10px] text-gray-400 uppercase tracking-wider font-inter font-bold",
                  i > 1 ? "text-center" : "",
                  i === 7 ? "text-right" : "",
                ].join(" ")}
              >
                {col}
              </span>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((s) => {
            const isCurrent = s.teamSlug === teamSlug;
            const diff = s.pointsFor - s.pointsAgainst;
            const diffColor =
              diff > 0 ? "#16a34a" : diff < 0 ? "#dc2626" : "#9ca3af";

            return (
              <div
                key={s.teamSlug}
                className="grid grid-cols-[24px_1fr_40px_40px_40px_56px_56px_56px] gap-0 border-t border-gray-50 px-4 py-3 items-center"
                style={
                  isCurrent
                    ? {
                        background: `linear-gradient(90deg, ${primaryColor}14 0%, transparent 100%)`,
                        borderLeft: `2px solid ${primaryColor}`,
                      }
                    : {}
                }
              >
                <span className="text-xs text-gray-400 font-inter">{s.rank}</span>
                <span
                  className={[
                    "font-inter text-sm truncate",
                    isCurrent ? "font-semibold text-gray-900" : "font-normal text-gray-700",
                  ].join(" ")}
                >
                  {s.teamName}
                </span>
                <span className="text-xs text-gray-500 font-inter text-center">{s.gp}</span>
                <span className={["text-xs font-inter text-center", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.wins}</span>
                <span className={["text-xs font-inter text-center", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.losses}</span>
                <span className={["text-xs font-inter text-center tabular-nums", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.pointsFor}</span>
                <span className={["text-xs font-inter text-center tabular-nums", isCurrent ? "font-semibold text-gray-900" : "text-gray-700"].join(" ")}>{s.pointsAgainst}</span>
                <span
                  className="text-xs font-inter font-semibold text-right tabular-nums"
                  style={{ color: isCurrent ? diffColor : "#9ca3af" }}
                >
                  {diff > 0 ? `+${diff}` : diff}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronRight, UserCircle } from "lucide-react";
import { fadeUp, staggerGrid } from "./types";
import type { CoachData, MatchResult, Standing, TeamStats } from "./types";
import { MatchResultRow } from "./MatchResultRow";
import { SectionHeading } from "./SectionHeading";
import type { Tab } from "./TabBar";

export function OverviewTab({
  stats,
  standings,
  teamSlug,
  results,
  headCoach,
  assistantCoach,
  primaryColor,
  onTabChange,
}: {
  stats: TeamStats;
  standings: Standing[];
  teamSlug: string;
  results: MatchResult[];
  headCoach: CoachData;
  assistantCoach: CoachData;
  primaryColor: string;
  onTabChange: (tab: Tab) => void;
}) {
  const winPct =
    stats.wins + stats.losses > 0
      ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
      : 0;

  const currentIdx = standings.findIndex((s) => s.teamSlug === teamSlug);
  const snippet = standings.slice(
    Math.max(0, currentIdx - 1),
    Math.min(standings.length, currentIdx + 2),
  );

  const last3 = results.slice(0, 3);

  const statItems = [
    { label: "Wins",     value: stats.wins          },
    { label: "Losses",   value: stats.losses         },
    { label: "Win %",    value: `${winPct}%`         },
    { label: "Pts For",  value: stats.pointsScored   },
    { label: "Pts Agst", value: stats.pointsAllowed  },
  ];

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Overview</SectionHeading>
        </div>

        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ── Card 1: Season Stats ─────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
          >
            <p className="text-xs text-gray-400 uppercase tracking-widest font-inter mb-5">
              2025 Season Stats
            </p>
            <div className="flex items-end gap-0">
              {statItems.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center text-center px-1 border-r border-gray-100 last:border-r-0"
                >
                  <span
                    className="font-barlow-condensed font-bold text-3xl leading-none tabular-nums"
                    style={{ color: primaryColor }}
                  >
                    {value}
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-inter mt-1.5 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 2: Standings Snapshot ───────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
                Standings
              </p>
              <button
                type="button"
                onClick={() => onTabChange("standings")}
                className="flex items-center gap-0.5 text-[11px] font-inter text-gray-400 hover:text-gray-700 transition-colors"
              >
                Full table <ChevronRight size={12} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-1">
              {snippet.map((s) => {
                const isCurrent = s.teamSlug === teamSlug;
                return (
                  <div
                    key={s.teamSlug}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={
                      isCurrent
                        ? {
                            background: `linear-gradient(90deg, ${primaryColor}14 0%, transparent 100%)`,
                            borderLeft: `2px solid ${primaryColor}`,
                          }
                        : {}
                    }
                  >
                    <span className="text-xs text-gray-400 font-inter w-4 flex-shrink-0">
                      {s.rank}
                    </span>
                    <span
                      className={[
                        "font-inter text-sm flex-1 truncate",
                        isCurrent ? "font-semibold text-gray-900" : "font-normal text-gray-600",
                      ].join(" ")}
                    >
                      {s.teamName}
                    </span>
                    <span
                      className={[
                        "font-inter text-xs tabular-nums",
                        isCurrent ? "font-semibold text-gray-900" : "text-gray-400",
                      ].join(" ")}
                    >
                      {s.wins}W–{s.losses}L
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Card 3: Last 3 Results ───────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
                Recent Results
              </p>
              <button
                type="button"
                onClick={() => onTabChange("matches")}
                className="flex items-center gap-0.5 text-[11px] font-inter text-gray-400 hover:text-gray-700 transition-colors"
              >
                All results <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {last3.map((result) => (
                <MatchResultRow key={result.date + result.opponent} result={result} />
              ))}
            </div>
          </motion.div>

          {/* ── Card 4: Coaching Staff Snapshot ─────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
                Coaching Staff
              </p>
              <button
                type="button"
                onClick={() => onTabChange("staff")}
                className="flex items-center gap-0.5 text-[11px] font-inter text-gray-400 hover:text-gray-700 transition-colors"
              >
                Full staff <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {[headCoach, assistantCoach].map((coach) => (
                <div key={coach.title} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}18` }}
                  >
                    <UserCircle size={22} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-inter">
                      {coach.title}
                    </p>
                    <p className="font-inter font-semibold text-base text-gray-900 leading-tight mt-0.5">
                      {coach.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

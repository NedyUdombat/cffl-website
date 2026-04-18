"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Player, PlayerGender } from "../types";
import { staggerGrid } from "../types";
import { PlayerCard } from "./PlayerCard";
import { SectionHeading } from "./SectionHeading";

type PositionFilter = "All" | string;
type GenderFilter = "All" | PlayerGender;

export function RosterTab({ roster, primaryColor }: { roster: Player[]; primaryColor: string }) {
  const [posFilter, setPosFilter] = useState<PositionFilter>("All");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("All");

  // Derive unique positions from the actual roster
  const positions = useMemo<string[]>(() => {
    const seen = new Set<string>();
    roster.forEach((p) => {
      if (p.position) seen.add(p.position);
    });
    return Array.from(seen).sort();
  }, [roster]);

  const filtered = useMemo(
    () =>
      roster.filter((p) => {
        const posMatch = posFilter === "All" || p.position === posFilter;
        const genMatch = genderFilter === "All" || p.gender === genderFilter;
        return posMatch && genMatch;
      }),
    [roster, posFilter, genderFilter]
  );

  const pillBase =
    "px-3.5 py-1.5 rounded-full text-[11px] font-barlow font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer border";

  const activePill = (color: string) => ({
    backgroundColor: color,
    color: "#fff",
    borderColor: color,
  });

  const inactivePill = {
    backgroundColor: "transparent",
    color: "#6b7280",
    borderColor: "#e5e7eb",
  };

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading + count */}
        <div className="flex items-center justify-between mb-6">
          <SectionHeading primaryColor={primaryColor}>Roster</SectionHeading>
          <span className="text-xs text-gray-400 font-inter">
            {filtered.length} / {roster.length} players
          </span>
        </div>

        {/* ── Position filters ─────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(["All", ...positions] as PositionFilter[]).map((pos) => {
            const isActive = posFilter === pos;
            return (
              <button
                key={pos}
                type="button"
                onClick={() => setPosFilter(pos)}
                className={pillBase}
                style={isActive ? activePill(primaryColor) : inactivePill}
              >
                {pos}
              </button>
            );
          })}
        </div>

        {/* ── Gender filters ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["All", "Male", "Female"] as GenderFilter[]).map((g) => {
            const isActive = genderFilter === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGenderFilter(g)}
                className={pillBase}
                style={isActive ? activePill(primaryColor) : inactivePill}
              >
                {g}
              </button>
            );
          })}
        </div>

        {/* ── Player grid ─────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 font-inter py-16">
            No players match this filter.
          </p>
        ) : (
          <motion.div
            key={`${posFilter}-${genderFilter}`}
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((player) => (
              <PlayerCard key={player.id} player={player} primaryColor={primaryColor} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

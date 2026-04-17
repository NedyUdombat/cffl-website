"use client";

import type { MatchResult, Fixture } from "./types";

// ─── Result row ─────────────────────────────────────────────────────────────
export function MatchResultRow({ result }: { result: MatchResult }) {
  const isWin = result.result === "W";
  const [year, month, day] = result.date.split("-");
  const monthAbbr = new Date(`${year}-${month}-${day}`).toLocaleString("en", { month: "short" }).toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex items-stretch hover:bg-gray-50 transition-colors duration-150">
      {/* Left accent bar */}
      <div
        className="w-1 flex-shrink-0"
        style={{ backgroundColor: isWin ? "#16a34a" : "#dc2626" }}
      />

      <div className="flex items-center gap-4 px-4 py-3 flex-1 min-w-0">
        {/* Date block */}
        <div className="bg-gray-900 text-white rounded px-2.5 py-1.5 text-center flex-shrink-0 min-w-[44px]">
          <p className="text-[9px] font-inter font-bold leading-none">{monthAbbr}</p>
          <p className="text-sm font-barlow-condensed font-bold leading-none mt-0.5">{day}</p>
        </div>

        {/* Opponent */}
        <div className="flex-1 min-w-0">
          <p className="font-inter font-semibold text-sm text-gray-900 truncate">
            {result.isHome ? "vs" : "@"} {result.opponent}
          </p>
          <p className="text-[10px] text-gray-400 font-inter uppercase tracking-wide mt-0.5">
            {result.isHome ? "Home" : "Away"}
          </p>
        </div>

        {/* Score */}
        <div className="flex items-baseline gap-1.5 flex-shrink-0 font-barlow-condensed font-bold text-lg tabular-nums">
          <span style={{ color: isWin ? "#111827" : "#9ca3af" }}>
            {result.teamScore}
          </span>
          <span className="text-gray-300 text-base">–</span>
          <span style={{ color: isWin ? "#9ca3af" : "#111827" }}>
            {result.opponentScore}
          </span>
        </div>

        {/* Result pill */}
        <span
          className={[
            "flex-shrink-0 px-2.5 py-1 rounded text-[10px] font-inter font-bold uppercase",
            isWin
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600",
          ].join(" ")}
        >
          {result.result}
        </span>
      </div>
    </div>
  );
}

// ─── Fixture row ─────────────────────────────────────────────────────────────
export function FixtureRow({ fixture }: { fixture: Fixture }) {
  const [year, month, day] = fixture.date.split("-");
  const monthAbbr = new Date(`${year}-${month}-${day}`).toLocaleString("en", { month: "short" }).toUpperCase();

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex items-stretch hover:bg-gray-50 transition-colors duration-150">
      {/* Left accent bar — gray for upcoming */}
      <div className="w-1 flex-shrink-0 bg-gray-200" />

      <div className="flex items-center gap-4 px-4 py-3 flex-1 min-w-0">
        {/* Date block */}
        <div className="bg-gray-100 text-gray-600 rounded px-2.5 py-1.5 text-center flex-shrink-0 min-w-[44px]">
          <p className="text-[9px] font-inter font-bold leading-none">{monthAbbr}</p>
          <p className="text-sm font-barlow-condensed font-bold leading-none mt-0.5">{day}</p>
        </div>

        {/* Opponent */}
        <div className="flex-1 min-w-0">
          <p className="font-inter font-semibold text-sm text-gray-700 truncate">
            {fixture.isHome ? "vs" : "@"} {fixture.opponent}
          </p>
          <p className="text-[10px] text-gray-400 font-inter uppercase tracking-wide mt-0.5">
            {fixture.isHome ? "Home" : "Away"} · {fixture.kickoffTime}
          </p>
        </div>

        {/* TBD pill */}
        <span className="flex-shrink-0 px-2.5 py-1 rounded text-[10px] font-inter font-bold uppercase bg-gray-100 text-gray-500">
          TBD
        </span>
      </div>
    </div>
  );
}

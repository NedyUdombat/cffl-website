"use client";

import type { MATCHES_QUERYResult } from "sanity.types";
import { useCompetition } from "@/contexts/CompetitionContext";
import FullStandingsTable from "./FullStandingsTable";

const StandingsTab = ({
  teamId,
  matchResults,
}: {
  teamId: string;
  matchResults: MATCHES_QUERYResult;
}) => {
  const { selectedCompetition } = useCompetition();

  const completedMatches = matchResults.filter(
    (m) => m.status === "completed" && m.homeScore != null && m.awayScore != null
  );
  const wins = completedMatches.filter((m) => {
    const isHome = m.homeTeam?._id === teamId;
    return isHome ? m.homeScore! > m.awayScore! : m.awayScore! > m.homeScore!;
  }).length;
  const losses = completedMatches.filter((m) => {
    const isHome = m.homeTeam?._id === teamId;
    return isHome ? m.homeScore! < m.awayScore! : m.awayScore! < m.homeScore!;
  }).length;
  const draws = completedMatches.filter((m) => m.homeScore === m.awayScore).length;

  return (
    <section className="bg-[#f0f2f5]">
      <div className="max-w-[1440px] mx-auto py-8  px-6 md:px-14 lg:px-20">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md uppercase tracking-wider font-inter font-normal">
              {selectedCompetition?.name} Standings
            </h2>
            <span className="font-barlow font-normal text-sm text-gray-900">
              {wins}W - {draws}D - {losses}L
            </span>
          </div>
          <FullStandingsTable competition={selectedCompetition} teamId={teamId} />
        </div>
      </div>
    </section>
  );
};

export default StandingsTab;

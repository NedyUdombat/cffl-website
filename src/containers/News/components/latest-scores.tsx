"use client";
import { ArrowRight } from "lucide-react";
import { MatchReplayCard } from "@/components/MatchReplayCard";
import useFetchMatches from "@/queries/matches/useFetchMatches";

export function LatestScores() {
  const { data: matches, isPending: isMatchesPending } = useFetchMatches({
    status: "completed",
    pageSize: 3,
    sortField: "date",
    sortOrder: "desc",
  });

  if (isMatchesPending) {
    return <LatestScoresLoader />;
  }

  return (
    <div className="bg-transparent p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[12px] font-bold text-[#002060] tracking-wider uppercase">
          LATEST SCORES
        </h3>
        <a
          href="/matches"
          className="text-[12px] font-medium text-[#0052FF] hover:underline flex items-center gap-1"
        >
          See all <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {matches && matches.length > 0 ? (
          matches.map((match) => (
            <MatchReplayCard
              key={match._id}
              match={match}
              className="pl-0 h-25!"
              showDetails={false}
            />
          ))
        ) : (
          <p className="text-xs text-gray-400 text-center py-4">No recent scores available</p>
        )}
      </div>
    </div>
  );
}

const MATCHES_CARDS = ["card-1", "card-2", "card-3"];

export const LatestScoresLoader = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
      <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-md space-y-4 animate-shimmer">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-col gap-4 bg-white">
          {MATCHES_CARDS.map((match) => (
            <div
              key={match}
              className="relative h-30 w-full bg-gray-200 rounded-2xl flex items-center justify-between p-6 overflow-hidden"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-28 bg-gray-300 rounded-full"></div>

              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
              </div>

              <div className="flex flex-col items-center space-y-2 mt-4">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-3 w-12 bg-gray-300 rounded"></div>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

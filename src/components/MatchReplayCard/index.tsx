import Image from "next/image";
import type { MATCHES_QUERYResult } from "sanity.types";

interface MatchReplayCardProps {
  match: MATCHES_QUERYResult[0];
  className?: string;
  showDetails?: boolean;
}

export function MatchReplayCard({ match, className, showDetails = true }: MatchReplayCardProps) {
  const homeColor = match.homeTeam?.primaryColor || "#000000";
  const awayColor = match.awayTeam?.primaryColor || "#002060";

  return (
    <div key={match._id} className={`shrink-0 h-45 w-full ${className}`}>
      <a
        href={match.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col justify-center relative gap-1 h-full w-full rounded-2xl overflow-hidden shadow-md group cursor-pointer"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(to right, ${homeColor} 50%, ${awayColor} 50%)`,
          }}
        />

        {showDetails && match.matchDay && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full z-20">
            <p className="text-white text-2xs font-bold tracking-wider uppercase whitespace-nowrap">
              Match Day {match.matchDay}
            </p>
          </div>
        )}

        <div className="relative z-10 flex items-center justify-between h-full px-6">
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="w-12.5 h-12.5 relative">
              <Image
                src={match.homeTeam?.logo || "/placeholder.png"}
                alt={match.homeTeam?.name || "Home Team"}
                fill
                className="object-contain"
              />
            </div>
            {showDetails && (
              <p
                className="mt-2 text-white text-[18px] font-bold uppercase"
                style={{ fontFamily: "ITC Machine Std, sans-serif" }}
              >
                {match.homeTeam?.abbreviation || match.homeTeam?.name}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center z-20">
            <p className="text-white text-[24px] md:text-[28px] font-black tracking-tight whitespace-nowrap">
              {match.homeScore ?? 0} - {match.awayScore ?? 0}
            </p>
            {showDetails && (
              <span className="text-2xs text-white/80 font-bold tracking-widest uppercase mt-1">
                FINAL
              </span>
            )}
          </div>

          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="w-12.5 h-12.5 relative">
              <Image
                src={match.awayTeam?.logo || "/placeholder.png"}
                alt={match.awayTeam?.name || "Away Team"}
                fill
                className="object-contain"
              />
            </div>
            {showDetails && (
              <p
                className="mt-2 text-white text-[18px] font-bold uppercase"
                style={{ fontFamily: "ITC Machine Std, sans-serif" }}
              >
                {match.awayTeam?.abbreviation || match.awayTeam?.name}
              </p>
            )}
          </div>
        </div>

        {match.url && (
          <div className="absolute bottom-3 right-3 z-20">
            <div className="w-7 h-7 rounded-full border-2 border-white/80 bg-black/20 flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-8 border-l-white ml-0.5" />
            </div>
          </div>
        )}
      </a>
    </div>
  );
}

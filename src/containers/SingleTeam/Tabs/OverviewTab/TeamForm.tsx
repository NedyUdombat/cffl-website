import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { MATCHES_QUERYResult } from "sanity.types";
import { fadeUp } from "../../types";

function pad2(n: number | null): string {
  if (n === null) return "–";
  return String(n).padStart(2, "0");
}

export function TeamForm({
  matchResults,
  teamId,
  nextMatchData,
}: {
  matchResults: MATCHES_QUERYResult;
  teamId: string;
  nextMatchData: MATCHES_QUERYResult;
}) {
  return (
    <motion.div variants={fadeUp} className="rounded-xl p-3 text-black flex gap-3 bg-white">
      <div
        className="w-full flex gap-2 justify-between overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {matchResults.map((result) => {
          const isHome = result?.homeTeam?._id === teamId;

          const opponent = isHome ? result?.awayTeam : result?.homeTeam;
          const myScore = isHome ? result?.homeScore : result?.awayScore;
          const oppScore = isHome ? result?.awayScore : result?.homeScore;
          const isWin =
            myScore !== null &&
            oppScore !== null &&
            myScore !== undefined &&
            oppScore !== undefined &&
            myScore > oppScore;
          const isDraw = myScore === oppScore;
          const oppName = opponent?.name ?? opponent?.abbreviation ?? "?";
          const oppInitials = oppName
            .split(/\s+/)
            .map((w) => w[0] ?? "")
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={result._id}
              className="shrink-0 flex flex-col items-center"
              style={{ minWidth: 88 }}
            >
              {/* WK n • H / A — muted on dark */}
              <p className="w-full flex item-center justify-center text-[12px] text-black tracking-wide font-inter whitespace-nowrap">
                {result.matchDay ? `WK ${result.matchDay}` : "–"} • {isHome ? "H" : "A"}
              </p>

              {/* Glassy logo container — mirrors HeroSection exactly */}
              <div className="relative">
                <div
                  className="w-18 h-18 mx-auto rounded-lg flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    // border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <Link href={`/teams/${opponent?.slug}`} className="cursor-pointer">
                    {opponent?.logo ? (
                      <Image
                        src={opponent.logo}
                        alt={oppName}
                        width={48}
                        height={48}
                        className="object-contain p-1"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: 26,
                          fontWeight: 800,
                          color: "rgba(255,255,255,0.85)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {oppInitials}
                      </span>
                    )}
                  </Link>
                </div>

                {/* W / L badge — overlapping bottom-right corner */}
                <div className="w-full flex items-center justify-center text-[11px] font-inter text-black">
                  {opponent.abbreviation}
                </div>
              </div>

              {/* Score — white on dark */}
              <div
                className={`w-full flex justify-center items-center py-2 rounded-b-xl ${
                  isWin ? "bg-win" : isDraw ? "bg-tie" : "bg-loss"
                }`}
              >
                <p className="font-barlow-condensed tabular-nums leading-none text-white">
                  {isHome
                    ? `${pad2(myScore)} - ${pad2(oppScore)}`
                    : `${pad2(oppScore)} - ${pad2(myScore)}`}
                </p>
              </div>
            </div>
          );
        })}
        {nextMatchData.slice(0, 6 - matchResults.length).map((match) => {
          const isHome = match?.homeTeam?._id === teamId;
          const opponent = isHome ? match?.awayTeam : match?.homeTeam;
          const oppName = opponent?.name ?? opponent?.abbreviation ?? "?";
          const oppInitials = oppName
            .split(/\s+/)
            .map((w) => w[0] ?? "")
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={match._id}
              className="shrink-0 flex flex-col items-center"
              style={{ minWidth: 88 }}
            >
              <p className="w-full flex item-center justify-center text-[12px] text-black tracking-wide font-inter whitespace-nowrap">
                {match.matchDay ? `WK ${match.matchDay}` : "–"} • {isHome ? "H" : "A"}
              </p>

              <div className="relative">
                <div
                  className="w-18 h-18 mx-auto rounded-lg flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <Link href={`/teams/${opponent?.slug}`} className="cursor-pointer">
                    {opponent?.logo ? (
                      <Image
                        src={opponent.logo}
                        alt={oppName}
                        width={48}
                        height={48}
                        className="object-contain p-1"
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: 26,
                          fontWeight: 800,
                          color: "rgba(255,255,255,0.85)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {oppInitials}
                      </span>
                    )}
                  </Link>
                </div>

                <div className="w-full flex items-center justify-center text-[11px] font-inter text-black">
                  {opponent?.abbreviation}
                </div>
              </div>

              <div
                style={{ backgroundColor: "#9ca3af" }}
                className="w-full flex justify-center items-center py-2 rounded-b-xl"
              >
                <p className="font-barlow-condensed tabular-nums leading-none text-white">– - –</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

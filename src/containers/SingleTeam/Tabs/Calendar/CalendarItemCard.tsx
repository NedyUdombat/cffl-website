import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaMapPin, FaRegClock, FaYoutube } from "react-icons/fa";

interface CalendarItemCardProps {
  dayData: {
    sortValue: Date;
    match: {
      _id: string;
      matchDay: number;
      matchNumber: number;
      date: string;
      time: string;
      location: string;
      homeScore: number;
      awayScore: number;
      status: "cancelled" | "completed" | "scheduled";
      url?: string;
      homeTeam: {
        _id: string;
        name: string;
        abbreviation: string;
        logo: string;
        slug: string;
      };
      awayTeam: {
        _id: string;
        name: string;
        abbreviation: string;
        logo: string;
        slug: string;
      };
      competition: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
    };
  };
  day: string;
  teamId: string;
}

const CalendarItemCard = ({ day, dayData, teamId }: CalendarItemCardProps) => {
  const isHome = dayData.match?.homeTeam?._id === teamId;

  const homeTeam = dayData.match?.homeTeam;
  const awayTeam = dayData.match?.awayTeam;

  const myTeam = isHome ? dayData.match?.homeTeam : dayData.match?.awayTeam;
  const isWin =
    dayData.match.status === "completed" && isHome
      ? dayData.match?.homeScore > dayData.match?.awayScore
      : dayData.match?.awayScore > dayData.match?.homeScore;
  const isDraw =
    dayData.match.status === "completed" && dayData.match?.homeScore === dayData.match?.awayScore;
  const isLoss =
    dayData.match.status === "completed" && isHome
      ? dayData.match?.homeScore < dayData.match?.awayScore
      : dayData.match?.awayScore < dayData.match?.homeScore;

  const initials = (name) => {
    return name
      .split(/\s+/)
      .map((w) => w[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div key={day} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex">
      <div className="flex flex-col justify-center gap-1 text-center">
        <p className="font-inter text-xs text-muted">{format(dayData.sortValue, "EEE")}</p>
        <h3 className="font-mono text-3xl font-bold">{format(dayData.sortValue, "dd")}</h3>
        <p className="font-inter text-xs text-muted">{format(dayData.sortValue, "MMM")}</p>
      </div>
      <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Link
          href={`/teams/${homeTeam?.slug}?tab=matches`}
          className="cursor-pointer flex gap-1 items-center justify-end text-right"
        >
          <p className="font-mono text-sm">{homeTeam?.name ?? homeTeam?.abbreviation ?? "?"}</p>
          {homeTeam?.logo ? (
            <Image
              src={homeTeam.logo}
              alt={homeTeam?.name ?? homeTeam?.abbreviation ?? "?"}
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
              {initials(homeTeam?.name ?? homeTeam?.abbreviation)}
            </span>
          )}
        </Link>

        <div className="flex flex-col items-center justify-center min-w-[100px]">
          {dayData.match.status === "completed" ? (
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 bg-bg-2 px-2 justify-center text-xl">
                <p className="font-mono font-bold">{dayData.match.homeScore}</p>
                <p className="font-mono font-bold">-</p>
                <p className="font-mono font-bold">{dayData.match.awayScore}</p>
              </div>

              {dayData.match.url && (
                <Link
                  href={dayData.match.url || `teams/${myTeam?.slug}?tab=matches`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-1 text-center justify-center items-center w-full"
                >
                  <FaYoutube className="text-loss" />
                  <p className="text-3xs font-mono">Watch Recap</p>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex gap-1 bg-bg-2 px-2">
              <p className="font-mono ">{dayData.match.time}</p>
            </div>
          )}
        </div>

        <Link
          href={`/teams/${awayTeam?.slug}?tab=matches`}
          className="cursor-pointer flex items-center justify-start gap-1 text-left"
        >
          {awayTeam?.logo ? (
            <Image
              src={awayTeam.logo}
              alt={awayTeam?.name ?? awayTeam?.abbreviation ?? "?"}
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
              {initials(awayTeam?.name ?? awayTeam?.abbreviation)}
            </span>
          )}
          <p className="font-mono text-sm">{awayTeam?.name ?? awayTeam?.abbreviation ?? "?"}</p>
        </Link>
      </div>

      <div className="px-2 gap-2 flex flex-col justify-center min-w-[160px] w-40">
        <div className="flex gap-1 items-center">
          <div
            className={`w-5 h-5 shrink-0 flex items-center justify-center rounded-md ${
              isWin ? "bg-win" : isDraw ? "bg-tie" : isLoss ? "bg-loss" : "bg-muted-2"
            }`}
          >
            <p className="text-3xs font-inter font-semibold text-white leading-none">
              {isWin ? "W" : isDraw ? "T" : isLoss ? "L" : "-"}
            </p>
          </div>
          <p className="text-xs text-muted-2 font-mono">{isHome ? "Home" : "Away"}</p>
        </div>
        <div className="flex gap-1 items-center">
          <FaRegClock className="text-muted w-5 h-5" />
          <p className="text-xs text-muted-2 font-mono">{dayData.match.time}</p>
        </div>
        <div className="flex gap-1 items-center">
          <FaMapPin className="text-muted w-5 h-5" />
          <p className="text-xs text-muted-2 font-mono">{dayData.match.location}</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarItemCard;

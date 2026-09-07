"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/containers/Footer/Footer";
import Navbar from "../../components/Navbar";
import { client } from "../../sanity/lib/client";

/* ---------------- WEEK DATA ---------------- */
const weekData = [
  { week: "WEEK 4", dates: "OCT 16 - 22" },
  { week: "WEEK 5", dates: "OCT 23 - 29" },
  { week: "WEEK 6", dates: "OCT 30 - NOV 5" },
  { week: "WEEK 7", dates: "NOV 6 - 12" },
  { week: "WEEK 8", dates: "NOV 13 - 19" },
  { week: "WEEK 9", dates: "NOV 20 - 26" },
  { week: "WEEK 10", dates: "NOV 27 - DEC 3" },
  { week: "WEEK 11", dates: "DEC 4 - 10" },
];

/* ---------------- GAME RESULTS COMPONENT ---------------- */
const GameResults: React.FC = () => {
  const [games, setGames] = useState<
    {
      _id: string;
      date: string;
      gameImage: { asset: { url: string } };
      teams: {
        name: string;
        record: string;
        quarters: number[];
        total: string;
        isWinner: boolean;
        logo: { asset: { url: string } };
      }[];
    }[]
  >([]);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await client.fetch(`
        *[_type == "gameResult"] | order(_createdAt desc) {
          _id,
          date,
          gameImage { asset->{ url } },
          teams[] {
            name,
            record,
            quarters,
            total,
            isWinner,
            logo { asset->{ url } }
          }
        }
      `);
      setGames(data);
    };

    fetchGames();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white font-sans">
      <h2 className="text-2xl font-bold text-[#002060] mb-10 uppercase">GAME RESULTS</h2>

      {games.map((game, index) => (
        <div key={game._id || index} className="mb-10 border-b border-gray-200 pb-8">
          {/* Game Date */}
          <div className="text-center text-sm font-medium text-gray-700 mb-4">{game.date}</div>

          {/* Game Row */}
          <div className="bg-white rounded-lg shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 p-4">
            {/* Teams and Scores */}
            <div className="flex flex-col flex-grow">
              {game.teams?.map((team, teamIndex: number) => (
                <div
                  key={team.name}
                  className={`flex items-center justify-between py-3 ${
                    teamIndex === 0 ? "" : "border-t border-gray-300"
                  } ${team.isWinner ? "font-bold" : ""}`}
                >
                  {/* Team Info */}
                  <div className="flex items-center space-x-3">
                    {team.logo?.asset?.url ? (
                      <Image
                        src={team.logo.asset.url}
                        alt={team.name}
                        width={50}
                        height={50}
                        className="object-contain"
                        style={{
                          // width: "50px",
                          // height: "50px",
                          opacity: 1,
                          mixBlendMode: "luminosity",
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full border border-gray-300" />
                    )}
                    <div>
                      <div className="text-base font-semibold">{team.name}</div>
                      <div className="text-xs text-gray-500">{team.record}</div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex items-center space-x-2 text-sm text-gray-800">
                    {team.quarters?.map((q: number) => (
                      <span key={q} className="w-6 text-center">
                        {q}
                      </span>
                    ))}
                    <span className="w-8 text-center font-bold text-lg">{team.total}</span>
                    {team.isWinner && <span className="text-red-600 text-xl">▲</span>}
                  </div>
                </div>
              ))}

              {/* Quarter Labels */}
              <div className="flex items-center justify-end space-x-2 text-xs text-gray-500 mt-2 pr-3">
                <span className="w-24 text-left ml-14">1</span>
                <span className="w-6 text-center">2</span>
                <span className="w-6 text-center">3</span>
                <span className="w-6 text-center">4</span>
                <span className="w-8 text-center">T</span>
              </div>
            </div>

            {/* Image + Play Button */}
            <div className="relative w-full md:w-[220px] h-[130px] flex-shrink-0 rounded-lg overflow-hidden shadow-md">
              {game.gameImage?.asset?.url ? (
                <Image
                  src={game.gameImage.asset.url}
                  alt="Game highlight"
                  fill
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-gray-700 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Play button</title>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-2 w-full md:w-[140px] text-xs font-medium">
              <button
                type="button"
                className="px-3 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
              >
                Gamecast
              </button>
              <button
                type="button"
                className="px-3 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
              >
                Box Score
              </button>
              <button
                type="button"
                className="px-3 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
              >
                Highlights
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------------- MAIN GAMES PAGE ---------------- */
export default function GamesPage() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [activeDivision, setActiveDivision] = useState<"Men" | "Women">("Men");
  const [matches, setMatches] = useState<
    {
      _id: string;
      matchDay: number;
      date: string;
      time: string;
      team1: { name: string; logo: { asset: { url: string } } };
      team2: { name: string; logo: { asset: { url: string } } };
    }[]
  >([]);

  const handleWeekClick = (index: number) => setCurrentWeekIndex(index);
  const handleDivisionClick = (division: "Men" | "Women") => setActiveDivision(division);

  const activeColor = "#1a1a1a";
  const inactiveColor = "#777777";

  const segmentBaseStyle = "py-2 px-6 text-sm font-semibold transition-colors duration-200";
  const segmentActiveStyle = "bg-[#012752] text-white shadow-inner";
  const segmentInactiveStyle = "bg-transparent text-white hover:bg-[#a80f0f]";

  /* ---------------- FETCH FIXTURES ---------------- */
  useEffect(() => {
    const fetchMatches = async () => {
      const data = await client.fetch(`
        *[_type == "match" && division == "${activeDivision}"] | order(matchDay asc) {
          _id,
          matchDay,
          date,
          time,
          team1 { name, logo { asset-> { url } } },
          team2 { name, logo { asset-> { url } } }
        }
      `);
      setMatches(data);
    };

    fetchMatches();
  }, [activeDivision]);

  return (
    <>
      <Navbar linkTextColor="text-gray-800" />

      <main className="min-h-screen bg-white text-gray-800 pt-[160px]">
        {/* ---------------- TOP SECTION ---------------- */}
        <div className="px-4 sm:px-6 md:px-10 max-w-8xl mx-auto">
          <div className="w-full mb-10">
            <Image
              src="/games1.png"
              alt="CFFL Games Background"
              width={1200}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* ---------------- WEEK SCROLLER ---------------- */}
          <section className="relative py-4 border-b border-gray-200 overflow-x-auto">
            <div className="flex items-center justify-between w-full select-none min-w-[320px]">
              <button
                type="button"
                onClick={() => handleWeekClick(currentWeekIndex - 1)}
                disabled={currentWeekIndex === 0}
                className={`p-2 rounded-full transition-all ${
                  currentWeekIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex flex-wrap justify-center md:justify-between items-start grow mx-2 sm:mx-4 gap-3 md:gap-0">
                {weekData.map((weekItem, index) => {
                  const isCurrent = index === currentWeekIndex;
                  return (
                    // biome-ignore lint/a11y/noStaticElementInteractions: will fix
                    <div
                      key={weekItem.week}
                      className={`flex flex-col items-center cursor-pointer px-1 transition-all duration-300 ${
                        isCurrent ? "scale-105" : "hover:opacity-75"
                      }`}
                      onClick={() => handleWeekClick(index)}
                      onKeyDown={() => handleWeekClick(index)}
                    >
                      <span
                        className="font-bold uppercase text-center"
                        style={{
                          fontSize: "12px",
                          color: isCurrent ? activeColor : inactiveColor,
                        }}
                      >
                        {weekItem.week}
                      </span>
                      <span
                        className="font-normal uppercase text-center mt-1"
                        style={{
                          fontSize: "14px",
                          color: isCurrent ? "#333333" : inactiveColor,
                        }}
                      >
                        {weekItem.dates}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => handleWeekClick(currentWeekIndex + 1)}
                disabled={currentWeekIndex === weekData.length - 1}
                className={`p-2 rounded-full transition-all ${
                  currentWeekIndex === weekData.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </section>
        </div>

        {/* ---------------- FIXTURES SECTION ---------------- */}
        <div className="bg-[#F7F7F7] py-12 mt-12">
          <div className="px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 w-full">
              <h2
                className="text-[28px] md:text-[40px] font-extrabold text-[#002060] uppercase tracking-tight"
                style={{ fontFamily: "ITC Machine Std, sans-serif" }}
              >
                Game Fixtures
              </h2>

              <div className="flex rounded-md overflow-hidden bg-[#C90F0F] shadow-lg">
                <button
                  type="button"
                  onClick={() => handleDivisionClick("Men")}
                  className={`${segmentBaseStyle} ${
                    activeDivision === "Men" ? segmentActiveStyle : segmentInactiveStyle
                  }`}
                >
                  Men
                </button>
                <button
                  type="button"
                  onClick={() => handleDivisionClick("Women")}
                  className={`${segmentBaseStyle} ${
                    activeDivision === "Women" ? segmentActiveStyle : segmentInactiveStyle
                  }`}
                >
                  Women
                </button>
              </div>
            </div>

            {/* FIXTURE LIST */}
            {activeDivision === "Men" && (
              <section className="w-full bg-[#F7F7F7] py-6 sm:py-12">
                <div className="space-y-8 max-w-7xl mx-auto px-2 sm:px-4">
                  {matches.map((match) => (
                    <div key={match._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="relative w-full mb-[5px]">
                        <Image
                          src="/m2.png"
                          alt="Match Background"
                          fill
                          className="w-full h-auto object-contain rounded-t-lg"
                        />
                        <Image
                          src="/matchday2.png"
                          alt="Overlay Graphic"
                          fill
                          className="absolute inset-0 w-full h-full object-contain opacity-80 pointer-events-none hidden sm:block"
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 sm:px-4 z-10">
                          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
                            <Image
                              src={match.team1.logo.asset.url}
                              alt={match.team1.name}
                              width={99}
                              height={89}
                              className="object-contain"
                              style={{
                                // width: "99px",
                                // height: "89px",
                                transform: "rotate(0deg)",
                                opacity: 1,
                                mixBlendMode: "luminosity",
                              }}
                            />
                            <h2
                              className="text-white uppercase drop-shadow-lg text-center"
                              style={{
                                fontFamily: "ITC Machine Std, sans-serif",
                                fontWeight: 700,
                                fontStyle: "normal",
                                fontSize: "70px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                              }}
                            >
                              {match.team1.name} <span className="text-white">vs</span>{" "}
                              {match.team2.name}
                            </h2>
                            <Image
                              src={match.team2.logo.asset.url}
                              alt={match.team2.name}
                              className="object-contain"
                              width={99}
                              height={89}
                              style={{
                                // width: "99px",
                                // height: "89px",
                                transform: "rotate(0deg)",
                                opacity: 1,
                                mixBlendMode: "luminosity",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-end p-3 gap-3 sm:gap-0"
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        <div className="text-left text-xs text-gray-700 font-semibold">
                          <p className="text-sm text-gray-900">MATCH DAY {match.matchDay}</p>
                          <p
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontWeight: 700,
                              fontStyle: "normal",
                              fontSize: "18px",
                              lineHeight: "129%",
                              letterSpacing: "0%",
                            }}
                          >
                            {match.date}
                          </p>
                          <p
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontWeight: 700,
                              fontStyle: "normal",
                              fontSize: "18px",
                              lineHeight: "129%",
                              letterSpacing: "0%",
                            }}
                          >
                            {match.time}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            className="flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-white font-medium text-sm transition duration-300 w-full sm:w-auto"
                            style={{
                              backgroundColor: "#012752",
                              border: "1px solid #012752",
                            }}
                          >
                            <span>Get Ticket</span>
                          </button>

                          <button
                            type="button"
                            className="flex items-center justify-center space-x-1 py-2 px-3 rounded-md font-medium text-sm transition duration-300 w-full sm:w-auto"
                            style={{
                              backgroundColor: "white",
                              color: "#012752",
                              border: "1px solid #012752",
                            }}
                          >
                            <span>Add to Calendar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* WOMEN’S FIXTURES PLACEHOLDER */}
            {activeDivision === "Women" && (
              <div className="text-xl text-gray-600 font-medium">
                Displaying <b>Women's</b> fixtures for <b>{weekData[currentWeekIndex].week}</b>...
              </div>
            )}
          </div>
        </div>

        {/* ---------------- GAME RESULTS SECTION ---------------- */}
        <div className="bg-white py-12">
          <GameResults />
        </div>
      </main>

      <Footer />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GameReplays = () => {
  const getTeam1Color = (color: any) => {
    if (Array.isArray(color)) return color[0];
    return color;
  };
  return (
    <div className="w-full pt-[100px] pb-[120px] px-6 md:px-[80px] lg:px-[134px] bg-[#F7F7F7] relative z-30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 w-full">
        <h2
          className="text-[28px] md:text-[40px] font-extrabold text-[#002060] uppercase tracking-tight"
          style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}
        >
          Game Replays
        </h2>
        <Link href="#" className="text-[#262626] text-[18px] font-[700] hover:underline transition">
          See all &gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nextGames.map((game) => (
          <div
            key={game._id}
            className="relative w-full h-[150px] overflow-hidden rounded-xl shadow-lg group cursor-pointer"
          >
            {/* BACKGROUND GRADIENT */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: `linear-gradient(to right, ${getTeam1Color(game.team1.color)} 50%, ${game.team2.color} 50%)`,
              }}
            ></div>

            {/* TEAM 1 */}
            <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col items-center justify-center p-4 z-20">
              <Image
                src={game.team1.logo || "/placeholder.png"}
                alt={game.team1.name}
                width={60}
                height={60}
                className="object-contain"
              />
              <p
                className="mt-1 text-white text-[28px] font-bold uppercase"
                style={{ fontFamily: "ITC Machine Std, sans-serif", fontWeight: 700 }}
              >
                {game.team1.name}
              </p>
            </div>

            {/* TEAM 2 */}
            <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col items-center justify-center p-4 z-20">
              <Image
                src={game.team2.logo || "/placeholder.png"}
                alt={game.team2.name}
                width={60}
                height={60}
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.png";
                }}
                className="object-contain"
              />
              <p
                className="mt-1 text-white text-[28px] font-bold uppercase"
                style={{ fontFamily: "ITC Machine Std, sans-serif", fontWeight: 700 }}
              >
                {game.team2.name}
              </p>
            </div>

            {/* PLAY BUTTON */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="w-[120px] h-[120px] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/play.png"
                  alt="Play button icon"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameReplays;

"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NewsCard from "@/components/NewsCard";

export interface NewsItem {
  id: number;
  title: string;
  desc: string;
  date: string;
  image: string;
  url: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Titans Remain Unbeaten This Season",
    desc: "A clutch play-game winner in the final seconds. A dominant defensive performance. The Titans continue to assert their dominance in the league with another thrilling victory, keeping their undefeated streak alive.",
    date: "October 12, 2025",
    image: "/news1.png",
    url: "/news/1",
  },
  {
    id: 2,
    title: "Game Day 2 at Showtime Arena: Outlaws Brings the Heat",
    desc: "Recap of the action-packed matchups at Showtime Arena, spotlighting Off Szn's performance, game highlights, and the fan energy that lit up Game Day 2.",
    date: "October 10, 2025",
    image: "/news2.png",
    url: "/news/2",
  },
  {
    id: 3,
    title: "Mavericks on the Move: Rising Stars Shaking Up the CFFL",
    desc: "Spotlight on the Mavericks' younger players making waves, highlighting their bold style of play and unpredictable game plans.",
    date: "October 9, 2025",
    image: "/news3.png",
    url: "/news/3",
  },
  {
    id: 4,
    title: "Clash of the Titans: How the Titans Keep Dominating the League",
    desc: "A feature story breaking down the Titans' game strategies, key players, and what makes them the team to beat this season.",
    date: "October 8, 2025",
    image: "/news4.png",
    url: "/news/4",
  },
];

export default function Trending() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-white text-black w-full py-6 px-4 sm:px-8 md:px-16 lg:px-[134px] overflow-hidden">
      {/* Background "TRENDING" word */}
      <h1
        className="absolute top-0 left-0 -translate-y-[40%] text-left whitespace-nowrap pt-[150px] text-[80px] sm:text-[140px] md:text-[200px] lg:text-[250px]  leading-none font-medium uppercase  text-[#BAB8B8] opacity-20 pointer-events-none select-none z-0 pl-[20px] sm:pl-[60px] lg:pl-[134px]"
        style={{ fontFamily: "ITC Machine Std, sans-serif" }}
      >
        Trending
      </h1>

      {/* Content (kept above background) */}
      {/* <div className="relative z-10"></div> */}

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 w-full">
        <h2 className="text-[28px] md:text-[40px] font-extrabold text-[#012752] uppercase tracking-tight">
          Trending News
        </h2>

        {/* "See all >" link */}
        <Link
          href="/news"
          className="text-[#262626] text-[18px] font-bold hover:underline transition"
        >
          See all &gt;
        </Link>
      </div>

      <div className="gap-5 flex flex-col">
        {/* Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mb-10">
          {newsItems.map((item, index) => (
            <NewsCard
              key={item.id}
              item={item}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-10 mt-10">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-[70px] h-[50px] flex items-center justify-center rounded-[3px] border border-gray-300 bg-transparent 
               hover:bg-[#012752] active:bg-[#012752] transition cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 text-[#919192] group-hover:text-white group-active:text-white transition-colors duration-200" />
          </button>

          {/* Numbers (Not buttons) */}
          <div className="flex items-center gap-8">
            {newsItems.map((item, index) => (
              <button key={item.id} type="button" onClick={() => setActiveIndex(index)}>
                <span
                  className={`text-[24px] font-semibold cursor-pointer transition-colors ${
                    activeIndex === index ? "text-[#012752]" : "text-gray-400 hover:text-[#012752]"
                  }`}
                >
                  {index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="w-[70px] h-[50px] flex items-center justify-center rounded-[3px] border border-gray-300 bg-transparent 
               hover:bg-[#012752] active:bg-[#012752] transition cursor-pointer group"
          >
            <ArrowRight className="w-5 h-5 text-[#919192] group-hover:text-white group-active:text-white transition-colors duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
}

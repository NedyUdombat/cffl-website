"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Titans Remain Unbeaten This Season",
    desc: "A clutch play-game winner in the final seconds.",
    date: "October 12, 2025",
    image: "/news1.png",
  },
  {
    id: 2,
    title: "Game Day 2 at Showtime Arena: Outlaws Brings the Heat",
    desc: "Recap of the action-packed matchups at Showtime Arena, spotlighting Off Szn’s performance, game highlights, and the fan energy that lit up Game Day 2.",
    date: "October 10, 2025",
    image: "/news2.png",
  },
  {
    id: 3,
    title: "Mavericks on the Move: Rising Stars Shaking Up the CFFL",
    desc: "Spotlight on the Mavericks’ younger players making waves, highlighting their bold style of play and unpredictable game plans.",
    date: "October 9, 2025",
    image: "/news3.png",
  },
  {
    id: 4,
    title: "Clash of the Titans: How the Titans Keep Dominating the League",
    desc: "A feature story breaking down the Titans’ game strategies, key players, and what makes them the team to beat this season.",
    date: "October 8, 2025",
    image: "/news4.png",
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
    <section className="relative bg-white text-black w-full py-[120px] px-6 md:px-[80px] lg:px-[134px]">
      {/* Background "TRENDING" word */}
      <h1
        className="absolute top-1/2 left-0 -translate-y-[301%]
             text-left w-auto 
             text-[164px] leading-[110px] font-medium uppercase 
             text-[#BAB8B8] opacity-30 pointer-events-none select-none z-0 pl-[134px]"
        style={{ fontFamily: "ITC Machine Std, sans-serif" }}
      >
        Trending
      </h1>

      {/* Content (kept above background) */}
      <div className="relative z-10"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 w-full">
        <h2 className="text-[28px] md:text-[40px] font-extrabold text-[#012752] uppercase tracking-tight">
          Trending News
        </h2>

        {/* "See all >" link */}
        <a href="#" className="text-[#262626] text-[18px] font-[700] hover:underline transition">
          See all &gt;
        </a>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mb-10">
        {newsItems.map((item, index) => {
          const isActive = activeIndex === index;

          const activeWidth = 330;
          const activeHeight = 280;
          const inactiveWidth = 250;
          const inactiveHeight = 210;

          return (
            <motion.div
              key={item.id}
              animate={{
                scale: isActive ? 1.07 : 1,
                y: isActive ? -10 : 0,
                opacity: isActive ? 1 : 0.8,
                marginRight: isActive ? 16 : 0, // Adds small space after active card
              }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="flex flex-col items-start text-left w-full max-w-[350px] h-full"
            >
              <motion.div
                animate={{
                  width: isActive ? activeWidth : inactiveWidth,
                  height: isActive ? activeHeight : inactiveHeight,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="overflow-hidden rounded-2xl mx-auto"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={isActive ? activeWidth : inactiveWidth}
                  height={isActive ? activeHeight : inactiveHeight}
                  className="object-cover w-full h-full transition-all duration-300"
                />
              </motion.div>

              {/* Text Content */}
              <div className="mt-12 flex flex-col items-start text-left w-full">
                {/* Date */}
                <p className="text-gray-500 text-[10px] font-medium mb-1">{item.date}</p>

                {/* Title */}
                <h3
                  className={`font-bold transition-all duration-300 ${
                    isActive
                      ? "text-[20px] md:text-[22px] text-[#002060]"
                      : "text-[12px] md:text-[16px] text-gray-700"
                  }`}
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </h3>

                {/* Description — same style for active/inactive */}
                <p
                  className="text-[#262626] text-[12px] font-normal mt-2 leading-relaxed max-w-[300px] "
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-10 mt-10">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-[70px] h-[50px] flex items-center justify-center rounded-[3px] border border-gray-300 bg-transparent 
               hover:bg-[#012752] active:bg-[#012752] transition cursor-pointer group"
        >
          <ArrowLeft className="w-5 h-5 text-[#919192] group-hover:text-white group-active:text-white transition-colors duration-200" />
        </button>

        {/* Numbers (Not buttons) */}
        <div className="flex items-center gap-8">
          {newsItems.map((_, index) => (
            <span
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-[24px] font-semibold cursor-pointer transition-colors ${
                activeIndex === index ? "text-[#012752]" : "text-gray-400 hover:text-[#012752]"
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="w-[70px] h-[50px] flex items-center justify-center rounded-[3px] border border-gray-300 bg-transparent 
               hover:bg-[#012752] active:bg-[#012752] transition cursor-pointer group"
        >
          <ArrowRight className="w-5 h-5 text-[#919192] group-hover:text-white group-active:text-white transition-colors duration-200" />
        </button>
      </div>
    </section>
  );
}

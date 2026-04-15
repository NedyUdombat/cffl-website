"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../containers/Home/Footer";

// --- Team Data ---
const teams = [
  { name: "Titans", logoSrc: "/team4.png", link: "/teams/titans", altText: "Titans Logo" },
  {
    name: "Wolverines",
    logoSrc: "/team3.png",
    link: "/teams/wolverines",
    altText: "Wolverines Logo",
  },
  { name: "Lions", logoSrc: "/team2.png", link: "/teams/lions", altText: "Lions Logo" },
  { name: "Eagles", logoSrc: "/team6.png", link: "/teams/eagles", altText: "Eagles Logo" },
  { name: "Sharks", logoSrc: "/team7.png", link: "/teams/sharks", altText: "Sharks Logo" },
  { name: "Bears", logoSrc: "/team5.png", link: "/teams/bears", altText: "Bears Logo" },
  { name: "Raptors", logoSrc: "/team1.png", link: "/teams/raptors", altText: "Raptors Logo" },
  { name: "Hawks", logoSrc: "/team9.png", link: "/teams/hawks", altText: "Hawks Logo" },
];

export default function TeamsPage() {
  return (
    <>
      {/* --- Navbar --- */}
      <Navbar linkTextColor="text-black" />

      {/* --- Main Content --- */}
      <main
        className="
          min-h-screen bg-white text-gray-800 
          pt-[140px] md:pt-[160px] pb-20 px-6 md:px-10
        "
      >
        {/* --- Page Container --- */}
        <div className="max-w-5xl mx-auto">
          {/* --- Team Grid --- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
            {teams.map((team, index) => (
              <a
                key={index}
                href={team.link}
                className="
                  group flex flex-col items-center justify-start 
                  rounded-xl overflow-hidden 
                  transition duration-300 
                  border-2 border-transparent hover:border-[#012752] hover:shadow-xl
                  transform hover:-translate-y-1 bg-white
                "
              >
                {/* 🖼️ Logo Area */}
                <div className="w-full bg-gray-50 flex justify-center items-center p-6 sm:p-8 h-40 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={team.logoSrc}
                    alt={team.altText}
                    className="w-full h-auto max-w-[140px] object-contain rounded-lg"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.onerror = null; // Prevents infinite loop
                      target.src = "https://placehold.co/150x150/888888/ffffff?text=LOGO";
                    }}
                  />
                </div>

                {/* 🟦 Text Area */}
                <div
                  className="
                    w-full text-center 
                    bg-transparent group-hover:bg-[#012752] 
                    transition-all duration-300
                    py-2 leading-none
                  "
                >
                  <span
                    className="
                      text-sm md:text-base font-semibold uppercase tracking-widest 
                      text-gray-900 group-hover:text-white 
                      transition-all duration-300
                    "
                  >
                    {team.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* --- Footer with spacing --- */}
      <div className="bg-white pt-10">
        <Footer />
      </div>
    </>
  );
}

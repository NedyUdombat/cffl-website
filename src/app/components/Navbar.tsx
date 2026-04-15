"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  linkTextColor?: string;
}

export default function Navbar({ linkTextColor }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const textColorClass = linkTextColor || "text-white";
  const linkBaseClass = `hover:text-[#C90F0F] transition text-sm ${textColorClass} font-machine cursor-pointer`;

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 flex justify-center font-machine
        bg-[#0A2A6B] sm:bg-[rgba(255,255,255,0.16)] sm:backdrop-blur-[6px]
      `}
      style={{
        height: "142px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.16) 14.29%, rgba(255,255,255,0) 100%)",
      }}
    >
      <div className="w-full max-w-[1440px] px-6 sm:px-[80px] md:px-[125px] py-[24px] flex justify-center items-center relative">
        <div className="flex items-center justify-between font-bold tracking-wide text-sm w-full sm:w-[397px] h-auto sm:h-[94px] gap-4 sm:gap-[19px]">
          {/* Left links (Desktop only) */}
          <div className="hidden sm:flex items-center justify-center gap-[24px]">
            <Link href="/watch" className={linkBaseClass}>
              WATCH
            </Link>
            <Link href="/games" className={linkBaseClass}>
              GAMES
            </Link>
          </div>

          {/* Center logo */}
          <div className="flex justify-center items-center flex-1">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/logo1.png"
                alt="CFFL Logo"
                width={85}
                height={94}
                priority
                className="
                  h-[60px] w-auto 
                  sm:h-[70px] 
                  md:h-[85px] 
                  lg:h-[94px] 
                  transition-all duration-300 ease-in-out
                "
              />
            </Link>
          </div>

          {/* Right links (Desktop only) */}
          <div className="hidden sm:flex items-center justify-center gap-[24px]">
            <Link href="/teams" className={linkBaseClass}>
              TEAMS
            </Link>
            <Link href="/news" className={linkBaseClass}>
              NEWS
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#012752] text-2xl focus:outline-none font-machine"
              aria-label="Menu"
              type="button"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* ===== FULLSCREEN MENU OVERLAY (MOBILE ONLY) ===== */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-[60] sm:hidden
            flex flex-col justify-center items-center
            bg-gradient-to-b from-[#0A2A6B] to-[#000B24]
            text-white p-10
            animate-fadeIn
          "
        >
          {/* ✕ Close Button (top-right) */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-3xl font-bold text-white hover:text-[#C90F0F] transition"
            aria-label="Close menu"
            type="button"
          >
            ✕
          </button>

          {/* Menu Links */}
          <div className="flex flex-col justify-center items-center space-y-8">
            {["HOME", "WATCH", "GAMES", "TEAMS", "FANS"].map((item) => (
              <Link
                key={item}
                href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                className="flex items-center justify-between border-b border-white/40 pb-2 w-full max-w-[300px] hover:text-[#C90F0F] transition"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl font-extrabold tracking-wider">{item}</span>
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

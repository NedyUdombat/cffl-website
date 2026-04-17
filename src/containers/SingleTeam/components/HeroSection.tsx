"use client";

import { motion } from "framer-motion";
import { Bell, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIconsRow } from "./SocialIconsRow";
import { TabBar } from "./TabBar";
import type { Tab } from "./TabBar";
import type { TeamSocialLinks } from "./types";
import { EASE } from "./types";

export function HeroSection({
  teamName,
  abbreviation,
  primaryColor,
  secondaryColor,
  foundedYear,
  bannerImage,
  logoImage,
  socialLinks,
  leagueRank,
  record,
  nextMatchup,
  activeTab,
  onTabChange,
}: {
  teamName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  foundedYear: number;
  bannerImage: string;
  logoImage?: string;
  socialLinks: TeamSocialLinks;
  leagueRank?: number;
  record?: string;
  nextMatchup?: {
    opponentAbbr: string;
    opponentName: string;
    dateStr: string;
  };
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  const hasBanner = Boolean(bannerImage);

  const isColorDark = (hex: string) => {
    const c = hex.replace("#", "");
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b < 128;
  };

  const textOnPrimary = isColorDark(primaryColor) ? "#ffffff" : "#000000";

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "500px",
          backgroundColor: primaryColor,
        }}
      >
        {hasBanner ? (
          <>
            {/* ── Banner: full-opacity real background ───────────── */}
            <div className="absolute inset-0">
              <Image
                src={bannerImage}
                alt={`${teamName} banner`}
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* ── Dark scrim for text readability ────────────────── */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)",
              }}
            />

            {/* ── Grid on top of banner ──────────────────────────── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,rgba(255,255,255,0.07) 0px,rgba(255,255,255,0.07) 1px,transparent 1px,transparent 48px)," +
                  "repeating-linear-gradient(90deg,rgba(255,255,255,0.07) 0px,rgba(255,255,255,0.07) 1px,transparent 1px,transparent 48px)",
              }}
            />
          </>
        ) : (
          <>
            {/* ── No banner: large centred abbreviation ──────────── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
              aria-hidden="true"
            >
              <span
                className="font-machine font-black leading-none"
                style={{
                  fontSize: "clamp(200px, 42vw, 600px)",
                  color: "#ffffff",
                  opacity: 0.08,
                  letterSpacing: "-0.06em",
                }}
              >
                {abbreviation}
              </span>
            </div>

            {/* ── Right-anchored coloured watermark ─────────────── */}
            <div
              className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 pointer-events-none select-none overflow-hidden"
              aria-hidden="true"
            >
              <span
                className="font-machine font-black leading-none"
                style={{
                  fontSize: "clamp(140px, 28vw, 420px)",
                  color: primaryColor,
                  opacity: 0.8,
                  letterSpacing: "-0.06em",
                  filter: "brightness(2) saturate(0.4)",
                }}
              >
                {abbreviation}
              </span>
            </div>

            {/* ── Grid on top of abbreviation ────────────────────── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,rgba(255,255,255,0.05) 0px,rgba(255,255,255,0.05) 1px,transparent 1px,transparent 48px)," +
                  "repeating-linear-gradient(90deg,rgba(255,255,255,0.05) 0px,rgba(255,255,255,0.05) 1px,transparent 1px,transparent 48px)",
              }}
            />
          </>
        )}

        {/* ── Primary colour accent line (very top) ──────────── */}
        <div
          className="absolute top-0 inset-x-0 h-[3px] z-20"
          style={{ backgroundColor: secondaryColor || "#ffffff" }}
        />

        {/* ══════════════════════════════════════════════════════
            TOP APP BAR  (breadcrumb + action icons)
        ══════════════════════════════════════════════════════ */}
        <div
          className="absolute top-[3px] inset-x-0 z-20"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 h-12 flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] font-machine">
              <Link
                href="/"
                className="text-white/40 hover:text-white/70 transition-colors uppercase"
              >
                CFFL
              </Link>
              <ChevronRight className="text-white/25 w-3 h-3 flex-shrink-0" />
              <Link
                href="/teams"
                className="text-white/40 hover:text-white/70 transition-colors uppercase"
              >
                TEAMS
              </Link>
              <ChevronRight className="text-white/25 w-3 h-3 flex-shrink-0" />
              <span className="text-white uppercase">{teamName}</span>
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-white/10 rounded transition-all text-white/50 hover:text-white">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition-all text-white/50 hover:text-white">
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MAIN HERO CONTENT
            pt = fixed navbar (142px) + accent (3px) + app bar (48px) + gap
        ══════════════════════════════════════════════════════ */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 pt-[210px] pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* LEFT — team logo card + identity ──────────────── */}
          <div className="flex items-end gap-5 md:gap-6">
            {/* Large white logo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
              className="flex-shrink-0 bg-white rounded-xl shadow-2xl flex items-center justify-center"
              style={{
                width: "clamp(100px,13vw,176px)",
                height: "clamp(100px,13vw,176px)",
                padding: "clamp(12px,2vw,20px)",
              }}
            >
              {logoImage ? (
                <Image
                  src={logoImage}
                  alt={`${teamName} logo`}
                  width={176}
                  height={176}
                  className="object-contain w-full h-full"
                />
              ) : (
                <span
                  className="font-machine font-black leading-none"
                  style={{
                    fontSize: "clamp(28px,5vw,60px)",
                    color: primaryColor,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {abbreviation}
                </span>
              )}
            </motion.div>

            {/* Name + badges + socials */}
            <div className="flex flex-col gap-3 pb-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
                className="font-barlow-condensed font-extrabold uppercase text-white leading-none italic"
                style={{
                  fontSize: "clamp(36px, 6.5vw, 84px)",
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.45)",
                }}
              >
                {teamName}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
                className="flex items-center gap-4 flex-wrap"
              >
                {/* Live Season badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                  style={{ backgroundColor: secondaryColor || "#dc2626", color: textOnPrimary }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  LIVE SEASON
                </span>

                {/* Season record */}
                {record && (
                  <span className="text-white/80 font-bold tracking-widest text-sm uppercase font-machine">
                    Record: {record}
                  </span>
                )}

                {/* League rank */}
                {leagueRank !== undefined && !record && (
                  <span className="text-white/80 font-bold tracking-widest text-sm uppercase font-machine">
                    Rank: #{leagueRank}
                  </span>
                )}
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4, ease: EASE }}
              >
                <SocialIconsRow socialLinks={socialLinks} compact />
              </motion.div>
            </div>
          </div>

          {/* RIGHT — Next Matchup glass card ─────────────────── */}
          {nextMatchup && (
            <motion.div
              initial={{ opacity: 0, x: 16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              className="flex-shrink-0 text-white rounded-xl border p-6"
              style={{
                minWidth: "300px",
                maxWidth: "340px",
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-4 font-machine">
                Next Matchup
              </p>

              <div className="flex justify-between items-center">
                {/* Home team */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center font-machine font-black text-sm mb-1.5"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {abbreviation.slice(0, 3)}
                  </div>
                  <p className="text-[10px] font-bold font-machine tracking-wider">
                    {abbreviation.slice(0, 3)}
                  </p>
                </div>

                {/* VS */}
                <div className="text-center px-3">
                  <p className="text-2xl font-black italic font-machine tracking-tighter">VS</p>
                  <p className="text-[9px] uppercase font-bold tracking-tight mt-1 text-white/70 font-machine">
                    {nextMatchup.dateStr}
                  </p>
                </div>

                {/* Away team */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center font-machine font-black text-sm mb-1.5"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {nextMatchup.opponentAbbr.slice(0, 3)}
                  </div>
                  <p className="text-[10px] font-bold font-machine tracking-wider">
                    {nextMatchup.opponentAbbr.slice(0, 3)}
                  </p>
                </div>
              </div>

              <button
                className="w-full mt-4 bg-white font-black py-2.5 rounded-full hover:bg-white/90 transition-all text-xs uppercase tracking-widest font-machine"
                style={{ color: primaryColor }}
              >
                Match Center
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BOTTOM TAB NAV
      ════════════════════════════════════════════════════════════ */}
      <TabBar activeTab={activeTab} onTabChange={onTabChange} primaryColor={primaryColor} />
    </>
  );
}

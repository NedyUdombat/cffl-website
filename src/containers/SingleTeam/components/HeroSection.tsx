"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TopAppBar from "@/components/TopAppBar";
import { SocialIconsRow } from "./SocialIconsRow";
import type { Tab } from "./TabBar";
import { TabBar } from "./TabBar";
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
  nextMatchup,
}: {
  teamName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  foundedYear: number;
  bannerImage: string;
  logoImage?: string;
  socialLinks: TeamSocialLinks;
  nextMatchup?: {
    opponentAbbr: string;
    opponentName: string;
    dateStr: string;
  };
}) {
  const hasBanner = Boolean(bannerImage);

  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px] bg-white flex"
      style={{
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
                "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.5) 100%)",
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
            className="absolute top-16 inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-machine font-black leading-none text-white"
              style={{
                fontSize: "clamp(200px, 42vw, 600px)",
                opacity: 0.08,
                letterSpacing: "-0.06em",
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

      <TopAppBar teamName={teamName} />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex items-center gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
            className="shrink-0 bg-transparent rounded-xl shadow-2xl flex items-center justify-center"
            style={{
              width: "clamp(100px,13vw,176px)",
              height: "clamp(100px,13vw,176px)",
            }}
          >
            {logoImage ? (
              <div className="relative w-full h-full bg-rd-500">
                <Image
                  src={logoImage}
                  alt={`${teamName} logo`}
                  fill={true}
                  className="object-contain w-full h-full"
                />
              </div>
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
            <div className="">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
                className="font-inter font-extrabold text-gray-400 leading-none"
                style={{
                  fontSize: "clamp(7px, 1.3vw, 17px)",
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.45)",
                }}
              >
                {foundedYear ? `Since ${foundedYear}` : null}
              </motion.p>
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
            </div>

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
              type="button"
            >
              Match Center
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

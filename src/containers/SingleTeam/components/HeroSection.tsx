import { motion } from "framer-motion";
import Image from "next/image";
import TopAppBar from "@/components/TopAppBar";
import type { CompetitionItem } from "@/contexts/CompetitionContext";
import type { TeamSocialLinks } from "../types";
import { EASE } from "../types";
import { SocialIconsRow } from "./SocialIconsRow";

export function HeroSection({
  teamName,
  abbreviation,
  primaryColor,
  foundedYear,
  bannerImage,
  logoImage,
  socialLinks,
  nextMatchup,
  onCompetitionChange,
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
    opponentLogo?: string;
    dateStr: string;
    location?: string;
  };
  onCompetitionChange?: (competition: CompetitionItem | undefined) => void;
}) {
  const hasBanner = Boolean(bannerImage);

  return (
    <section
      className="relative w-full overflow-hidden min-h-[500px] bg-white flex"
      style={{ backgroundColor: primaryColor }}
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
          <div
            className="absolute top-16 inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span className="font-machine font-black leading-none text-white text-hero-abbr-bg opacity-[0.08] tracking-neg-lg">
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

      <TopAppBar teamName={teamName} onCompetitionChange={onCompetitionChange} />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex items-center gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
            className="shrink-0 bg-transparent rounded-xl shadow-2xl flex items-center justify-center size-logo"
          >
            <div className="relative w-full h-full">
              <Image
                src={logoImage}
                alt={`${teamName} logo`}
                fill={true}
                className="object-contain w-full h-full"
              />
            </div>
          </motion.div>

          {/* Name + badges + socials */}
          <div className="flex flex-col gap-3 pb-1">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
                className="font-inter font-extrabold text-muted-2 leading-none text-hero-sub tracking-neg-sm text-shadow-hero"
              >
                {foundedYear ? `Since ${foundedYear}` : null}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
                className="font-barlow-condensed font-extrabold uppercase text-white leading-none italic text-hero-name tracking-neg-sm text-shadow-hero"
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
            className="shrink-0 text-white rounded-xl border border-white/10 p-6 font-inter min-w-[300px] max-w-xs bg-white/10 backdrop-blur-md"
          >
            <p className="text-2xs font-black uppercase tracking-xwide text-white/80 mb-4 font-inter">
              Next Matchup
            </p>

            <div className="flex justify-between items-center">
              {/* Home team */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center font-inter font-black text-sm mb-1.5 overflow-hidden bg-white/15 border border-white/30">
                  {logoImage ? (
                    <Image
                      src={logoImage}
                      alt={abbreviation}
                      width={48}
                      height={48}
                      className="object-contain p-1"
                    />
                  ) : (
                    abbreviation.slice(0, 3)
                  )}
                </div>
                <p className="text-2xs font-bold font-inter tracking-label">
                  {abbreviation.slice(0, 3)}
                </p>
              </div>

              {/* VS */}
              <div className="text-center px-3">
                <p className="text-2xl font-black italic font-inter tracking-neg-sm">VS</p>
                <p className="text-3xs uppercase font-bold tracking-ui mt-1 text-white/90 font-inter">
                  {nextMatchup.dateStr}
                </p>
                {nextMatchup.location && (
                  <p className="text-3xs uppercase tracking-ui mt-0.5 text-white/90 font-inter">
                    {nextMatchup.location}
                  </p>
                )}
              </div>

              {/* Away team */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center font-inter font-black text-sm mb-1.5 overflow-hidden bg-white/10 border border-white/20">
                  {nextMatchup.opponentLogo ? (
                    <Image
                      src={nextMatchup.opponentLogo}
                      alt={nextMatchup.opponentAbbr}
                      width={48}
                      height={48}
                      className="object-contain p-1"
                    />
                  ) : (
                    nextMatchup.opponentAbbr.slice(0, 3)
                  )}
                </div>
                <p className="text-2xs font-bold font-inter tracking-label">
                  {nextMatchup.opponentAbbr.slice(0, 3)}
                </p>
              </div>
            </div>

            <button
              className="w-full mt-4 bg-white font-black py-2.5 rounded-full hover:bg-white/90 transition-all text-2xs uppercase tracking-xwide font-inter"
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

"use client";

import { motion } from "framer-motion";
import type { MATCHES_QUERYResult } from "sanity.types";
import { useCompetition } from "@/contexts/CompetitionContext";
import type { OverviewStats } from "../../types";
import { staggerGrid } from "../../types";
import { FeaturedStory } from "./FeaturedStory";
import { SeasonStatsBar } from "./SeasonStatsBar";
import { TeamForm } from "./TeamForm";
import TeamStandingsPreview from "./TeamStandingsPreview";
import { TopHighlights } from "./TopHighlights";

interface OverviewTabProps {
  overviewStats: OverviewStats;
  nextMatchData: MATCHES_QUERYResult;
  matchResults: MATCHES_QUERYResult;
  teamId: string;
  teamSlug: string;
  fullMatchResults: MATCHES_QUERYResult;
}

const OverviewTab = ({
  overviewStats,
  nextMatchData,
  matchResults,
  teamId,
  teamSlug,
  fullMatchResults,
}: OverviewTabProps) => {
  const { selectedCompetition } = useCompetition();

  return (
    <section className="bg-bg-2">
      <div className="max-w-[1440px] mx-auto py-8 px-6 md:px-14 lg:px-20 ">
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4"
        >
          {/* ── Left column ── */}
          <div className="flex flex-col gap-4">
            <FeaturedStory />
            <TopHighlights />
            {/* TODO: Add team contact info */}
          </div>

          {/* ── Right column (sidebar) ── */}
          <div className="flex flex-col gap-4">
            <SeasonStatsBar stats={overviewStats} />
            <TeamForm matchResults={matchResults} teamId={teamId} nextMatchData={nextMatchData} />
            <TeamStandingsPreview
              competition={selectedCompetition}
              teamId={teamId}
              teamSlug={teamSlug}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewTab;

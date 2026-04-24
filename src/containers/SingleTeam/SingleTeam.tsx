"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useCompetition } from "@/contexts/CompetitionContext";
import { ErrorState } from "./components/ErrorState";
import { HeroSection } from "./components/HeroSection";
// import { HighlightsCarousel } from "./components/HighlightsCarousel";
import { LoadingState } from "./components/LoadingState";
// import { NewsTab } from "./components/NewsTab";
// import { ResultsTab } from "./components/ResultsTab";
// import { StaffTab } from "./components/StaffTab";
import { type Tab, TabBar } from "./components/TabBar";
import useSingleTeamLogic from "./logic";

import CalendarTab from "./Tabs/Calendar";
import { OverviewTab } from "./Tabs/OverviewTab";
import { RosterTab } from "./Tabs/RosterTab";
import StaffTab from "./Tabs/Staff";
import StandingsTab from "./Tabs/StandingsTab";
import type { SingleTeamProps } from "./types";

export type { SingleTeamProps };

const SingleTeam = ({ slug }: Pick<SingleTeamProps, "slug">) => {
  const {
    singleTeam,
    isPending,
    isError,
    error,
    refetch,
    nextMatchup,
    overviewStats,
    nextMatchData,
    matchResults,
  } = useSingleTeamLogic(slug);
  const { setSelectedCompetition, selectedCompetition } = useCompetition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get("tab") as Tab) ?? "overview";

  const setActiveTab = useCallback(
    (tab: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />;
  if (!singleTeam) return <ErrorState message="This team could not be found." />;

  const primaryColor = singleTeam.primaryColor ?? "#111827";

  const socialLinks = {
    instagram: singleTeam.socialLinks?.instagram ?? undefined,
    youtube: singleTeam.socialLinks?.youtube ?? undefined,
    tiktok: singleTeam.socialLinks?.tiktok ?? undefined,
    twitter: singleTeam.socialLinks?.twitter ?? undefined,
  };

  return (
    <main className="min-h-screen w-full bg-white text-gray-800">
      <HeroSection
        teamName={singleTeam.name ?? ""}
        abbreviation={singleTeam.abbreviation ?? ""}
        primaryColor={primaryColor}
        secondaryColor={singleTeam.secondaryColor ?? "#ffffff"}
        foundedYear={singleTeam.foundedYear ?? 0}
        bannerImage={(singleTeam.bannerImage as unknown as string) ?? ""}
        logoImage={(singleTeam.logo as unknown as string) ?? undefined}
        socialLinks={socialLinks}
        nextMatchup={nextMatchup}
        onCompetitionChange={setSelectedCompetition}
      />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} primaryColor={primaryColor} />

      {activeTab === "overview" && (
        <OverviewTab
          overviewStats={overviewStats}
          nextMatchData={nextMatchData}
          matchResults={matchResults}
          teamId={singleTeam._id}
        />
      )}

      {activeTab === "roster" && (
        <RosterTab teamId={singleTeam._id} competitionId={selectedCompetition?._id} />
      )}

      {activeTab === "matches" && (
        <CalendarTab teamId={singleTeam._id} matches={[...matchResults, ...nextMatchData]} />
      )}

      {activeTab === "standings" && (
        <StandingsTab teamId={singleTeam._id} matchResults={matchResults} />
      )}

      {activeTab === "staff" && (
        <StaffTab teamId={singleTeam._id} competitionId={selectedCompetition?._id} />
      )}

      {/* {activeTab === "news" && (
        <NewsTab
          news={mockNews}
          teamSlug={slug}
          primaryColor={primaryColor}
        />
      )}

      {carouselItems.length > 0 && (
        <HighlightsCarousel items={carouselItems} primaryColor={primaryColor} />
      )}
      */}
    </main>
  );
};

export default SingleTeam;

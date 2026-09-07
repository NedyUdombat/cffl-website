"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useCompetition } from "@/contexts/CompetitionContext";
import { HeroSection } from "./components/HeroSection";
import { type Tab, TabBar } from "./components/TabBar";
import useSingleTeamLogic from "./logic";
import CalendarTab from "./Tabs/Calendar";
import OverviewTab from "./Tabs/OverviewTab";
// import RosterTab from "./Tabs/RosterTab";
// import StaffTab from "./Tabs/Staff";
import StandingsTab from "./Tabs/StandingsTab";
// import StatsTab from "./Tabs/StatsTab";
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
    fullMatchResults,
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
  if (isError || !singleTeam)
    return (
      <ErrorState
        message={!singleTeam ? "This team could not be found." : error?.message}
        onRetry={refetch}
      />
    );

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
        teamSlug={slug}
      />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} primaryColor={primaryColor} />

      {activeTab === "overview" && (
        <OverviewTab
          overviewStats={overviewStats}
          nextMatchData={nextMatchData}
          matchResults={matchResults}
          teamId={singleTeam._id}
          teamSlug={slug}
          fullMatchResults={fullMatchResults}
        />
      )}

      {/* {activeTab === "roster" && (
        <RosterTab teamId={singleTeam._id} competitionId={selectedCompetition?._id} />
      )} */}

      {activeTab === "matches" && (
        <CalendarTab teamId={singleTeam._id} matches={[...matchResults, ...nextMatchData]} />
      )}

      {activeTab === "standings" && (
        <StandingsTab teamId={singleTeam._id} matchResults={matchResults} />
      )}

      {/* {activeTab === "staff" && (
        <StaffTab teamId={singleTeam._id} competitionId={selectedCompetition?._id} />
      )} */}

      {/* {activeTab === "stats" && <StatsTab teamId={singleTeam._id} />} */}
    </main>
  );
};

export default SingleTeam;

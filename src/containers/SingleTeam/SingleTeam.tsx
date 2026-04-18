"use client";

import { useState } from "react";
import { ErrorState } from "./components/ErrorState";
import { HeroSection } from "./components/HeroSection";
import { HighlightsCarousel } from "./components/HighlightsCarousel";
import { LoadingState } from "./components/LoadingState";
import { NewsTab } from "./components/NewsTab";
import { OverviewTab } from "./components/OverviewTab";
import { ResultsTab } from "./components/ResultsTab";
import { RosterTab } from "./components/RosterTab";
import { StaffTab } from "./components/StaffTab";
import { StandingsTab } from "./components/StandingsTab";
import { type Tab, TabBar } from "./components/TabBar";
import type { SingleTeamProps } from "./components/types";
import useSingleTeamLogic from "./logic";
import useFetchMatches from "@/queries/matches/useFetchMatches";
import {
  mockForm,
  mockNews,
  mockPlayerGenders,
  mockResults,
  mockStandings,
  mockStats,
} from "./mockTeamData";

export type { SingleTeamProps };

const isColorDark = (hex: string) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
};

const SingleTeam = ({ slug }: Pick<SingleTeamProps, "slug">) => {
  const { singleTeam, isPending, isError, error, refetch } = useSingleTeamLogic(slug);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const { data: nextMatchData } = useFetchMatches({
    status: "scheduled",
    team: singleTeam?._id,
    pageSize: 1,
    enabled: !!singleTeam?._id,
  });

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />;
  if (!singleTeam) return <ErrorState message="This team could not be found." />;

  const primaryColor = singleTeam.primaryColor ?? "#111827";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const textOnPrimary = isColorDark(primaryColor) ? "#ffffff" : "#000000";

  // Build roster: merge Sanity players with mock gender data
  const roster = (singleTeam.players ?? []).map((p, i) => ({
    id: i,
    jerseyNumber: p.number ?? 0,
    name: p.name ?? "",
    position: p.positions?.[0] ?? "",
    photo: (p.photo as unknown as string) ?? undefined,
    isCaptain: p.isCaptain ?? false,
    gender: mockPlayerGenders[p.name ?? ""] ?? ("Male" as const),
  }));

  const headCoach = { name: singleTeam.headCoach ?? "TBD", title: "Head Coach" };
  const assistantCoach = { name: singleTeam.asstHeadCoach ?? "TBD", title: "Asst. Head Coach" };

  // Find this team's rank from mock standings (match by slug)
  const leagueRank = mockStandings.find((s) => s.teamSlug === slug)?.rank;

  // Build record string from standings
  const teamStanding = mockStandings.find((s) => s.teamSlug === slug);
  const record = teamStanding ? `${teamStanding.wins}-${teamStanding.losses}-0` : undefined;

  // Next scheduled match involving this team
  const nextMatch = nextMatchData?.[0];
  const nextMatchup = nextMatch
    ? {
        opponentAbbr:
          nextMatch.homeTeam?._id === singleTeam?._id
            ? nextMatch.awayTeam?.abbreviation ?? ""
            : nextMatch.homeTeam?.abbreviation ?? "",
        opponentName:
          nextMatch.homeTeam?._id === singleTeam?._id
            ? nextMatch.awayTeam?.name ?? ""
            : nextMatch.homeTeam?.name ?? "",
        dateStr: `${nextMatch.date ?? "TBD"} · ${nextMatch.time ?? ""}`,
      }
    : undefined;

  const carouselItems: { src: string; caption: string }[] = [];

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
        leagueRank={leagueRank}
        record={record}
        nextMatchup={nextMatchup}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {/* <TabBar activeTab={activeTab} onTabChange={setActiveTab} primaryColor={primaryColor} /> */}

      {/* {activeTab === "overview" && (
        <OverviewTab
          stats={mockStats}
          standings={mockStandings}
          teamSlug={slug}
          results={mockResults}
          headCoach={headCoach}
          assistantCoach={assistantCoach}
          primaryColor={primaryColor}
          onTabChange={setActiveTab}
        />
      )}

      {activeTab === "roster" && (
        <RosterTab
          roster={roster}
          primaryColor={primaryColor}
        />
      )}

      {activeTab === "matches" && (
        <ResultsTab
          results={mockResults}
          fixtures={mockFixtures}
          primaryColor={primaryColor}
        />
      )}

      {activeTab === "standings" && (
        <StandingsTab
          standings={mockStandings}
          form={mockForm}
          teamSlug={slug}
          primaryColor={primaryColor}
        />
      )}

      {activeTab === "staff" && (
        <StaffTab
          headCoach={headCoach}
          assistantCoach={assistantCoach}
          primaryColor={primaryColor}
          email={singleTeam.email ?? undefined}
          phone={singleTeam.phone ?? undefined}
          url={singleTeam.url ?? undefined}
          country={singleTeam.country ?? undefined}
          state={singleTeam.state ?? undefined}
        />
      )}

      {activeTab === "news" && (
        <NewsTab
          news={mockNews}
          teamSlug={slug}
          primaryColor={primaryColor}
        />
      )}

      {carouselItems.length > 0 && (
        <HighlightsCarousel items={carouselItems} primaryColor={primaryColor} />
      )} */}
    </main>
  );
};

export default SingleTeam;

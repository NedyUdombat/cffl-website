"use client";

import { useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const ROSTER_ENTRIES_QUERY = defineQuery(`*[_type == "rosterEntry"
  && team._ref == $team
  && ($competition == null || competition._ref == $competition)
] | order(jerseyNumber asc) {
  _id,
  isCaptain,
  jerseyName,
  jerseyNumber,
  positions,
  "player": player-> {
    _id,
    firstName,
    lastName,
    gender,
    email,
    "photo": photo.asset->url,
  }
}`);

export interface RosterEntry {
  _id: string;
  isCaptain: boolean | null;
  jerseyName: string | null;
  jerseyNumber: number | null;
  positions: string[] | null;
  player: {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    photo: string | null;
    gender: string | null;
    email: string | null;
  } | null;
}

interface FetchRosterEntriesParams {
  team?: string;
  competition?: string;
  enabled?: boolean;
}

const useFetchRosterEntries = ({
  team,
  competition,
  enabled = true,
}: FetchRosterEntriesParams) => {
  const { data, isPending, isError, error } = useQuery<RosterEntry[]>({
    queryKey: ["roster-entries", team, competition],
    queryFn: () =>
      client.fetch(ROSTER_ENTRIES_QUERY, {
        team: team ?? null,
        competition: competition ?? null,
      }),
    refetchOnWindowFocus: false,
    enabled: enabled && !!team,
  });

  return {
    data: data ?? [],
    isPending,
    isError,
    error,
  };
};

export default useFetchRosterEntries;

"use client";

import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import type { STAFFS_QUERYResult } from "sanity.types";
import { client } from "@/sanity/lib/client";

const STAFFS_QUERY = defineQuery(`*[_type == "staff"
  && team._ref == $team
] | order(firstName asc) {
  _id,
  firstName,
  lastName,
  email,
  role,
  gender,
  "photo": photo.asset->url,
  socialLinks,
  "team": team-> {
    _id,
    name,
    slug,
    abbreviation,
    "logo": logo.asset->url,
  }
}`);

interface FetchStaffsParams {
  team?: string;
  enabled?: boolean;
}

const useFetchStaffs = ({ team, enabled = true }: FetchStaffsParams) => {
  const { data, isPending, isError, error }: UseQueryResult<STAFFS_QUERYResult, Error> = useQuery<
    STAFFS_QUERYResult,
    Error
  >({
    queryKey: ["staffs", team],
    queryFn: () =>
      client.fetch(STAFFS_QUERY, {
        team: team ?? null,
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

export default useFetchStaffs;

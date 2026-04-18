import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { MATCH_QUERYResult } from "../../../sanity.types";

const MATCH_QUERY = defineQuery(`*[_type == "match" && _id == $id][0] {
  _id,
  matchDay,
  matchNumber,
  date,
  time,
  location,
  homeScore,
  awayScore,
  status,
  "homeTeam": homeTeam-> {
    _id,
    name,
    abbreviation,
    "logo": logo.asset->url,
  },
  "awayTeam": awayTeam-> {
    _id,
    name,
    abbreviation,
    "logo": logo.asset->url,
  },
  "competition": competition-> {
    _id,
    name,
    "logo": logo.asset->url,
  },
}`);

const useFetchSingleMatch = (id: string) => {
  const { data, isPending, isError, error, refetch }: UseQueryResult<MATCH_QUERYResult, Error> = useQuery<
    MATCH_QUERYResult,
    Error
  >({
    queryKey: ["single-match", id],
    queryFn: () => client.fetch(MATCH_QUERY, { id }),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    singleMatch: data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFetchSingleMatch;

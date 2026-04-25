"use client";

import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import type { PLAYER_QUERYResult } from "sanity.types";
import { client } from "@/sanity/lib/client";

const PLAYER_QUERY = defineQuery(`*[_type == "player" && _id == $id][0] {
  _id,
  firstName,
  lastName,
  email,
  jerseyName,
  jerseyNumber,
  gender,
  "photo": photo.asset->url,
  positions,
  socialLinks,
}`);

interface FetchPlayerParams {
  playerId?: string;
  enabled?: boolean;
}

const useFetchPlayer = ({ playerId, enabled = true }: FetchPlayerParams) => {
  const { data, isPending, isError, error }: UseQueryResult<PLAYER_QUERYResult, Error> = useQuery<
    PLAYER_QUERYResult,
    Error
  >({
    queryKey: ["player", playerId],
    queryFn: () =>
      client.fetch(PLAYER_QUERY, {
        _id: playerId,
      }),
    refetchOnWindowFocus: false,
    enabled: enabled && !!playerId,
  });

  return {
    data: data ?? [],
    isPending,
    isError,
    error,
  };
};

export default useFetchPlayer;

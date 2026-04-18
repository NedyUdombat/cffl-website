import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { TEAMS_QUERYResult } from "../../../sanity.types";

const TEAMS_QUERY = defineQuery(`*[_type == "team" && isActive == true] | order(name asc) {
  _id,
  name,
  slug,
  abbreviation,
  primaryColor,
  secondaryColor,
  country,
  "logo": logo.asset->url,
}`);

const useFetchTeams = () => {
  const { data, isPending, isError, error, refetch }: UseQueryResult<TEAMS_QUERYResult, Error> =
    useQuery<TEAMS_QUERYResult, Error>({
      queryKey: ["teams"],
      queryFn: () => client.fetch(TEAMS_QUERY),
      refetchOnWindowFocus: false,
    });

  return {
    data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFetchTeams;

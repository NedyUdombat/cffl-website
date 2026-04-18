import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { COMPETITIONS_QUERYResult } from "../../../sanity.types";

const COMPETITIONS_QUERY = defineQuery(`*[_type == "competition"] | order(startDate desc) {
  _id,
  name,
  slug,
  season,
  type,
  format,
  gender,
  startDate,
  endDate,
  status,
  "logo": logo.asset->url,
  isDefault
}`);

const useFetchCompetitions = () => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  }: UseQueryResult<COMPETITIONS_QUERYResult, Error> = useQuery<COMPETITIONS_QUERYResult, Error>({
    queryKey: ["competitions", { type: "competition" }],
    queryFn: () => client.fetch(COMPETITIONS_QUERY),
    refetchOnWindowFocus: false,
  });

  return {
    competitions: data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFetchCompetitions;

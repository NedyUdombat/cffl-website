import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { COMPETITION_QUERYResult } from "../../../sanity.types";

const COMPETITION_QUERY = defineQuery(`*[_type == "competition" && slug.current == $slug][0] {
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

const useFetchSingleCompetition = ({ slug, id }: { slug: string; id: string }) => {
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  }: UseQueryResult<COMPETITION_QUERYResult, Error> = useQuery<COMPETITION_QUERYResult, Error>({
    queryKey: ["single-competition", slug],
    queryFn: () => client.fetch(COMPETITION_QUERY, { slug, id }),
    refetchOnWindowFocus: false,
    enabled: !!slug || !!id,
  });

  return {
    singleCompetition: data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFetchSingleCompetition;

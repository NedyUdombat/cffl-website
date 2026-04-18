import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Team } from "../../../sanity.types";

const TEAM_QUERY = defineQuery(`*[_type == "team" && isActive == true && slug.current == $slug][0] {
  _id,
  name,
  slug,
  abbreviation,
  yearFounded,
  foundedYear,
  primaryColor,
  secondaryColor,
  country,
  state,
  headCoach,
  asstHeadCoach,
  email,
  phone,
  url,
  isActive,
  "logo": logo.asset->url,
  "bannerImage": bannerImage.asset->url,
  players[] {
    name,
    number,
    positions,
    isCaptain,
    "photo": photo.asset->url,
  },
  socialLinks {
    instagram,
    youtube,
    tiktok,
    twitter,
  },
}`);

const useFetchSingleTeam = (slug: string) => {
  const { data, isPending, isError, error, refetch }: UseQueryResult<Team, Error> = useQuery<
    Team,
    Error
  >({
    queryKey: ["single-team", slug],
    queryFn: () => client.fetch(TEAM_QUERY, { slug }),
    refetchOnWindowFocus: false,
    enabled: !!slug,
  });

  return {
    singleTeam: data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFetchSingleTeam;

import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { NEWS_QUERYResult } from "../../../sanity.types";

const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    content,
    "mainImage" : mainImage.asset->url
  }
`);

const LIMITED_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    content,
    "mainImage" : mainImage.asset->url
  }
`);

interface UseFetchNewsOptions {
  limit?: number | null;
}

const useFetchNews = (options?: UseFetchNewsOptions) => {
  const limit = options?.limit ?? null;

  const { data, isPending, isError, error, refetch }: UseQueryResult<NEWS_QUERYResult, Error> =
    useQuery<NEWS_QUERYResult, Error>({
      queryKey: ["news", limit],
      queryFn: () => {
        if (limit !== null) {
          return client.fetch(LIMITED_NEWS_QUERY, { limit });
        }
        return client.fetch(ALL_NEWS_QUERY);
      },
      refetchOnWindowFocus: false,
    });

  return {
    news: data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFetchNews;

import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { MEDIA_QUERYResult } from "../../../sanity.types";

const MEDIA_QUERY = defineQuery(`*[_type == "media"] | order(_id desc) {
  "_id": _id,
  "id": _id,
  "src": image.asset->url,
  "categories": categories,
  "title": title
}`);

const useFetchFansMedia = () => {
  const { data, isPending, isError, error, refetch }: UseQueryResult<MEDIA_QUERYResult, Error> =
    useQuery<MEDIA_QUERYResult, Error>({
      queryKey: ["fans", { type: "media" }],
      queryFn: () => client.fetch(MEDIA_QUERY),
      refetchOnWindowFocus: false,
    });

  return {
    fans: data,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useFetchFansMedia;

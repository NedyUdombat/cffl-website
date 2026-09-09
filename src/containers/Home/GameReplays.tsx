"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { MATCHES_QUERYResult } from "sanity.types";
import { MatchReplayCard } from "@/components/MatchReplayCard";
import useFetchMatches from "@/queries/matches/useFetchMatches";

const SKELETON_CARDS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];

const GameReplays = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: matches, isPending } = useFetchMatches({
    hasUrl: true,
    pageSize: 5,
    status: "completed",
    sortField: "date",
    sortOrder: "desc",
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <div className="w-full pt-15 pb-20 px-6 md:px-20 lg:px-33.5 bg-[#F7F7F7] relative z-30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 w-full">
        <div>
          <p className="text-[12px] font-bold text-[#8A99AD] tracking-wider uppercase mb-1">
            Watch the Action
          </p>
          <h2
            className="text-[28px] md:text-[36px] font-extrabold text-[#002060] uppercase tracking-tight"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Game Replays
          </h2>
        </div>
        <Link
          href="#"
          className="flex items-center gap-1 text-[#002060] text-[16px] font-bold hover:underline transition"
        >
          See all <ArrowRight size={15} />
        </Link>
      </div>

      {isPending ? (
        <div className="w-full">
          <div className="flex gap-5 overflow-hidden">
            {SKELETON_CARDS.map((id) => (
              <div
                key={id}
                className="shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-95 h-45 rounded-2xl bg-gray-200 animate-shimmer"
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {SKELETON_CARDS.map((id) => (
              <div key={id} className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-shimmer" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex -ml-5">
              {matches?.map((match: MATCHES_QUERYResult[0]) => (
                <MatchReplayCard
                  key={match._id}
                  match={match}
                  className="sm:w-1/2 lg:w-1/3 xl:w-95 min-w-0 pl-5"
                />
              ))}
            </div>
          </div>

          {matches && matches.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:border-[#002060] transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#475569]" />
              </button>

              <div className="flex items-center gap-2">
                {matches.map((item, index) => {
                  const isActive = selectedIndex === index;
                  return (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => scrollTo(index)}
                      className={`w-9 h-9 rounded-full text-[14px] font-bold flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#002060] text-white shadow-sm"
                          : "text-[#64748B] hover:text-[#002060]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:border-[#002060] transition cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-[#475569]" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameReplays;

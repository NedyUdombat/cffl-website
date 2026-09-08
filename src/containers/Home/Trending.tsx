"use client";

import { format } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import useFetchNews, { type NewsItem } from "@/queries/news/useFetchNews";

export interface NewsItemType {
  id: string | number;
  title: string;
  slug: string;
  publishedAt: string;
  content: string;
  mainImage: string;
}

function extractPlainText(blocks: NewsItem["content"] = []): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child) => child.text).join("") || "";
    })
    .filter(Boolean)
    .join(" ");
}

export default function Trending() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: true,
    startIndex: 0,
  });

  const { news, isPending } = useFetchNews({
    limit: 5,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const formattedNews: NewsItemType[] = useMemo(() => {
    if (!news || !Array.isArray(news)) return [];

    return news.map((item: NewsItem) => ({
      id: item._id,
      title: item.title,
      slug: item.slug,
      publishedAt: format(new Date(item.publishedAt), "MMMM dd, yyyy"),
      content: extractPlainText(item.content),
      mainImage: item.mainImage || "/placeholder.png",
    }));
  }, [news]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  return (
    <section className="relative bg-white text-black w-full py-6 overflow-hidden">
      <h1
        className="absolute top-0 left-0 -translate-y-[40%] text-left whitespace-nowrap pt-37.5 text-[80px] sm:text-[140px] md:text-[200px] lg:text-[250px] leading-none font-medium uppercase text-[#BAB8B8] opacity-20 pointer-events-none select-none z-0 pl-5 sm:pl-15 lg:pl-33.5"
        style={{ fontFamily: "ITC Machine Std, sans-serif" }}
      >
        Trending
      </h1>

      <div className="px-4 sm:px-8 md:px-20 lg:px-33.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full relative z-10">
        <div>
          <div className="flex items-center mb-1">
            <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
              STAY IN THE LOOP
            </span>
          </div>
          <h2 className="text-[28px] md:text-[40px] font-extrabold text-[#012752] uppercase tracking-tight">
            Trending News
          </h2>
        </div>

        <Link
          href="/news"
          className="flex items-center gap-1 text-[#002060] text-[16px] font-bold hover:underline transition"
        >
          See all <ArrowRight size={15} />
        </Link>
      </div>

      <div className="gap-5 flex flex-col relative z-10  pt-12 px-3.5 sm:px-7 md:px-15 lg:px-32.5 ">
        {isPending ? (
          <div className="w-full">
            <div className="flex gap-6 overflow-hidden -ml-6 pl-6">
              {SKELETON_CARDS.map((id) => (
                <div
                  key={id}
                  className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex flex-col gap-3 animate-pulse"
                >
                  <div className="w-full h-48 rounded-lg animate-shimmer" />
                  <div className="h-4 rounded w-1/3 animate-shimmer" />
                  <div className="h-6 rounded w-full animate-shimmer" />
                  <div className="h-6 rounded w-4/5 animate-shimmer" />
                  <div className="h-4 rounded w-2/3 animate-shimmer" />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-10 mt-10 animate-pulse">
              <div className="w-17.5 h-12.5 bg-gray-200 rounded-[3px]  animate-shimmer" />
              <div className="flex items-center gap-8">
                {SKELETON_PAGES.map((id) => (
                  <div key={id} className="w-6 h-8 bg-gray-200 rounded animate-shimmer" />
                ))}
              </div>
              <div className="w-17.5 h-12.5 bg-gray-200 rounded-[3px]" />
            </div>
          </div>
        ) : (
          <>
            <div className="w-full overflow-hidden" ref={emblaRef}>
              <div className="flex items-stretch -ml-6">
                {formattedNews.map((item, index) => (
                  <div key={item.id} className="shrink-0 pl-6 w-full sm:w-1/2 lg:w-1/4 min-w-0">
                    <NewsCard
                      item={item}
                      index={index}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                    />
                  </div>
                ))}
              </div>
            </div>

            {formattedNews.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:border-[#002060] transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#475569]" />
                </button>

                <div className="flex items-center gap-2">
                  {formattedNews.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <button
                        key={item.id}
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
    </section>
  );
}

const SKELETON_CARDS = ["card-1", "card-2", "card-3", "card-4"];
const SKELETON_PAGES = ["page-1", "page-2", "page-3", "page-4", "page-5"];

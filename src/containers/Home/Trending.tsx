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
  excerpt: string;
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
      excerpt: item.excerpt,
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
    <section className="relative bg-white text-black w-full py-8 sm:py-12 overflow-hidden">
      <h1
        className="absolute top-0 left-0 -translate-y-[20%] sm:-translate-y-[35%] text-left whitespace-nowrap text-[60px] sm:text-[120px] md:text-[180px] lg:text-[250px] leading-none font-medium uppercase text-[#BAB8B8] opacity-20 pointer-events-none select-none z-0 pl-4 sm:pl-12 lg:pl-33.5"
        style={{ fontFamily: "ITC Machine Std, sans-serif" }}
      >
        Trending
      </h1>

      <div className="px-4 sm:px-8 md:px-16 lg:px-33.5 flex flex-row items-end justify-between gap-4 w-full relative z-10 pt-4 sm:pt-8">
        <div>
          <div className="flex items-center mb-1">
            <span className="text-2xs sm:text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
              STAY IN THE LOOP
            </span>
          </div>
          <h2 className="text-[22px] sm:text-[32px] md:text-[40px] font-extrabold text-[#012752] uppercase tracking-tight">
            Trending News
          </h2>
        </div>

        <Link
          href="/news"
          className="flex items-center gap-1 text-[#002060] text-[14px] sm:text-[16px] font-bold hover:underline transition shrink-0"
        >
          See all <ArrowRight size={15} />
        </Link>
      </div>

      <div className="gap-5 flex flex-col relative z-10 pt-6 sm:pt-10 px-4 sm:px-8 md:px-16 lg:px-32.5">
        {isPending ? (
          <div className="w-full">
            <div className="flex gap-4 sm:gap-6 overflow-hidden">
              {SKELETON_CARDS.map((id) => (
                <div
                  key={id}
                  className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex flex-col gap-3 animate-pulse"
                >
                  <div className="w-full h-48 rounded-lg bg-gray-200" />
                  <div className="h-4 rounded w-1/3 bg-gray-200" />
                  <div className="h-6 rounded w-full bg-gray-200" />
                  <div className="h-6 rounded w-4/5 bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="w-full overflow-hidden" ref={emblaRef}>
              <div className="flex items-stretch -ml-4 sm:-ml-6">
                {formattedNews.map((item, index) => (
                  <div
                    key={item.id}
                    className="shrink-0 pl-4 sm:pl-6 w-full sm:w-1/2 lg:w-1/4 min-w-0"
                  >
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
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:border-[#002060] transition cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ArrowLeft className="w-4 h-4 text-[#475569]" />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-50 sm:max-w-none no-scrollbar">
                  {formattedNews.map((item, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollTo(index)}
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-[13px] sm:text-[14px] font-bold flex items-center justify-center transition-all shrink-0 ${
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
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:border-[#002060] transition cursor-pointer"
                  aria-label="Next Slide"
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

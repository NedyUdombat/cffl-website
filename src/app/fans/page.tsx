"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";
import useFetchFansMedia from "@/queries/media/useFetchFansMedia";

const categories = ["All", "Game Day", "Fans", "Teams", "Behind the Scenes", "Community"] as const;

type Category = (typeof categories)[number];

const SKELETON_KEYS = Array.from({ length: 10 }, (_, i) => `skeleton-${i}`);

export default function MeetTheFans() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(18);
  const { fans, isPending, isError, error, refetch } = useFetchFansMedia();

  const galleryData = fans ?? [];
  const filteredImages =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((img) => img.categories?.includes(selectedCategory));

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, filteredImages.length));
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setVisibleCount(18);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1C2028] text-white">
      <section
        className="relative bg-[#1C2028]  bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://cdn.sanity.io/images/2v2lyg7l/production/50a6fb1009500b340560666777beb4ebe539dc4a-2000x2500.jpg")',
        }}
      >
        <div
          className="absolute inset-0 w-full h-full mix-blend-multiply"
          style={{
            background: "linear-gradient(180deg, #1F54A9 -2.56%, #000000 115.31%)",
          }}
        />

        <Navbar linkTextColor="text-white" />

        <section className="relative w-full  pt-36 pb-16 px-6 text-center mt-35.5 flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto space-y-4 font-inter">
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide font-sans">
              THE CFFL COMMUNITY
            </h1>

            <div className="space-y-2 text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              <p className="font-semibold text-white">
                CFFL is more than what happens on the field.
              </p>
              <p>From the sidelines to the stands, our fans are part of the game.</p>
              <p className="text-gray-300">
                See the people, moments and memories that make CFFL a growing flag football
                community.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="mailto:community@cffl.com"
                className="inline-block bg-[#0A2A6B] hover:bg-[#0A2A6B]/75 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg"
              >
                Share your CFFL moment
              </a>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-gray-50 text-black py-12 grow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0A2A6B] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isPending && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SKELETON_KEYS.map((key) => (
                <div key={key} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <p className="text-red-600 font-semibold">Failed to load community media.</p>
              <p className="text-xs text-gray-500 max-w-xs">
                {error?.message ?? "Something went wrong."}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-5 py-2 text-xs font-semibold uppercase border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {!isPending && !isError && filteredImages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <p className="text-base font-semibold">No images found</p>
              <p className="text-sm text-gray-400">
                There are currently no moments tagged under "{selectedCategory}".
              </p>
            </div>
          )}

          {!isPending && !isError && filteredImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-auto">
              {filteredImages.slice(0, visibleCount).map((item) => (
                <div
                  key={item._id || item.id}
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square group bg-gray-200"
                >
                  <Image
                    src={item.src}
                    alt={item.title || `CFFL Community Moment`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}

          {!isPending && !isError && visibleCount < filteredImages.length && (
            <div className="text-center mt-12">
              <button
                type="button"
                onClick={loadMore}
                className="inline-flex items-center gap-2 text-gray-700 hover:text-black font-semibold text-lg transition-colors cursor-pointer"
              >
                Load more
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Load more</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

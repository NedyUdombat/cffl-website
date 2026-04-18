"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";

const fanImages = Array.from({ length: 30 }, (_, i) => `/fans/fan${i + 1}.jpg`);

export default function MeetTheFans() {
  const [visibleCount, setVisibleCount] = useState(18);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, fanImages.length));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#13141C] text-white">
      {/* Navbar */}
      <Navbar linkTextColor="text-white" />

      {/* Hero */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-[#0A2A6B] mt-[142px]">
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase font-machine tracking-wide">
          MEET THE FANS
        </h1>
      </section>

      {/* Fan Grid */}
      <section className="bg-gray-50 text-black py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-auto">
            {fanImages.slice(0, visibleCount).map((src, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square"
              >
                <Image
                  src={src}
                  alt={`CFFL Fan ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < fanImages.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 text-gray-700 hover:text-black font-semibold text-lg transition-colors"
              >
                Load more
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

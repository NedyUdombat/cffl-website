"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import LoadMoreButton from "@/components/LoadMoreButton";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";
import { NewsPageLoader } from "@/containers/News/components/full-page-loader";
import { LatestScores } from "@/containers/News/components/latest-scores";
import { NewsPageCard } from "@/containers/News/components/news-card";
import useFetchNews from "@/queries/news/useFetchNews";

export default function NewsPage() {
  const { news, isPending, isError, error } = useFetchNews();

  const articles = news || [];
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, 10);

  if (isPending) {
    return <NewsPageLoader />;
  }

  if (isError) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen text-[#002060]">
        <Navbar linkTextColor="text-black" />
        <main className="pt-35 pb-16 flex items-center justify-center min-h-[60vh]">
          <p className="text-red-500 font-medium">
            Failed to load articles: {error?.message || "An error occurred."}
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#002060]">
      <Navbar linkTextColor="text-black" />

      <main className="pt-35 pb-16">
        <div className="max-w-360 mx-auto px-4 sm:px-8">
          {featuredArticle && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-[12px] font-bold text-[#002060] tracking-wider uppercase">
                  TOP STORY
                </h2>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 relative min-h-75 lg:min-h-95">
                  {featuredArticle.mainImage ? (
                    <Image
                      src={featuredArticle.mainImage}
                      alt={featuredArticle.title || "Featured Image"}
                      fill
                      priority
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-block bg-[#E2E8F0] text-[#002060] text-2xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4">
                      ELITE 5S
                    </div>

                    <h1 className="text-[26px] sm:text-[32px] font-black leading-tight text-[#002060] mb-4">
                      {featuredArticle.title}
                    </h1>

                    <p className="text-[14px] text-gray-600 leading-relaxed mb-6 line-clamp-4">
                      There's a moment in every year when you realize it's no longer experimenting.
                      It is growing up. Elite 5s is fast moment for Nigerian flag football — faster,
                      fiercer, and built for the global stage.
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-gray-500 mb-4">
                      CFFL Staff &bull;{" "}
                      {format(new Date(featuredArticle.publishedAt), "MMMM dd, yyyy")}
                    </p>

                    <Link
                      href={`/news/${
                        typeof featuredArticle.slug === "string"
                          ? featuredArticle.slug
                          : featuredArticle.slug?.current || ""
                      }`}
                      className="inline-flex items-center justify-center bg-[#52BD94] hover:bg-[#43a27e] text-white text-[13px] font-bold px-5 py-2.5 rounded-md transition-colors"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <h2 className="text-[12px] font-bold text-[#002060] tracking-wider uppercase">
                  LATEST NEWS
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {gridArticles.map((article) => (
                  <NewsPageCard key={article._id} article={article} />
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <LoadMoreButton />
              </div>
            </div>

            <aside className="lg:col-span-4 flex flex-col gap-8">
              <LatestScores />
              <div className="bg-transparent p-5 rounded-2xl flex flex-col gap-3">
                <h3 className="text-[14px] font-black text-[#002060]">CFFL Newsletter</h3>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Get the latest CFFL news, scores, and highlights to remain in your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full text-[12px] px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#002060]"
                />
                <button
                  type="button"
                  className="w-full bg-[#52BD94] hover:bg-[#43a27e] text-white text-[12px] font-bold py-2 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

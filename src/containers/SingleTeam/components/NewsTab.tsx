"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fadeUp, staggerGrid } from "./types";
import type { MockNewsArticle } from "./types";
import { SectionHeading } from "./SectionHeading";

function FeatureCard({
  article,
  teamSlug,
  primaryColor,
}: {
  article: MockNewsArticle;
  teamSlug: string;
  primaryColor: string;
}) {
  return (
    <Link
      href={`/teams/${teamSlug}/news/${article.slug}`}
      className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-5"
    >
      {/* Image */}
      <div className="relative h-72 w-full">
        <Image
          src={article.imageSrc}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

        {/* Category badge */}
        <span
          className="absolute top-4 left-4 px-2.5 py-1 rounded text-[10px] font-barlow font-semibold uppercase text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {article.category}
        </span>

        {/* Date */}
        <span className="absolute top-4 right-4 text-white/60 text-[10px] font-inter">
          {article.date}
        </span>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-inter font-semibold text-xl text-white leading-snug group-hover:opacity-80 transition-opacity duration-200">
            {article.title}
          </h3>
        </div>
      </div>

      {/* Excerpt + CTA */}
      <div className="bg-white px-5 py-4 flex items-center justify-between gap-4">
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <span
          className="flex items-center gap-1 text-[11px] font-barlow font-semibold uppercase whitespace-nowrap flex-shrink-0"
          style={{ color: primaryColor }}
        >
          Read More <ChevronRight size={12} />
        </span>
      </div>
    </Link>
  );
}

export function NewsTab({
  news,
  teamSlug,
  primaryColor,
}: {
  news: MockNewsArticle[];
  teamSlug: string;
  primaryColor: string;
}) {
  const [feature, ...rest] = news;

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Team News</SectionHeading>
        </div>

        {/* Feature article */}
        {feature && (
          <FeatureCard
            article={feature}
            teamSlug={teamSlug}
            primaryColor={primaryColor}
          />
        )}

        {/* Remaining articles */}
        {rest.length > 0 && (
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {rest.map((article) => (
              <motion.div key={article.id} variants={fadeUp}>
                <Link
                  href={`/teams/${teamSlug}/news/${article.slug}`}
                  className="group block rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 h-full flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={article.imageSrc}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-barlow font-semibold uppercase text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[10px] text-gray-400 font-inter mb-1.5">{article.date}</p>
                    <h3 className="font-inter font-semibold text-sm text-gray-900 leading-snug line-clamp-2 flex-1 group-hover:opacity-70 transition-opacity">
                      {article.title}
                    </h3>
                    <span
                      className="mt-3 flex items-center gap-1 text-[10px] font-barlow font-semibold uppercase tracking-wider"
                      style={{ color: primaryColor }}
                    >
                      Read More <ChevronRight size={10} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View all link */}
        <div className="mt-8 text-center">
          <Link
            href={`/teams/${teamSlug}/news`}
            className="inline-flex items-center gap-1.5 font-barlow font-semibold text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
            style={{ color: primaryColor }}
          >
            View All News <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

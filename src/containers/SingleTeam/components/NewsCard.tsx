"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "../types";
import { EASE } from "../types";

export function NewsCard({
  article,
  slug,
  primaryColor,
  index,
}: {
  article: NewsArticle;
  slug: string;
  primaryColor: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
    >
      <Link
        href={`/teams/${slug}/news/${article.slug}`}
        className="group block rounded-xl overflow-hidden bg-[#0d1018] border border-white/5 hover:border-white/20 transition-all duration-300 h-full"
      >
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={article.imageSrc}
            alt={article.writeup}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-inter font-bold uppercase bg-black/55 backdrop-blur-sm text-white/60 rounded leading-none">
            {article.date}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-white font-inter font-semibold text-sm leading-snug line-clamp-2 group-hover:opacity-70 transition-opacity duration-300">
            {article.writeup}
          </h3>
          <div
            className="mt-3 flex items-center gap-1 text-[11px] font-barlow font-semibold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            <span>Read More</span>
            <ChevronRight size={11} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

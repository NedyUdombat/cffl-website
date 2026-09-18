"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import ShareModal from "@/components/share-modal";
import type { NewsItemType } from "@/containers/Home/Trending";

interface NewsCardProps {
  item: NewsItemType;
  index: number;
  activeIndex: number;
  setActiveIndex?: (index: number) => void;
}

const NewsCard = ({ item, index, activeIndex, setActiveIndex }: NewsCardProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const isActive = activeIndex === index;

  const activeWidth = 330;
  const activeHeight = 280;
  const inactiveWidth = 250;
  const inactiveHeight = 210;

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/news/${item.slug}` : "";

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  return (
    <>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover trigger */}
      <div
        onMouseEnter={() => setActiveIndex?.(index)}
        aria-description="button"
        className="relative"
      >
        <Link
          href={`/news/${item.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <motion.div
            key={item.id}
            animate={{
              opacity: isActive ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="flex flex-col items-start text-left w-full max-w-87.5 cursor-pointer"
            style={{ height: "420px" }}
          >
            <motion.div
              animate={{
                width: isActive ? activeWidth : inactiveWidth,
                height: isActive ? activeHeight : inactiveHeight,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="overflow-hidden rounded-2xl mx-auto shrink-0"
            >
              <Image
                src={item.mainImage}
                alt={item.title}
                width={isActive ? activeWidth : inactiveWidth}
                height={isActive ? activeHeight : inactiveHeight}
                className="object-cover w-full h-full transition-all duration-500"
              />
            </motion.div>

            <div className="mt-12 flex flex-col items-start text-left w-full">
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex gap-1.5 items-center">
                  <CalendarDays size={12} className="text-gray-500" />
                  <p className="text-gray-500 text-2xs font-medium">{item.publishedAt}</p>
                </div>

                <button
                  type="button"
                  onClick={handleShareClick}
                  aria-label="Share article"
                  className="p-1 text-gray-400 hover:text-[#0052FF] transition-colors cursor-pointer shrink-0"
                >
                  <FaShareAlt size={12} />
                </button>
              </div>

              <h3
                className={`font-bold transition-all duration-500 ease-in-out ${
                  isActive
                    ? "text-[20px] md:text-[22px] text-[#002060]"
                    : "text-[12px] md:text-[16px] text-gray-700"
                }`}
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 700,
                }}
              >
                {item.title}
              </h3>

              <p
                className="text-[#262626] text-[12px] font-normal mt-2 leading-relaxed max-w-75"
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 400,
                }}
              >
                {item.excerpt}
              </p>
            </div>
          </motion.div>
        </Link>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={shareUrl}
        title={item.title}
      />
    </>
  );
};

export default NewsCard;

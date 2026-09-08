import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { NewsItemType } from "@/containers/Home/Trending";

interface NewsCardProps {
  item: NewsItemType;
  index: number;
  activeIndex: number;
  setActiveIndex?: (index: number) => void;
}

const NewsCard = ({ item, index, activeIndex, setActiveIndex }: NewsCardProps) => {
  const isActive = activeIndex === index;

  const activeWidth = 330;
  const activeHeight = 280;
  const inactiveWidth = 250;
  const inactiveHeight = 210;
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: will fix
    <div onMouseEnter={() => setActiveIndex(index)} aria-description="button" className="relative ">
      <Link href={`news/${item.slug}`} target="_blank" rel="noopener noreferrer" className="block">
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
            <div className="flex gap-1.5 items-center  mb-1">
              <CalendarDays size={12} className="text-gray-500" />
              <p className="text-gray-500 text-2xs font-medium">{item.publishedAt}</p>
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
              {item.content}
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default NewsCard;

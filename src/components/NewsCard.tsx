import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/containers/Home/Trending";

interface NewsCardProps {
  item: NewsItem;
  index: number;
  activeIndex: number;
  setActiveIndex?: (index: number) => void; // Optional if you want to handle clicks
}

const NewsCard = ({ item, index, activeIndex, setActiveIndex }: NewsCardProps) => {
  const isActive = activeIndex === index;

  const activeWidth = 330;
  const activeHeight = 280;
  const inactiveWidth = 250;
  const inactiveHeight = 210;
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: will fix
    <div onMouseEnter={() => setActiveIndex(index)} aria-description="button">
      <Link href={item.url} target="_blank" rel="noopener noreferrer" className="block">
        <motion.div
          key={item.id}
          animate={{
            scale: isActive ? 1.07 : 1,
            y: isActive ? -10 : 0,
            opacity: isActive ? 1 : 0.8,
            marginRight: isActive ? 16 : 0, // Adds small space after active card
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="flex flex-col items-start text-left w-full max-w-[350px] cursor-pointer"
          style={{ height: "420px" }}
        >
          <motion.div
            animate={{
              width: isActive ? activeWidth : inactiveWidth,
              height: isActive ? activeHeight : inactiveHeight,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="overflow-hidden rounded-2xl mx-auto flex-shrink-0"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={isActive ? activeWidth : inactiveWidth}
              height={isActive ? activeHeight : inactiveHeight}
              className="object-cover w-full h-full transition-all duration-300"
            />
          </motion.div>

          {/* Text Content */}
          <div className="mt-12 flex flex-col items-start text-left w-full">
            {/* Date */}
            <p className="text-gray-500 text-[10px] font-medium mb-1">{item.date}</p>

            {/* Title */}
            <h3
              className={`font-bold transition-all duration-300 ${
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

            {/* Description — same style for active/inactive */}
            <p
              className="text-[#262626] text-[12px] font-normal mt-2 leading-relaxed max-w-[300px]"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 400,
              }}
            >
              {item.desc}
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default NewsCard;

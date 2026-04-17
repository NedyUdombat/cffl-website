import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TeamsCardProps {
  team: {
    _id: string;
    name: string | null;
    slug: string | null;
    abbreviation: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    country: string | null;
    logo: string | null;
  };
}

const TeamsCard = ({ team }: TeamsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/teams/${team.slug}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? "0 20px 40px rgba(1, 39, 82, 0.25)"
            : "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="flex flex-col items-center justify-start rounded-xl overflow-hidden bg-white cursor-pointer"
      >
        {/* Logo Area */}
        <div className="w-full relative bg-gray-50 flex justify-center items-center h-40 overflow-hidden">
          <motion.div
            animate={{
              padding: isHovered ? 4 : 16,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-full h-full"
          >
            <Image
              src={team.logo}
              alt={`${team.name} Logo`}
              fill={true}
              className="object-contain transition-[padding] duration-300 ease-in-out"
              style={{ padding: isHovered ? "4px" : "16px" }}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "https://placehold.co/150x150/888888/ffffff?text=LOGO";
              }}
            />
          </motion.div>
        </div>

        {/* Text Area */}
        <motion.div
          animate={{
            backgroundColor: isHovered ? "#012752" : "#ffffff",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="w-full text-center py-2 leading-none"
        >
          <motion.span
            animate={{
              color: isHovered ? "#ffffff" : "#111827",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="text-sm md:text-base font-barlow font-semibold uppercase tracking-widest"
          >
            {team.name}
          </motion.span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default TeamsCard;

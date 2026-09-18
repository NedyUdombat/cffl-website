"use client";

import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { useTeams } from "@/contexts/TeamContext";

const footerLinks = [
  {
    title: "General",
    links: [
      { name: "Home", href: "/", hidden: false },
      { name: "News", href: "/news", hidden: false },
      { name: "Teams", href: "/teams", hidden: false },
      { name: "Season Schedule", href: "#", hidden: false },
      { name: "Historical Scores", href: "#", hidden: false },
      { name: "About / CFFL", href: "/about", hidden: false },
    ],
  },
  {
    title: "CFFL Ecosystem",
    links: [
      { name: "Fantasy", href: "#", hidden: true },
      { name: "Merch Store", href: "#", hidden: true },
      { name: "Tickets", href: "#", hidden: true },
      { name: "Stats", href: "#", hidden: true },
    ],
  },
  {
    title: "Media",
    links: [
      { name: "CFFL Communication", href: "#", hidden: true },
      { name: "Media Guides", href: "#", hidden: true },
      { name: "Rule Book", href: "#", hidden: true },
      { name: "Licensing", href: "#", hidden: true },
    ],
  },
  {
    title: "Players",
    links: [
      { name: "CFFL Health & Safety", href: "#", hidden: true },
      { name: "Player Engagement", href: "#", hidden: true },
      { name: "CFFL Legends Community", href: "#", hidden: true },
      { name: "CFFL Alumni Association", href: "#", hidden: true },
      { name: "CFFL Player Care", href: "#", hidden: true },
    ],
  },
];

export default function Footer() {
  const { teams } = useTeams();
  const linkStyle =
    "text-xs sm:text-sm font-normal text-gray-400 hover:text-white transition duration-200 whitespace-nowrap";

  // Filter sections that have active (non-hidden) links
  const activeSections = footerLinks
    .map((col) => ({
      ...col,
      links: col.links.filter((link) => !link.hidden),
    }))
    .filter((col) => col.links.length > 0);

  const isHorizontalDesktop = activeSections.length <= 2;

  return (
    <footer className="bg-[#1C2028] text-white pt-6 md:pt-10 pb-6 shadow-lg w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 md:gap-8 py-6 md:py-8 border-b border-gray-700/50">
          {teams?.length &&
            teams.map((team) => (
              <Link
                href={`/teams/${team.slug.current}`}
                key={team._id}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 shrink-0 hover:scale-105 transition-transform"
              >
                <Image
                  src={team.logo}
                  alt={`${team.name} Logo`}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </Link>
            ))}
        </div>

        <div className="py-8 md:py-10 border-b border-gray-700/50">
          {isHorizontalDesktop ? (
            <div className="space-y-6 sm:space-y-8">
              {activeSections.map((col) => (
                <div
                  key={col.title}
                  className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 md:gap-6 w-full"
                >
                  <h4 className="text-xs sm:text-sm font-bold uppercase text-white tracking-wider shrink-0 md:min-w-35">
                    {col.title}
                  </h4>
                  <ul className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 md:justify-between md:grow">
                    {col.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className={linkStyle}>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-y-10">
              {activeSections.map((col) => (
                <div key={col.title}>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold uppercase mb-3 md:mb-4 text-white tracking-wide">
                    {col.title}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {col.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className={linkStyle}>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-y-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-3xl text-center sm:text-left">
            <div className="shrink-0">
              <Image
                src="/logo1.png"
                alt="CFFL League Logo"
                width={70}
                height={70}
                className="object-contain w-14 h-14 md:w-17.5 md:h-17.5"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] sm:text-xs font-semibold text-gray-300">
                &copy; 2026 Community Flag Football League (CFFL). All rights reserved.
              </p>
              <p className="text-2xs sm:text-xs font-light text-gray-400 leading-relaxed">
                CFFL and the CFFL shield are trademarks of the Community Flag Football League. Team
                names, logos, and uniform designs are trademarks of their respective teams. All
                other CFFL-related marks are property of the Community Flag Football League.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-5 shrink-0 pt-2 md:pt-0">
            <Link
              href="https://www.instagram.com/cfflafrica_/"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiInstagram size={22} className="text-pink-500 hover:opacity-80" />
            </Link>
            <Link
              href="https://www.youtube.com/@CFFLNigeria"
              aria-label="Youtube"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiYoutube size={22} className="text-red-500 hover:opacity-80" />
            </Link>
            <Link
              href="https://www.tiktok.com/@community_ffl?is_from_webapp=1&sender_device=pc"
              aria-label="Tiktok"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiTiktok size={20} className="text-white hover:opacity-80" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

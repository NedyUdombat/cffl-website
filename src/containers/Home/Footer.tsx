import Image from "next/image";
import Link from "next/link";
import { siFacebook, siInstagram, siTiktok, siX, siYoutube } from "simple-icons";
import { teamsData } from "@/data/teams";

// --- Data for the Footer Link Columns (Unchanged) ---
const footerLinks = [
  {
    title: "General",
    links: [
      { name: "News", href: "/news" },
      { name: "Season Schedule", href: "/games" },
      { name: "Team", href: "/teams" },
      { name: "Historical Scores", href: "/seasons" },
    ],
  },
  {
    title: "CFFL Ecosystem",
    links: [
      { name: "Fantasy", href: "#" },
      { name: "Merch Store", href: "#" },
      { name: "Tickets", href: "#" },
      { name: "Stats", href: "#" },
    ],
  },
  {
    title: "Media",
    links: [
      { name: "CFFL Communication", href: "#" },
      { name: "Media Guides", href: "#" },
      { name: "Rule Book", href: "#" },
      { name: "Licensing", href: "#" },
    ],
  },
  {
    title: "Players",
    links: [
      { name: "CFFL Health & Safety", href: "#" },
      { name: "Player Engagement", href: "#" },
      { name: "CFFL Legends Community", href: "#" },
      { name: "CFFL Alumni Association", href: "#" },
      { name: "CFFL Player Care", href: "#" },
    ],
  },
];

export default function Footer() {
  const linkStyle = "text-sm font-normal text-gray-400 hover:text-white transition duration-200";

  return (
    // Outer container: Provides the full-width background color and vertical padding
    <footer className="bg-[#1C2028] text-white pt-10 pb-4 shadow-lg w-full">
      {/* NEW Inner Container: Centers content, limits max width, and adds horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* 1. Team Logos Section */}
        <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-4 py-8 border-b border-gray-700/50">
          {teamsData.map((team) => (
            <Link href={team.url} key={team.id} className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src={team.image}
                alt={team.altText}
                width={48}
                height={48}
                // className="object-contain"
              />
            </Link>
          ))}
        </div>

        {/* 2. Menu Links Section */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-lg font-bold uppercase mb-4 text-white tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-3">
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

        {/* 3. Copyright and Social Media Section */}
        <div className="py-6 border-t border-gray-700/50 flex flex-col md:flex-row items-center md:items-center justify-between">
          {/* Copyright Text and League Logo */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-2xl text-center md:text-left">
            <div className="flex-shrink-0">
              <Image
                src="/logo1.png"
                alt="CFFL League Logo"
                width={70}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-xs font-light text-gray-400">
              &copy; 2025 Community Flag Football League (CFFL). CFFL and the CFFL shield are
              trademarks of the Community Flag Football League. Team names, logos, and uniform
              designs are trademarks of their respective teams. All other CFFL-related marks are
              property of the Community Flag Football League.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-5 mt-6 md:mt-0">
            <Link
              href="https://www.instagram.com/peopleofcffl/"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={siInstagram.path} />
              </svg>
            </Link>
            <Link
              href="https://www.youtube.com/@CFFLNigeria"
              aria-label="Youtube"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={siYoutube.path} />
              </svg>
            </Link>
            <Link
              href="https://www.tiktok.com/@community_ffl?is_from_webapp=1&sender_device=pc"
              aria-label="Tiktok"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={siTiktok.path} />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

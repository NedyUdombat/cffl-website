import Image from "next/image";
import Link from "next/link";

// --- Data for the Logo Bar (Unchanged) ---
const teamLogos = [
  "/team4.png",
  "/team3.png",
  "/team2.png",
  "/team6.png",
  "/team7.png",
  "/team5.png",
  "/team1.png",
  "/team9.png",
];

// --- Data for the Footer Link Columns (Unchanged) ---
const footerLinks = [
  {
    title: "General",
    links: [
      { name: "News", href: "#" },
      { name: "Season Schedule", href: "#" },
      { name: "Team", href: "#" },
      { name: "Historical Scores", href: "#" },
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
          {teamLogos.map((src, index) => (
            <div key={index} className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src={src}
                alt={`Team logo ${index + 1}`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
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
        <div className="pt-6 pb-4 border-t border-gray-700/50 flex flex-col md:flex-row items-center md:items-start justify-between">
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
          <div className="flex space-x-4 mt-6 md:mt-0">
            <Link
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-2v2h2v2h-2v6h-2v-6h-2v-2h2v-1.5c0-1.4 1.12-2.5 2.5-2.5h2v2z" />
              </svg>
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.43-1.83.723-2.82.853a4.99 4.99 0 0 0 2.16-2.06c-1.02.6-2.14.995-3.32 1.217a4.99 4.99 0 0 0-8.62 4.54c-4.15-.2-7.82-2.2-10.3-5.2s-2.73-6.9-1.2-10.2c.42.7 1 1.3 1.6 1.7a4.99 4.99 0 0 1-2.27-.63c.03.6.26 1.1.65 1.6s.9.9 1.4 1.2c-.56-.02-1.09-.16-1.58-.43v.06c0 1.7 1.2 3.1 2.8 3.4a4.97 4.97 0 0 1-2.25.08c.45 1.3 1.76 2.3 3.32 2.6a9.98 9.98 0 0 1-6.17 1.7c-.4 0-.8 0-1.2-.07a14.12 14.12 0 0 0 7.6 2.22c9.1 0 14.07-7.5 14.07-14.07v-.6c.96-.68 1.8-1.53 2.45-2.49z" />
              </svg>
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.06l-.01 2.492c-1.26.048-1.64.06-4.84.06-3.2 0-3.58.012-4.85-.06l.01-2.492c1.266-.048 1.646-.06 4.85-.06zm4.85.06c1.26.048 1.64.06 4.84.06 3.2 0 3.58-.012 4.85-.06l-.01 2.492c-1.266-.048-1.646-.06-4.85-.06-3.2 0-3.58-.012-4.85-.06l.01-2.492zm-4.85 2.552c-3.2 0-3.58-.012-4.85-.06l.01 2.492c1.266-.048 1.646-.06 4.85-.06 3.2 0 3.58.012 4.85.06l-.01-2.492c-1.26-.048-1.64-.06-4.84-.06zM8.11 9.987l2.84 2.84c.14.14.34.22.55.22.21 0 .41-.08.55-.22l2.84-2.84c.3-.3.3-.78 0-1.08s-.78-.3-1.08 0l-2.29 2.29-2.29-2.29c-.3-.3-.78-.3-1.08 0s-.3.78 0 1.08zm8.62 0l-2.84 2.84c-.14.14-.34.22-.55.22s-.41-.08-.55-.22l-2.84-2.84c-.3-.3-.78-.3-1.08 0s-.3.78 0 1.08l2.29 2.29-2.29 2.29c-.3.3-.3.78 0 1.08s.78.3 1.08 0l2.84-2.84c.14-.14.34-.22.55-.22s.41.08.55-.22l2.84 2.84c.3.3.78.3 1.08 0s.3-.78 0-1.08l-2.29-2.29 2.29-2.29c.3-.3.3-.78 0-1.08z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

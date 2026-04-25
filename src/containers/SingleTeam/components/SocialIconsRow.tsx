import Link from "next/link";
import { SiInstagram, SiTiktok, SiX, SiYoutube } from "react-icons/si";
import type { TeamSocialLinks } from "../types";

export function SocialIconsRow({
  socialLinks,
  compact = false,
}: {
  socialLinks: TeamSocialLinks;
  compact?: boolean;
}) {
  const ring = compact ? "w-7 h-7" : "w-11 h-11";
  const size = compact ? 16 : 16;
  const base = `${ring} bg-white rounded-full border border-white flex items-center justify-center text-dark hover:text-white hover:border-white/35 transition-all duration-200`;

  const entries = [
    socialLinks.instagram && {
      href: socialLinks.instagram,
      label: "Instagram",
      icon: <SiInstagram size={size} className="text-pink-500" />,
    },
    socialLinks.youtube && {
      href: socialLinks.youtube,
      label: "YouTube",
      icon: <SiYoutube size={size} className="text-red-500" />,
    },
    socialLinks.tiktok && {
      href: socialLinks.tiktok,
      label: "TikTok",
      icon: <SiTiktok size={size} className="text-black" />,
    },
    socialLinks.twitter && {
      href: socialLinks.twitter,
      label: "X (Twitter)",
      icon: <SiX size={size} className="text-blue-500" />,
    },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  return (
    <div className="flex items-center gap-2">
      {entries.map(({ href, label, icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={base}
        >
          {icon}
        </Link>
      ))}
    </div>
  );
}

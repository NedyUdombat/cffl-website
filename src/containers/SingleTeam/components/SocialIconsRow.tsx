"use client";

import { Instagram, Youtube } from "lucide-react";
import { siTiktok, siX } from "simple-icons";
import type { TeamSocialLinks } from "./types";

export function SocialIconsRow({
  socialLinks,
  compact = false,
}: {
  socialLinks: TeamSocialLinks;
  compact?: boolean;
}) {
  const ring = compact ? "w-9 h-9" : "w-11 h-11";
  const icon = compact ? 15 : 18;
  const base = `${ring} rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/35 transition-all duration-200`;

  const entries = [
    socialLinks.instagram && {
      href: socialLinks.instagram,
      label: "Instagram",
      node: <Instagram size={icon} />,
    },
    socialLinks.youtube && {
      href: socialLinks.youtube,
      label: "YouTube",
      node: <Youtube size={icon} />,
    },
    socialLinks.tiktok && {
      href: socialLinks.tiktok,
      label: "TikTok",
      node: (
        <svg width={icon - 1} height={icon - 1} viewBox="0 0 24 24" fill="currentColor">
          <path d={siTiktok.path} />
        </svg>
      ),
    },
    socialLinks.twitter && {
      href: socialLinks.twitter,
      label: "X (Twitter)",
      node: (
        <svg width={icon - 2} height={icon - 2} viewBox="0 0 24 24" fill="currentColor">
          <path d={siX.path} />
        </svg>
      ),
    },
  ].filter(Boolean) as { href: string; label: string; node: React.ReactNode }[];

  return (
    <div className="flex items-center gap-2.5">
      {entries.map(({ href, label, node }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={base}
        >
          {node}
        </a>
      ))}
    </div>
  );
}

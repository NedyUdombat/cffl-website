"use client";

import { useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiCopy } from "react-icons/fi";

interface ShareBarProps {
  title: string;
}

export default function ShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}${shareUrl}`)}`,
      color: "hover:bg-green-500 hover:text-white",
    },
    {
      name: "X / Twitter",
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-700 hover:text-white",
    },
  ];

  return (
    <div className="mt-12 pt-6 border-t border-gray-200">
      <h4 className="text-[12px] font-bold text-[#002060] tracking-wider uppercase mb-4">
        Share this article
      </h4>

      <div className="flex flex-wrap items-center gap-3">
        {socialLinks.map((platform) => {
          const Icon = platform.icon;
          return (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${platform.name}`}
              className={`p-2.5 bg-gray-100 text-gray-600 rounded-lg transition-colors cursor-pointer ${platform.color}`}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="Copy article link"
          className="flex items-center gap-2 p-2.5 bg-gray-100 text-gray-600 hover:bg-[#0052FF] hover:text-white rounded-lg transition-colors cursor-pointer text-[13px] font-semibold"
        >
          {copied ? (
            <>
              <FiCheck className="w-5 h-5 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FiCopy className="w-5 h-5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

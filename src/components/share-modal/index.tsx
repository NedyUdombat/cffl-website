"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiCopy, FiShare2, FiX } from "react-icons/fi";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  url,
  title = "Check this out!",
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  // Fallback to window location if URL isn't passed
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const socialPlatforms = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "bg-green-500 hover:bg-green-600",
      shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
    },
    {
      name: "X / Twitter",
      icon: FaTwitter,
      color: "bg-black hover:bg-gray-800",
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      color: "bg-blue-600 hover:bg-blue-700",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "bg-blue-700 hover:bg-blue-800",
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
  ];
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-gray-900 transition-all">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-lg">
            <FiShare2 className="w-5 h-5 text-blue-600" />
            <span>Share</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 py-6">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-md ${platform.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                  {platform.name}
                </span>
              </a>
            );
          })}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Link</p>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="grow bg-transparent text-sm text-gray-700 px-2 outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <FiCheck className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <FiCopy className="w-4 h-4" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

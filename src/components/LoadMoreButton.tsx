"use client";

import { ChevronDown } from "lucide-react";

export default function LoadMoreButton() {
  return (
    <button
      onClick={() => alert("Pagination coming soon!")}
      className="flex items-center justify-center gap-2 mx-auto text-[#012752] font-semibold hover:opacity-70 transition"
    >
      Load More <ChevronDown className="w-5 h-5 text-[#012752]" />
    </button>
  );
}

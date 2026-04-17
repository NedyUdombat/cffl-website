"use client";

import type { ReactNode } from "react";

export function SectionHeading({
  children,
  primaryColor,
}: {
  children: ReactNode;
  primaryColor: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-1 h-7 rounded-full flex-shrink-0"
        style={{ backgroundColor: primaryColor }}
      />
      <h2 className="font-barlow-condensed font-bold text-xl md:text-2xl uppercase tracking-widest text-white leading-none">
        {children}
      </h2>
    </div>
  );
}

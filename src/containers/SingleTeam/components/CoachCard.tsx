"use client";

import { Users } from "lucide-react";
import type { CoachData } from "../types";

export function CoachCard({ coach, primaryColor }: { coach: CoachData; primaryColor: string }) {
  return (
    <div
      className="flex-1 flex items-center gap-5 rounded-xl bg-[#0d1018] border border-white/5 p-5"
      style={{ borderLeftWidth: "3px", borderLeftColor: primaryColor }}
    >
      <div
        className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ backgroundColor: `${primaryColor}18` }}
      >
        <Users size={24} style={{ color: primaryColor }} />
      </div>
      <div>
        <p className="text-white/35 text-[9px] font-inter uppercase tracking-[0.22em]">
          {coach.title}
        </p>
        <h3 className="text-white font-semibold font-inter text-base mt-0.5 leading-tight">
          {coach.name}
        </h3>
      </div>
    </div>
  );
}

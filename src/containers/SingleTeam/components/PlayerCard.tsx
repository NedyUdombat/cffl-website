"use client";

import { motion } from "framer-motion";
import { Star, UserCircle } from "lucide-react";
import Image from "next/image";
import { fadeUp, POSITION_COLORS } from "./types";
import type { Player } from "./types";

export function PlayerCard({
  player,
  primaryColor,
}: {
  player: Player;
  primaryColor: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      {/* ── Gradient header ─────────────────────────────────────────────── */}
      <div
        className="relative h-36 flex items-center justify-center overflow-visible"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Captain badge */}
        {player.isCaptain && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-yellow-400 text-yellow-900 text-[9px] font-machine font-black uppercase z-10 leading-none">
            <Star size={8} fill="currentColor" />
            <span>CAP</span>
          </div>
        )}

        {/* Jersey number watermark */}
        <span
          className="absolute font-machine font-black text-white/10 select-none leading-none"
          style={{ fontSize: "clamp(72px, 12vw, 110px)" }}
          aria-hidden="true"
        >
          {player.jerseyNumber}
        </span>

        {/* Avatar circle — overlaps bottom edge */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center z-10 overflow-hidden shadow-sm">
          {player.photo ? (
            <Image
              src={player.photo}
              alt={player.name}
              fill
              className="object-cover"
            />
          ) : (
            <UserCircle size={40} className="text-gray-300" />
          )}
        </div>
      </div>

      {/* ── Card body ────────────────────────────────────────────────────── */}
      <div className="pt-12 pb-5 px-4 text-center">
        <p className="font-inter font-semibold text-base text-gray-900 leading-tight truncate">
          {player.name}
        </p>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span
            className="inline-block px-2 py-0.5 rounded text-[9px] font-inter font-bold uppercase text-white"
            style={{ backgroundColor: POSITION_COLORS[player.position] ?? "#374151" }}
          >
            {player.position}
          </span>
          <span className="text-gray-400 text-sm font-barlow-condensed">
            #{player.jerseyNumber}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

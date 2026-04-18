"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useFetchCompetitions from "@/queries/competitions/useFetchCompetitions";
import { useCompetition, type CompetitionItem } from "@/contexts/CompetitionContext";

interface TopAppBarProps {
  teamName: string;
  onCompetitionChange?: (competition: CompetitionItem) => void;
}

const TopAppBar = ({ teamName, onCompetitionChange }: TopAppBarProps) => {
  const { competitions } = useFetchCompetitions();
  const { selectedCompetition } = useCompetition();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (!competitions?.length) return;
    // Prefer the globally persisted competition
    if (selectedCompetition) {
      setSelectedId(selectedCompetition._id);
      return;
    }
    // Fall back to active competition
    const defaultComp = competitions.find((c) => c.status === "active") ?? competitions[0];
    if (defaultComp) {
      setSelectedId(defaultComp._id);
      onCompetitionChange?.(defaultComp);
    }
  }, [competitions, selectedCompetition]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const comp = competitions?.find((c) => c._id === e.target.value);
    if (!comp) return;
    setSelectedId(comp._id);
    onCompetitionChange?.(comp);
  }

  return (
    <div
      className="absolute top-0 inset-x-0 z-20"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 h-12 flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] font-inter">
          <Link
            href="/"
            className="text-white/40 hover:text-white/70 transition-colors uppercase"
          >
            CFFL
          </Link>
          <ChevronRight className="text-white/25 w-3 h-3 shrink-0" />
          <Link
            href="/teams"
            className="text-white/40 hover:text-white/70 transition-colors uppercase"
          >
            TEAMS
          </Link>
          <ChevronRight className="text-white/25 w-3 h-3 shrink-0" />
          <span className="text-white uppercase">{teamName}</span>
        </div>

        {/* Competitions dropdown */}
        {competitions?.length ? (
          <select
            value={selectedId}
            onChange={handleChange}
            className="text-[10px] font-bold tracking-[0.12em] font-inter uppercase text-white/80 bg-transparent border border-white/20 rounded px-2 py-1 cursor-pointer outline-none hover:border-white/40 transition-colors"
          >
            {competitions.map((comp) => (
              <option key={comp._id} value={comp._id} className="bg-black text-white normal-case">
                {comp.name ?? comp._id}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    </div>
  );
};

export default TopAppBar;

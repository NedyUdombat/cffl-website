"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import useFetchCompetitions from "@/queries/competitions/useFetchCompetitions";
import type { COMPETITIONS_QUERYResult } from "../../sanity.types";

export type CompetitionItem = COMPETITIONS_QUERYResult[number];

type CompetitionContextType = {
  selectedCompetition: CompetitionItem | undefined;
  setSelectedCompetition: (competition: CompetitionItem | undefined) => void;
};

const STORAGE_KEY = "cffl_selected_competition_id";
export const ALL_COMPETITIONS_VALUE = "all_comps";

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: React.ReactNode }) {
  const { competitions } = useFetchCompetitions();
  const [selectedCompetition, setSelectedCompetitionState] = useState<CompetitionItem | undefined>(
    undefined
  );

  // On competitions load, resolve stored _id → full object
  useEffect(() => {
    if (!competitions?.length) return;
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (!storedId) return;
    if (storedId === ALL_COMPETITIONS_VALUE) return; // "all" means undefined — nothing to resolve
    const match = competitions.find((c) => c._id === storedId);
    if (match) setSelectedCompetitionState(match);
  }, [competitions]);

  const setSelectedCompetition = useCallback((competition: CompetitionItem | undefined) => {
    setSelectedCompetitionState(competition);
    if (competition) {
      localStorage.setItem(STORAGE_KEY, competition._id);
    } else {
      localStorage.setItem(STORAGE_KEY, ALL_COMPETITIONS_VALUE);
    }
  }, []);

  const value = useMemo(
    () => ({ selectedCompetition, setSelectedCompetition }),
    [selectedCompetition, setSelectedCompetition]
  );

  return <CompetitionContext.Provider value={value}>{children}</CompetitionContext.Provider>;
}

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (!context) throw new Error("useCompetition must be used within a CompetitionProvider");
  return context;
};

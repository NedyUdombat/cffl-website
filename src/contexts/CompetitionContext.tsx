"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { COMPETITIONS_QUERYResult } from "../../sanity.types";
import useFetchCompetitions from "@/queries/competitions/useFetchCompetitions";

export type CompetitionItem = COMPETITIONS_QUERYResult[number];

type CompetitionContextType = {
  selectedCompetition: CompetitionItem | undefined;
  setSelectedCompetition: (competition: CompetitionItem | undefined) => void;
};

const STORAGE_KEY = "cffl_selected_competition_id";

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export function CompetitionProvider({ children }: { children: React.ReactNode }) {
  const { competitions } = useFetchCompetitions();
  const [selectedCompetition, setSelectedCompetitionState] = useState<CompetitionItem | undefined>(undefined);

  // On competitions load, resolve stored _id → full object
  useEffect(() => {
    if (!competitions?.length) return;
    const storedId = localStorage.getItem(STORAGE_KEY);
    if (!storedId) return;
    const match = competitions.find((c) => c._id === storedId);
    if (match) setSelectedCompetitionState(match);
  }, [competitions]);

  function setSelectedCompetition(competition: CompetitionItem | undefined) {
    setSelectedCompetitionState(competition);
    if (competition) {
      localStorage.setItem(STORAGE_KEY, competition._id);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <CompetitionContext.Provider value={{ selectedCompetition, setSelectedCompetition }}>
      {children}
    </CompetitionContext.Provider>
  );
}

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (!context) throw new Error("useCompetition must be used within a CompetitionProvider");
  return context;
};

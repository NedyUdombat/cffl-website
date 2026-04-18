"use client";

import { createContext, useContext } from "react";
import type { TEAMS_QUERYResult } from "sanity.types";
import useFetchTeams from "@/queries/teams/useFetchTeams";

type TeamsContextType = {
  teams: TEAMS_QUERYResult | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | undefined;
  refetch: () => void;
};

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export function TeamsProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending, isError, error, refetch } = useFetchTeams();

  console.log({ data });
  return (
    <TeamsContext.Provider
      value={{
        teams: data,
        isPending,
        isError,
        error,
        refetch,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error("useTeams must be used within an EventsProvider");
  }
  return context;
};

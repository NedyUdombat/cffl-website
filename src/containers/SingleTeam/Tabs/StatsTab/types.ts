import type { ROSTER_ENTRIES_QUERYResult } from "sanity.types";

export interface PlayerStats {
  gamesPlayed: number;
  passTds: number;
  extraPoints1pt: number;
  extraPoints2pt: number;
  passAttempts: number;
  passCompletions: number;
  interceptionsThrown: number;
  sacksTaken: number;
  targets: number;
  catches: number;
  drops: number;
  sacks: number;
  interceptions: number;
  interceptionTouchdowns: number;
  flagPulls: number;
  passBreakups: number;
  safeties: number;
}

export type PlayerStatRow = ROSTER_ENTRIES_QUERYResult[number] & PlayerStats;

export type Category = "passing" | "receiving" | "defense";

export interface CategoryObject {
  id: Category;
  label: string;
  activeBg: string;
  accentColor: string;
  borderAccent: string;
}

export interface LeaderDef {
  abbr: string;
  label: string;
  getValue: (row: PlayerStatRow) => number;
}

export interface StatsTabProps {
  teamId: string;
  competitionId?: string;
}

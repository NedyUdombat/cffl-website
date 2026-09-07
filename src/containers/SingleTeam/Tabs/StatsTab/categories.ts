import type { Category, CategoryObject, LeaderDef } from "./types";

export const CATEGORIES: CategoryObject[] = [
  {
    id: "passing",
    label: "Passing",
    activeBg: "bg-win",
    accentColor: "text-win",
    borderAccent: "bg-win",
  },
  {
    id: "receiving",
    label: "Receiving",
    activeBg: "bg-info",
    accentColor: "text-info",
    borderAccent: "bg-info",
  },
  {
    id: "defense",
    label: "Defense",
    activeBg: "bg-warning",
    accentColor: "text-warning",
    borderAccent: "bg-warning",
  },
];

export const PRIMARY_POSITIONS: Record<Category, string[]> = {
  passing: ["QB"],
  receiving: ["WR", "TE", "RB"],
  defense: ["CB", "LB", "S", "DE", "DL", "DB", "FS", "SS"],
};

export const LEADERBOARD_DEFS: Record<Category, LeaderDef[]> = {
  passing: [
    { abbr: "ATT", label: "Pass Attempts", getValue: (r) => r.passAttempts },
    { abbr: "CMP", label: "Completions", getValue: (r) => r.passCompletions },
    { abbr: "TDs", label: "Touchdowns", getValue: (r) => r.passTds },
  ],
  receiving: [
    { abbr: "TGT", label: "Targets", getValue: (r) => r.targets },
    { abbr: "REC", label: "Receptions", getValue: (r) => r.catches },
    { abbr: "TDs", label: "Touchdowns", getValue: (r) => r.passTds },
  ],
  defense: [
    { abbr: "INT", label: "Interceptions", getValue: (r) => r.interceptions },
    { abbr: "SACK", label: "Sacks", getValue: (r) => r.sacks },
    { abbr: "FP", label: "Flag Pulls", getValue: (r) => r.flagPulls },
    { abbr: "Pick-6", label: "Pick-6", getValue: (r) => r.interceptionTouchdowns },
  ],
};

export const LEADERBOARD_ROWS = 5;

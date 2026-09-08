import type { StandingsColumnKey } from "./types";

export const ALL_COLUMNS: StandingsColumnKey[] = [
  "rank",
  "team",
  "gp",
  "w",
  "l",
  "t",
  "pct",
  "pf",
  "pa",
  "pd",
];

export const COMPACT_COLUMNS: StandingsColumnKey[] = ["rank", "team", "gp", "w", "l", "pct"];

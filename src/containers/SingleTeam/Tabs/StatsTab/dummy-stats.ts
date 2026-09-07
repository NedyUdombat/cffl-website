import type { PlayerStats } from "./types";

function makeDummyStats(id: string): PlayerStats {
  const h = id.split("").reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7);
  const r = (max: number, salt: number) => ((h ^ (salt * 2654435761)) >>> 0) % (max + 1);
  return {
    gamesPlayed: r(12, 0) + 1,
    passTds: r(14, 1),
    extraPoints1pt: r(10, 3),
    extraPoints2pt: r(6, 4),
    passAttempts: r(65, 9),
    passCompletions: r(45, 10),
    interceptionsThrown: r(7, 11),
    sacksTaken: r(5, 12),
    targets: r(45, 6),
    catches: r(32, 7),
    drops: r(6, 8),
    sacks: r(10, 13),
    interceptions: r(6, 14),
    interceptionTouchdowns: r(4, 2),
    flagPulls: r(30, 15),
    passBreakups: r(12, 16),
    safeties: r(2, 5),
  };
}

export default makeDummyStats;

import type { StandingRow } from "@/components/StandingsTable";

type Match = {
  _id: string;
  homeTeam: {
    _id: string;
    name: string;
    abbreviation: string;
    logo: string;
    slug: string;
  };
  awayTeam: {
    _id: string;
    name: string;
    abbreviation: string;
    logo: string;
    slug: string;
  };
  homeScore: number;
  awayScore: number;
  status: string;
};

export function computeStandings(matches: Match[]): StandingRow[] {
  const map = new Map<string, StandingRow>();

  const getOrCreate = (team: Match["homeTeam"]): StandingRow => {
    if (!map.has(team._id)) {
      map.set(team._id, {
        rank: 0,
        team,
        gp: 0,
        w: 0,
        l: 0,
        t: 0,
        pct: 0,
        pf: 0,
        pa: 0,
        pd: 0,
      });
    }
    return map.get(team._id)!;
  };

  for (const match of matches) {
    if (match.status !== "completed") continue;

    const home = getOrCreate(match.homeTeam);
    const away = getOrCreate(match.awayTeam);

    home.gp++;
    away.gp++;
    home.pf += match.homeScore;
    home.pa += match.awayScore;
    away.pf += match.awayScore;
    away.pa += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.w++;
      away.l++;
    } else if (match.awayScore > match.homeScore) {
      away.w++;
      home.l++;
    } else {
      home.t++;
      away.t++;
    }
  }

  return Array.from(map.values())
    .map((row) => ({
      ...row,
      pd: row.pf - row.pa,
      pct: row.gp > 0 ? row.w / row.gp : 0,
    }))
    .sort((a, b) => {
      // 1. Win percentage
      if (b.pct !== a.pct) return b.pct - a.pct;
      // 2. Point differential
      if (b.pd !== a.pd) return b.pd - a.pd;
      // 3. Points for
      return b.pf - a.pf;
    })
    .map((row, i) => ({ ...row, rank: i + 1 }));
}

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

type H2HRecord = { w: number; t: number; l: number };

export function computeStandings(matches: Match[]): StandingRow[] {
  const map = new Map<string, StandingRow>();
  const h2h = new Map<string, Map<string, H2HRecord>>();

  const getOrCreate = (team: Match["homeTeam"]): StandingRow => {
    const existing = map.get(team._id);
    if (existing) return existing;

    const row: StandingRow = {
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
    };

    map.set(team._id, row);
    return row;
  };

  const getH2H = (teamId: string, opponentId: string): H2HRecord => {
    let inner = h2h.get(teamId);

    if (!inner) {
      inner = new Map();
      h2h.set(teamId, inner);
    }

    let record = inner.get(opponentId);

    if (!record) {
      record = { w: 0, t: 0, l: 0 };
      inner.set(opponentId, record);
    }

    return record;
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

    const homeH2H = getH2H(match.homeTeam._id, match.awayTeam._id);
    const awayH2H = getH2H(match.awayTeam._id, match.homeTeam._id);

    if (match.homeScore > match.awayScore) {
      home.w++;
      away.l++;
      homeH2H.w++;
      awayH2H.l++;
    } else if (match.awayScore > match.homeScore) {
      away.w++;
      home.l++;
      awayH2H.w++;
      homeH2H.l++;
    } else {
      home.t++;
      away.t++;
      homeH2H.t++;
      awayH2H.t++;
    }
  }

  return Array.from(map.values())
    .map((row) => ({
      ...row,
      pd: row.pf - row.pa,
      pct: row.gp > 0 ? (row.w + 0.5 * row.t) / row.gp : 0,
    }))
    .sort((a, b) => {
      // 1. W / T / L
      if (b.w !== a.w) return b.w - a.w;
      if (b.t !== a.t) return b.t - a.t;
      if (a.l !== b.l) return a.l - b.l;
      // 2. Head-to-head
      const aVsB = h2h.get(a.team._id)?.get(b.team._id) ?? { w: 0, t: 0, l: 0 };
      const bVsA = h2h.get(b.team._id)?.get(a.team._id) ?? { w: 0, t: 0, l: 0 };
      if (aVsB.w !== bVsA.w) return bVsA.w - aVsB.w;
      if (aVsB.t !== bVsA.t) return bVsA.t - aVsB.t;
      // 3. Point differential
      if (b.pd !== a.pd) return b.pd - a.pd;
      // 4. Points for
      return b.pf - a.pf;
    })
    .map((row, i) => ({ ...row, rank: i + 1 }));
}

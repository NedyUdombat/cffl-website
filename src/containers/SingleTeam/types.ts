// src/containers/SingleTeam/components/types.ts

export type PlayerGender = "Male" | "Female";

export interface Player {
  id: number;
  jerseyNumber: number;
  name: string;
  position: string;
  photo?: string;
  isCaptain?: boolean;
  gender: PlayerGender;
}

export interface CoachData {
  name: string;
  title: string;
}

export interface NewsArticle {
  id: number;
  imageSrc: string;
  writeup: string;
  date: string;
  slug: string;
}

export interface TeamSocialLinks {
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
}

export interface TeamStats {
  wins: number;
  losses: number;
  pointsScored: number;
  pointsAllowed: number;
}

export interface CarouselItem {
  src: string;
  caption: string;
}

export interface Standing {
  rank: number;
  teamName: string;
  teamSlug: string;
  gp: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
}

export interface MatchResult {
  date: string; // ISO "2026-04-12"
  opponent: string;
  teamScore: number; // this team's score
  opponentScore: number;
  isHome: boolean;
  result: "W" | "L";
}

export interface Fixture {
  date: string; // ISO "2026-04-19"
  opponent: string;
  kickoffTime: string; // "14:00"
  isHome: boolean;
}

export interface MockNewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageSrc: string;
  slug: string;
}

export interface SingleTeamProps {
  slug: string;
}

export const EASE = [0.22, 1, 0.36, 1] as const;

export const POSITION_COLORS: Record<string, string> = {
  QB: "#1d4ed8",
  WR: "#15803d",
  RB: "#0f766e",
  CB: "#b91c1c",
  LB: "#b45309",
  S: "#7c3aed",
  DE: "#c2410c",
  TE: "#0f766e",
  C: "#be185d",
  OL: "#374151",
  DL: "#1e3a5f",
  K: "#6b21a8",
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

export interface OverviewStats {
  wins: number;
  draws: number;
  losses: number;
  winPct: number;
  ptsFor: number;
  ptsAgainst: number;
}

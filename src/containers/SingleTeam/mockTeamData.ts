// src/containers/SingleTeam/mockTeamData.ts

import type {
  Standing,
  MatchResult,
  Fixture,
  MockNewsArticle,
  PlayerGender,
  TeamStats,
} from './components/types';

// ─── League standings ──────────────────────────────────────────────────────
export const mockStandings: Standing[] = [
  { rank: 1, teamName: 'Lagos Lions',  teamSlug: 'lagos-lions',  gp: 6, wins: 5, losses: 1, pointsFor: 182, pointsAgainst: 87  },
  { rank: 2, teamName: 'Abuja Eagles', teamSlug: 'abuja-eagles', gp: 6, wins: 4, losses: 2, pointsFor: 154, pointsAgainst: 103 },
  { rank: 3, teamName: 'PH Bolts',     teamSlug: 'ph-bolts',     gp: 6, wins: 3, losses: 3, pointsFor: 131, pointsAgainst: 128 },
  { rank: 4, teamName: 'Kano Chiefs',  teamSlug: 'kano-chiefs',  gp: 6, wins: 2, losses: 4, pointsFor: 110, pointsAgainst: 149 },
  { rank: 5, teamName: 'Enugu Storm',  teamSlug: 'enugu-storm',  gp: 6, wins: 1, losses: 5, pointsFor: 94,  pointsAgainst: 187 },
];

// ─── Season stats ──────────────────────────────────────────────────────────
export const mockStats: TeamStats = {
  wins: 4,
  losses: 2,
  pointsScored: 154,
  pointsAllowed: 103,
};

// ─── Recent results ────────────────────────────────────────────────────────
export const mockResults: MatchResult[] = [
  { date: '2026-04-12', opponent: 'Lagos Lions',  teamScore: 21, opponentScore: 14, isHome: true,  result: 'W' },
  { date: '2026-04-05', opponent: 'Abuja Eagles', teamScore: 10, opponentScore: 28, isHome: false, result: 'L' },
  { date: '2026-03-29', opponent: 'PH Bolts',     teamScore: 35, opponentScore: 7,  isHome: true,  result: 'W' },
  { date: '2026-03-22', opponent: 'Enugu Storm',  teamScore: 28, opponentScore: 14, isHome: false, result: 'W' },
  { date: '2026-03-15', opponent: 'Kano Chiefs',  teamScore: 17, opponentScore: 21, isHome: true,  result: 'L' },
  { date: '2026-03-08', opponent: 'Lagos Lions',  teamScore: 31, opponentScore: 10, isHome: false, result: 'W' },
];

// ─── Upcoming fixtures ─────────────────────────────────────────────────────
export const mockFixtures: Fixture[] = [
  { date: '2026-04-19', opponent: 'Kano Chiefs', kickoffTime: '14:00', isHome: true  },
  { date: '2026-04-26', opponent: 'Enugu Storm', kickoffTime: '16:00', isHome: false },
  { date: '2026-05-03', opponent: 'PH Bolts',    kickoffTime: '12:00', isHome: true  },
];

// ─── Season form (oldest → most recent) ───────────────────────────────────
export const mockForm: ('W' | 'L')[] = ['W', 'L', 'W', 'W', 'L', 'W'];

// ─── Player genders (keyed by player name for quick lookup) ───────────────
export const mockPlayerGenders: Record<string, PlayerGender> = {
  'Amaka Osei':      'Female',
  'Chisom Nwosu':    'Female',
  'Blessing Adaora': 'Female',
};

// ─── News articles ─────────────────────────────────────────────────────────
export const mockNews: MockNewsArticle[] = [
  {
    id: 1,
    title: 'Match Report: 21–14 Victory Over Lagos Lions',
    excerpt: 'A dominant second-half performance sealed a crucial home victory as the team climbed to second place in the CFFL standings.',
    date: '2026-04-12',
    category: 'Match Report',
    imageSrc: 'https://picsum.photos/seed/cffl-news-1/800/400',
    slug: 'match-report-21-14-victory-lagos-lions',
  },
  {
    id: 2,
    title: 'Pre-Season Training Camp Begins This Weekend',
    excerpt: 'Coaches and players gather for the annual two-day training camp ahead of the second half of the season.',
    date: '2026-04-08',
    category: 'Training',
    imageSrc: 'https://picsum.photos/seed/cffl-news-2/800/400',
    slug: 'pre-season-training-camp-begins',
  },
  {
    id: 3,
    title: 'Three New Players Join the Roster',
    excerpt: 'The team announces signings from across Nigeria, bolstering both the offensive line and defensive backfield.',
    date: '2026-04-02',
    category: 'Transfers',
    imageSrc: 'https://picsum.photos/seed/cffl-news-3/800/400',
    slug: 'three-new-players-join-roster',
  },
  {
    id: 4,
    title: 'Captain Speaks Ahead of Rivalry Fixture',
    excerpt: 'In an exclusive interview, the team captain shares his thoughts on the upcoming clash and what the squad has been working on.',
    date: '2026-03-28',
    category: 'Interview',
    imageSrc: 'https://picsum.photos/seed/cffl-news-4/800/400',
    slug: 'captain-speaks-ahead-rivalry-fixture',
  },
  {
    id: 5,
    title: 'CFFL Community Day Recap',
    excerpt: 'Hundreds of fans turned out for the annual community day event, with flag football clinics for children of all ages.',
    date: '2026-03-20',
    category: 'Community',
    imageSrc: 'https://picsum.photos/seed/cffl-news-5/800/400',
    slug: 'cffl-community-day-recap',
  },
];

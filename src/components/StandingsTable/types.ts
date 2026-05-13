import type { ColumnDef } from "../Table/types";

export type StandingRow = {
  rank: number;
  team: {
    _id: string;
    name: string;
    abbreviation: string;
    logo: string;
    slug: string;
  };
  gp: number;
  w: number;
  l: number;
  t: number;
  pct: number;
  pf: number;
  pa: number;
  pd: number;
};

export type StandingsColumnKey =
  | "rank"
  | "team"
  | "gp"
  | "w"
  | "l"
  | "t"
  | "pct"
  | "pf"
  | "pa"
  | "pd";

export type StandingsTableProps = {
  rows: StandingRow[];
  /** Highlights this team's row with a red left accent */
  highlightTeamId?: string;
  /** Caps visible rows — use for sidebar/overview */
  maxRows?: number;
  /** Which columns to render. Defaults to all. */
  columns?: StandingsColumnKey[];
  /** Additional column defs appended after the standard columns */
  extraColumns?: ColumnDef<StandingRow>[];
  /** Enables header click sorting */
  sortable?: boolean;
  /** Tighter rows for sidebar contexts */
  compact?: boolean;
  /** Offset for row index passed to cell() — keeps rank numbers correct when rendering a slice */
  startIndex?: number;
  className?: string;
  /** Return extra classes for a given row by its data and sorted index */
  getRowClassName?: (row: StandingRow, index: number) => string;
};

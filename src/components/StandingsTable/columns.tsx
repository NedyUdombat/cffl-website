import Image from "next/image";
import Link from "next/link";
import type { ColumnDef } from "../Table/types";
import type { StandingRow, StandingsColumnKey } from "./types";

function Num({ children, highlight }: { children: React.ReactNode; highlight?: "green" | "red" }) {
  return (
    <span
      className={`font-mono text-xs ${
        highlight === "green" ? "text-win" : highlight === "red" ? "text-loss" : "text-ink/70"
      }`}
    >
      {children}
    </span>
  );
}

function TeamBadge({
  logo,
  name,
  abbreviation,
}: {
  logo: string;
  name: string;
  abbreviation: string;
}) {
  return logo ? (
    <Image
      src={logo}
      alt={name}
      width={28}
      height={28}
      className="w-7 h-7 rounded-full object-contain bg-white/5"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  ) : (
    <Monogram abbreviation={abbreviation} />
  );
}

function Monogram({ abbreviation }: { abbreviation: string }) {
  return (
    <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
      <span className="text-2xs font-bold text-accent tracking-tight">
        {abbreviation.slice(0, 2)}
      </span>
    </div>
  );
}

export function buildColumns(
  _rows: StandingRow[],
  keys: StandingsColumnKey[]
): ColumnDef<StandingRow>[] {
  const all: Record<StandingsColumnKey, ColumnDef<StandingRow>> = {
    rank: {
      key: "rank",
      header: "POS",
      className: "w-10 text-center",
      sortValue: (row) => row.rank,
      cell: (row) => (
        <span className="text-ink font-mono text-xs">{String(row.rank).padStart(2, "0")}</span>
      ),
    },

    team: {
      key: "team",
      header: "Team",
      className: "min-w-[140px]",
      sortValue: (row) => row.team.name,

      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link href={`/teams/${row.team.slug}?tab=standings`} className="flex items-center gap-2">
            <TeamBadge
              logo={row.team.logo}
              name={row.team.name}
              abbreviation={row.team.abbreviation}
            />
            <span className="font-mono text-ink text-xs">{row.team.name}</span>
          </Link>
        </div>
      ),
    },

    gp: {
      key: "gp",
      header: "GP",
      className: "text-center",
      sortValue: (row) => row.gp,
      cell: (row) => <Num>{row.gp}</Num>,
    },

    w: {
      key: "w",
      header: "W",
      className: "text-center",
      sortValue: (row) => row.w,
      cell: (row) => <Num highlight="green">{row.w}</Num>,
    },

    l: {
      key: "l",
      header: "L",
      className: "text-center",
      sortValue: (row) => row.l,
      cell: (row) => <Num highlight="red">{row.l}</Num>,
    },

    t: {
      key: "t",
      header: "T",
      className: "text-center  sm:table-cell",
      sortValue: (row) => row.t,
      cell: (row) => <Num>{row.t}</Num>,
    },

    pct: {
      key: "pct",
      header: "PCT",
      className: "text-center text-muted-2",
      sortValue: (row) => row.pct,
      cell: (row) => <span className="font-mono text-ink/80 text-xs">{row.pct.toFixed(3)}</span>,
    },

    pf: {
      key: "pf",
      header: "PF",
      className: "text-center hidden md:table-cell",
      sortValue: (row) => row.pf,
      cell: (row) => <Num>{row.pf}</Num>,
    },

    pa: {
      key: "pa",
      header: "PA",
      className: "text-center hidden md:table-cell",
      sortValue: (row) => row.pa,
      cell: (row) => <Num>{row.pa}</Num>,
    },

    pd: {
      key: "pd",
      header: "PD",
      className: "text-center hidden md:table-cell",
      sortValue: (row) => row.pd,
      cell: (row) => (
        <span
          className={`font-mono text-xs font-semibold ${
            row.pd > 0 ? "text-win" : row.pd < 0 ? "text-loss" : "text-muted-2"
          }`}
        >
          {row.pd > 0 ? `+${row.pd}` : row.pd}
        </span>
      ),
    },
  };

  return keys.map((k) => all[k]);
}

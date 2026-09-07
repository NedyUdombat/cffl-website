import Image from "next/image";
import type { ColumnDef } from "@/components/Table/types";
import { PRIMARY_POSITIONS } from "./categories";
import type { Category, PlayerStatRow, PlayerStats } from "./types";

function getDisplayName(row: PlayerStatRow): string {
  const firstName = row.player?.firstName ?? "";
  const lastName = row.player?.lastName ?? "";
  return row.jerseyName || `${firstName} ${lastName}`.trim() || "—";
}

function getInitials(row: PlayerStatRow): string {
  const fn = row.player?.firstName?.[0] ?? "";
  const ln = row.player?.lastName?.[0] ?? "";
  return `${fn}${ln}`.toUpperCase() || "?";
}

const playerCol: ColumnDef<PlayerStatRow> = {
  key: "player",
  header: "Player",
  sortValue: (row) => getDisplayName(row).toLowerCase(),
  cell: (row) => {
    const displayName = getDisplayName(row);
    const photo = row.player?.photo;
    const num = String(row.jerseyNumber ?? 0).padStart(2, "0");

    return (
      <div className="flex items-center gap-3 min-w-[160px]">
        <div className="size-8 rounded-full bg-surface-2 grid place-items-center shrink-0 relative overflow-hidden ring-1 ring-line">
          {photo ? (
            <Image src={photo} alt={displayName} fill sizes="32px" className="object-cover" />
          ) : (
            <span className="font-mono font-semibold text-[10px] text-muted">
              {getInitials(row)}
            </span>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-mono font-semibold text-sm text-ink tracking-wide leading-tight truncate">
            {displayName}
          </span>
          <span className="font-mono text-[9px] text-muted leading-tight">#{num}</span>
        </div>
      </div>
    );
  },
};

function numCol(key: keyof PlayerStats, header: string, title?: string): ColumnDef<PlayerStatRow> {
  return {
    key,
    header,
    className: "text-center",
    sortValue: (row) => row[key],
    cell: (row) => (
      <span title={title} className="font-mono text-xs text-ink tabular-nums">
        {row[key]}
      </span>
    ),
  };
}

function makeGpCol(category: Category): ColumnDef<PlayerStatRow> {
  return {
    key: "gamesPlayed",
    header: "GP",
    className: "text-center w-[56px]",
    sortValue: (row) => {
      const isPrimary = (row.positions ?? []).some((p) => PRIMARY_POSITIONS[category].includes(p));
      return isPrimary ? 10000 + row.gamesPlayed : row.gamesPlayed;
    },
    cell: (row) => (
      <span title="Games Played" className="font-mono text-xs text-ink tabular-nums">
        {row.gamesPlayed}
      </span>
    ),
  };
}

const cmpPctCol: ColumnDef<PlayerStatRow> = {
  key: "compPct",
  header: "CMP%",
  className: "text-center",
  sortValue: (row) => (row.passAttempts > 0 ? row.passCompletions / row.passAttempts : 0),
  cell: (row) => (
    <span title="Completion Percentage" className="font-mono text-xs text-ink tabular-nums">
      {row.passAttempts > 0
        ? `${Math.round((row.passCompletions / row.passAttempts) * 100)}%`
        : "—"}
    </span>
  ),
};

const xpCol: ColumnDef<PlayerStatRow> = {
  key: "xp",
  header: "XP",
  className: "text-center",
  sortValue: (row) => row.extraPoints1pt + row.extraPoints2pt,
  cell: (row) => (
    <span title="Extra Points (1pt + 2pt)" className="font-mono text-xs text-ink tabular-nums">
      {row.extraPoints1pt + row.extraPoints2pt}
    </span>
  ),
};

function buildColumns(category: Category): ColumnDef<PlayerStatRow>[] {
  const gp = makeGpCol(category);
  switch (category) {
    case "passing":
      return [
        gp,
        numCol("passAttempts", "ATT", "Pass Attempts"),
        numCol("passCompletions", "CMP", "Pass Completions"),
        cmpPctCol,
        numCol("passTds", "TDs", "Passing Touchdowns"),
        xpCol,
        numCol("interceptionsThrown", "INT", "Interceptions Thrown"),
        numCol("sacksTaken", "SCK", "Sacks Taken"),
      ];
    case "receiving":
      return [
        gp,
        numCol("targets", "TGT", "Targets"),
        numCol("catches", "REC", "Receptions"),
        numCol("passTds", "TDs", "Receiving Touchdowns"),
        xpCol,
        numCol("drops", "DRP", "Drops"),
      ];
    case "defense":
      return [
        gp,
        numCol("flagPulls", "FP", "Flag Pulls"),
        numCol("passBreakups", "PBU", "Pass Breakups"),
        numCol("interceptions", "INT", "Interceptions"),
        numCol("sacks", "SACK", "Sacks"),
        numCol("interceptionTouchdowns", "Pick-6", "Interception Touchdowns"),
        numCol("safeties", "SAF", "Safeties"),
      ];
  }
}

export { buildColumns, getDisplayName, getInitials, playerCol };

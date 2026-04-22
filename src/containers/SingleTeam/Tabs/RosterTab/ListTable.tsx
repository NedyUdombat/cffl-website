import Image from "next/image";
import type { ROSTER_ENTRIES_QUERYResult } from "sanity.types";
import { type ColumnDef, Table } from "@/components/Table";
import { EmptyState } from "./EmptyState";

type Entry = ROSTER_ENTRIES_QUERYResult[number];
type Gender = NonNullable<NonNullable<Entry["player"]>["gender"]>;

function formatGender(g: Gender | null | undefined): string {
  if (!g || g === "prefer-not-to-say") return "—";
  const map: Record<Gender, string> = {
    male: "M",
    female: "F",
    "non-binary": "Non-binary",
    "prefer-not-to-say": "—",
  };
  return map[g];
}

// Prefix sort values so captains always band at the top in ascending order.
const captainBand = (row: Entry, n: number) => (row.isCaptain ? n : n + 10000);
const captainStr = (row: Entry, s: string) => `${row.isCaptain ? "0" : "1"}_${s}`;

const COLUMNS: ColumnDef<Entry>[] = [
  {
    key: "number",
    header: "#",
    className: "w-[70px] text-right",
    sortValue: (row) => captainBand(row, row.jerseyNumber ?? 0),
    cell: (row) => (
      <span className="text-black font-mono text-xs">
        {String(row.jerseyNumber ?? 0).padStart(2, "0")}
      </span>
    ),
  },
  {
    key: "name",
    header: "Player",
    sortValue: (row) => {
      const fn = row.player?.firstName ?? "";
      const ln = row.player?.lastName ?? "";
      return captainStr(row, `${fn} ${ln}`.trim().toLowerCase());
    },
    cell: (row) => {
      const firstName = row.player?.firstName ?? "";
      const lastName = row.player?.lastName ?? "";
      const fullName = `${firstName} ${lastName}`.trim() || "—";
      const photo = row.player?.photo;
      const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";
      const isCaptain = row.isCaptain ?? false;

      return (
        <div className="flex items-center gap-2">
          <div
            className={[
              "size-9 rounded-full bg-gradient-to-br from-[#1c1d20] to-[#0f1012]",
              "grid place-items-center font-display font-black text-xs text-white",
              "shrink-0 relative overflow-hidden",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {photo ? (
              <Image src={photo} alt={fullName} fill sizes="36px" className="object-cover" />
            ) : (
              <span className="relative z-10 font-mono">{initials}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-mono text-black text-xs">{fullName}</span>
            {isCaptain && (
              <span className="bg-accent px-1 py-px rounded font-bold font-mono text-white text-2xs">
                CAPT
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    key: "jerseyName",
    header: "Jersey Name",
    sortValue: (row) => captainStr(row, row.jerseyName?.toLowerCase() ?? ""),
    cell: (row) =>
      row.jerseyName ? (
        <span className="font-mono text-xs text-ink">{row.jerseyName}</span>
      ) : (
        <span className="font-mono text-xs text-muted">—</span>
      ),
  },
  {
    key: "gender",
    header: "Gender",
    className: "text-center",
    sortValue: (row) => captainStr(row, row.player?.gender ?? ""),
    cell: (row) => (
      <span className="font-mono text-xs text-ink">{formatGender(row.player?.gender)}</span>
    ),
  },
  {
    key: "positions",
    header: "Position(s)",
    className: " max-w-[200px]",
    sortValue: (row) => captainStr(row, (row.positions ?? [])[0]?.toLowerCase() ?? ""),
    cell: (row) => (
      <div className="flex gap-1 flex-wrap">
        {(row.positions ?? []).map((pos, i) => (
          <span
            key={pos}
            className={[
              "w-7 h-6 shrink-0 flex items-center justify-center rounded-md",
              "font-inter text-3xs font-semibold tracking-ui bg-line-2 text-ink",
            ].join(" ")}
          >
            {pos}
          </span>
        ))}
      </div>
    ),
  },
];

export function ListTable({ entries }: { entries: ROSTER_ENTRIES_QUERYResult }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <Table
        data={entries}
        columns={COLUMNS}
        getRowKey={(row) => row._id}
        sortable
        defaultSortKey="number"
        defaultSortDir="asc"
        striped
        emptyState={<EmptyState />}
        getRowClassName={(row) =>
          row.isCaptain ? "!bg-accent-tint-2 border-l-4 border-l-accent" : ""
        }
        tdClassName="text-black align-middle"
      />
    </div>
  );
}

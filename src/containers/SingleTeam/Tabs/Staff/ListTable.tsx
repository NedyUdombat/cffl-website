import Image from "next/image";
import type { STAFFS_QUERYResult } from "sanity.types";
import EmptyState from "@/components/EmptyState";
import { Table } from "@/components/Table";
import type { ColumnDef } from "@/components/Table/types";
import { formatGender } from "@/lib/format-gender";
import { STAFF_ROLES } from "@/styles/tokens";

type Entry = STAFFS_QUERYResult[number];

const COLUMNS: ColumnDef<Entry>[] = [
  {
    key: "number",
    header: "S/N",
    className: "w-[70px] text-right",
    cell: (_, index) => (
      <span className="text-black font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
    ),
  },
  {
    key: "name",
    header: "Staff",
    sortValue: (row) => {
      const fn = row?.firstName ?? "";
      const ln = row?.lastName ?? "";
      return `${fn} ${ln}`.trim().toLowerCase();
    },
    cell: (row) => {
      const firstName = row?.firstName ?? "";
      const lastName = row?.lastName ?? "";
      const fullName = `${firstName} ${lastName}`.trim() || "—";
      const photo = row?.photo;
      const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";

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
          </div>
        </div>
      );
    },
  },
  {
    key: "role",
    header: "Role",
    // sortValue: (row) => row.jerseyName?.toLowerCase() ?? "",
    cell: (row) =>
      row.role ? (
        <span className="font-mono text-xs text-ink">{STAFF_ROLES[row.role]}</span>
      ) : (
        <span className="font-mono text-xs text-muted">—</span>
      ),
  },
  {
    key: "gender",
    header: "Gender",
    className: "text-center",
    sortValue: (row) => row?.gender ?? "",
    cell: (row) => <span className="font-mono text-xs text-ink">{formatGender(row?.gender)}</span>,
  },
];

export function ListTable({ entries }: { entries: STAFFS_QUERYResult }) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-2xl ${entries.length > 0 ? "p-5 shadow-sm" : "p-0"}`}
    >
      <Table
        data={entries}
        columns={COLUMNS}
        getRowKey={(row) => row._id}
        sortable
        defaultSortKey="number"
        defaultSortDir="asc"
        striped
        emptyState={<EmptyState title="No players found" />}
        tdClassName="text-black align-middle"
      />
    </div>
  );
}

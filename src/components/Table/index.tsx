import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc";

export type ColumnDef<T> = {
  key: string;
  header: string;
  /** Render the cell. Receives the row and its computed index */
  cell: (row: T, index: number) => React.ReactNode;
  /** Used for client-side sorting. Return a comparable primitive */
  sortValue?: (row: T) => string | number;
  /** Tailwind classes applied to both <th> and <td> */
  className?: string;
  /** Hide this column on small screens */
  hideOnMobile?: boolean;
};

export type TableProps<T> = {
  /** All data rows */
  data: T[];
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Unique key extractor for React reconciliation */
  getRowKey: (row: T) => string;
  /** If provided, this row gets the highlight treatment */
  highlightRowKey?: string;
  /** Cap the number of visible rows (useful for sidebar previews) */
  maxRows?: number;
  /** Offset added to the row index passed to cell() — use when rendering a slice of a larger list */
  rowIndexOffset?: number;
  /** Enable header click → sort */
  sortable?: boolean;
  /** Default column key to sort by */
  defaultSortKey?: string;
  /** Default sort direction */
  defaultSortDir?: SortDirection;
  /** Show alternating row backgrounds */
  striped?: boolean;
  /** Tighter row padding for sidebar / compact contexts */
  compact?: boolean;
  /** Extra classes on the wrapping <div> */
  className?: string;
  /** Extra classes applied to every <td> */
  tdClassName?: string;
  /** Extra classes applied to every <th> */
  thClassName?: string;
  /** Shown when data is empty */
  emptyState?: React.ReactNode;
  /** Return extra classes for a given row by its data and sorted index */
  getRowClassName?: (row: T, index: number) => string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Table<T>({
  data,
  columns,
  getRowKey,
  highlightRowKey,
  maxRows,
  rowIndexOffset = 0,
  sortable = false,
  defaultSortKey,
  defaultSortDir = "desc",
  striped = false,
  compact = false,
  className = "",
  tdClassName = "",
  thClassName = "",
  emptyState,
  getRowClassName,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | undefined>(defaultSortKey);
  const [sortDir, setSortDir] = useState<SortDirection>(defaultSortDir);

  // ── Sorting ──────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortable || !sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return data;

    return [...data].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, columns, sortable, sortKey, sortDir]);

  // ── Row cap ───────────────────────────────────────────────────────────────
  const visible = maxRows ? sorted.slice(0, maxRows) : sorted;

  // ── Sort toggle ───────────────────────────────────────────────────────────
  const handleSort = (key: string) => {
    if (!sortable) return;
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!data.length) {
    return (
      <div className={`w-full ${className}`}>
        {emptyState ?? <p className="py-8 text-center text-sm text-gray-500">No data available.</p>}
      </div>
    );
  }

  const rowPadding = compact ? "px-3 py-2" : "px-4 py-3";
  const headerPadding = compact ? "px-3 py-2" : "px-4 py-3";

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse text-sm">
        {/* ── Head ── */}
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              const canSort = sortable && !!col.sortValue;

              return (
                <th
                  key={col.key}
                  onClick={() => canSort && handleSort(col.key)}
                  className={cn(
                    headerPadding,
                    "text-left text-[10px] font-bold uppercase tracking-widest",
                    "text-gray-400 select-none whitespace-nowrap",
                    canSort && "cursor-pointer",
                    isSorted && "text-gray-900",
                    col.hideOnMobile && "hidden sm:table-cell",
                    col.className,
                    thClassName,
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {canSort && <SortIcon active={isSorted} dir={sortDir} />}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {visible.map((row, index) => {
            const key = getRowKey(row);
            const isHighlighted = key === highlightRowKey;

            return (
              <tr
                key={key}
                className={[
                  "border-b border-white/5 transition-colors",
                  isHighlighted
                    ? "bg-red-600/10 border-l-2 border-l-red-500"
                    : striped && index % 2 === 1
                      ? "bg-white/[0.02]"
                      : "",
                  "hover:bg-gray-100",
                  getRowClassName ? getRowClassName(row, index) : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      rowPadding,
                      "whitespace-nowrap",
                      isHighlighted && "font-semibold",
                      col.hideOnMobile && "hidden sm:table-cell",
                      col.className,
                      tdClassName,
                    )}
                  >
                    {col.cell(row, rowIndexOffset + index)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: SortDirection }) {
  return (
    <span className="inline-flex flex-col gap-[2px] opacity-60">
      <span
        className={`block w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px]
          border-l-transparent border-r-transparent
          ${active && dir === "asc" ? "border-b-gray-900 opacity-100" : "border-b-gray-500"}`}
      />
      <span
        className={`block w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px]
          border-l-transparent border-r-transparent
          ${active && dir === "desc" ? "border-t-gray-900 opacity-100" : "border-t-gray-500"}`}
      />
    </span>
  );
}

export default Table;

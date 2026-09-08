import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { SortDirection, TableProps } from "./types";

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
  dark = false,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | undefined>(defaultSortKey);
  const [sortDir, setSortDir] = useState<SortDirection>(defaultSortDir);

  // ── Sorting ──────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortable || !sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return data;

    const sortValue = col.sortValue;

    return [...data].sort((a, b) => {
      const av = sortValue(a);
      const bv = sortValue(b);
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
      // <div className={`w-full ${className}`}>
      emptyState ?? <p className="py-8 text-center text-sm text-gray-500">No data available.</p>
      // </div>
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
                    isSorted && (dark ? "!text-white/90" : "text-gray-900"),
                    col.hideOnMobile && "hidden sm:table-cell",
                    col.className,
                    thClassName
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {canSort && <SortIcon active={isSorted} dir={sortDir} dark={dark} />}
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
                      ? dark
                        ? "bg-white/[0.03]"
                        : "bg-black/[0.02]"
                      : "",
                  dark ? "hover:bg-white/[0.04]" : "hover:bg-gray-100",
                  getRowClassName ? getRowClassName(row, index) : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {columns.map((col) => {
                  const isSortedCol = sortable && col.key === sortKey;
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        rowPadding,
                        "whitespace-nowrap",
                        isHighlighted && "font-semibold",
                        isSortedCol && "font-semibold",
                        col.hideOnMobile && "hidden sm:table-cell",
                        col.className,
                        tdClassName
                      )}
                    >
                      {col.cell(row, rowIndexOffset + index)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ active, dir, dark }: { active: boolean; dir: SortDirection; dark: boolean }) {
  const inactiveColor = dark ? "border-b-white/30" : "border-b-gray-500";
  const activeColorAsc = dark ? "border-b-white opacity-100" : "border-b-gray-900 opacity-100";
  const inactiveColorDesc = dark ? "border-t-white/30" : "border-t-gray-500";
  const activeColorDesc = dark ? "border-t-white opacity-100" : "border-t-gray-900 opacity-100";
  return (
    <span className="inline-flex flex-col gap-[2px] opacity-60">
      <span
        className={`block w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent ${active && dir === "asc" ? activeColorAsc : inactiveColor}`}
      />
      <span
        className={`block w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent ${active && dir === "desc" ? activeColorDesc : inactiveColorDesc}`}
      />
    </span>
  );
}

export default Table;

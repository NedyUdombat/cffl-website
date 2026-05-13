import { Table } from "../Table";
import { buildColumns } from "./columns";
import { ALL_COLUMNS } from "./table-constants";
import type { StandingsTableProps } from "./types";

function StandingsTable({
  rows,
  highlightTeamId,
  maxRows,
  columns = ALL_COLUMNS,
  extraColumns,
  sortable = false,
  compact = false,
  startIndex = 0,
  className,
  getRowClassName,
}: StandingsTableProps) {
  const colDefs = [...buildColumns(rows, columns), ...(extraColumns ?? [])];

  return (
    <Table
      data={rows}
      columns={colDefs}
      getRowKey={(row) => row.team._id}
      highlightRowKey={highlightTeamId}
      maxRows={maxRows}
      rowIndexOffset={startIndex}
      sortable={sortable}
      defaultSortKey="rank"
      defaultSortDir="asc"
      compact={compact}
      striped
      className={className}
      emptyState={<p className="py-6 text-center text-sm text-muted">No standings data yet.</p>}
      tdClassName="text-black"
      getRowClassName={getRowClassName}
    />
  );
}

export default StandingsTable;

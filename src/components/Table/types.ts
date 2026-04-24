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

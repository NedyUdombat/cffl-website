import { T, MONO } from "@/styles/tokens";

export function Pagination({
  total,
  page,
  setPage,
  perPage,
  setPerPage,
}: {
  total: number;
  page: number;
  setPage: (p: number) => void;
  perPage: number;
  setPerPage: (n: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const startIdx = (page - 1) * perPage;
  const endIdx = Math.min(startIdx + perPage, total);
  const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pgBtn = (
    label: React.ReactNode,
    onClick: () => void,
    active = false,
    disabled = false
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: 32,
        height: 32,
        padding: "0 10px",
        borderRadius: 8,
        fontFamily: MONO,
        fontSize: 12,
        fontWeight: 700,
        color: active ? "#fff" : disabled ? T.muted2 : T.muted,
        background: active ? T.ink : "transparent",
        border: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "all 0.12s",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 18,
        padding: "0 4px",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: T.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Showing {total === 0 ? 0 : startIdx + 1}–{endIdx} of {total}
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {pgBtn("‹ Prev", () => setPage(Math.max(1, page - 1)), false, page === 1)}
        {pageList.map((p) => pgBtn(String(p).padStart(2, "0"), () => setPage(p), p === page))}
        {pgBtn("Next ›", () => setPage(Math.min(totalPages, page + 1)), false, page === totalPages)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: MONO,
          fontSize: 11,
          color: T.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span>Per page</span>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          style={{
            height: 28,
            padding: "0 24px 0 8px",
            border: `1px solid ${T.line}`,
            borderRadius: 6,
            background: "#fff",
            fontFamily: MONO,
            fontSize: 12,
            fontWeight: 700,
            appearance: "none",
            cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M2 3.5l3 3 3-3' stroke='%236b7280' fill='none' stroke-width='1.4'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 6px center",
          }}
        >
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}

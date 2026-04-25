import { Button } from "@/components/Button";
import { Select } from "@/components/Select";

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

  const pgBtn = (label: React.ReactNode, onClick: () => void, active = false, disabled = false) => (
    <Button
      variant="transparent"
      onClick={onClick}
      disabled={disabled}
      className={`min-w-8 h-8 px-3 font-mono text-xs font-bold rounded-lg transition-all duration-[120ms] disabled:opacity-[0.35] ${
        active
          ? "bg-ink text-white hover:bg-ink hover:text-white"
          : disabled
            ? "text-muted-2"
            : "text-muted"
      }`}
    >
      {label}
    </Button>
  );

  return (
    <div className="flex items-center justify-between mt-6 px-1 gap-3">
      <div className="font-mono text-xs text-muted tracking-[0.08em] uppercase">
        Showing {total === 0 ? 0 : startIdx + 1}–{endIdx} of {total}
      </div>

      <div className="flex gap-1 items-center">
        {pgBtn("‹ Prev", () => setPage(Math.max(1, page - 1)), false, page === 1)}
        {pageList.map((p) => (
          <span key={p}>{pgBtn(String(p).padStart(2, "0"), () => setPage(p), p === page)}</span>
        ))}
        {pgBtn("Next ›", () => setPage(Math.min(totalPages, page + 1)), false, page === totalPages)}
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-muted tracking-[0.08em] uppercase">
        <p>Per page</p>
        <Select
          size="sm"
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="h-7 font-mono text-xs font-bold"
        >
          {[20, 30, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

import { T, BODY } from "./tokens";

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      style={{
        height: 26,
        padding: "0 6px 0 10px",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: T.accentTint,
        color: T.accent,
        borderRadius: 999,
        fontFamily: BODY,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {label}
      <button
        onClick={onRemove}
        style={{
          width: 16,
          height: 16,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          background: "rgba(237,50,55,0.14)",
          color: T.accent,
          border: 0,
          cursor: "pointer",
          fontSize: 10,
        }}
      >
        ×
      </button>
    </span>
  );
}

export function ActiveFiltersStrip({
  sideFilter,
  setSideFilter,
  positionFilter,
  togglePosition,
  query,
  setQuery,
}: {
  sideFilter: string;
  setSideFilter: (s: string) => void;
  positionFilter: string[];
  togglePosition: (p: string) => void;
  query: string;
  setQuery: (q: string) => void;
}) {
  const any = sideFilter !== "All" || positionFilter.length > 0 || query;
  if (!any) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 16,
        alignItems: "center",
        fontFamily: BODY,
        fontSize: 12,
        color: T.muted,
      }}
    >
      <span
        style={{ textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 11 }}
      >
        Active:
      </span>
      {sideFilter !== "All" && (
        <Tag label={sideFilter} onRemove={() => setSideFilter("All")} />
      )}
      {positionFilter.map((p) => (
        <Tag key={p} label={p} onRemove={() => togglePosition(p)} />
      ))}
      {query && (
        <Tag label={`"${query.slice(0, 16)}"`} onRemove={() => setQuery("")} />
      )}
      <button
        onClick={() => {
          setSideFilter("All");
          positionFilter.slice().forEach(togglePosition);
          setQuery("");
        }}
        style={{
          fontFamily: BODY,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: T.muted,
          textDecoration: "underline",
          textUnderlineOffset: 3,
          background: "none",
          border: 0,
          cursor: "pointer",
        }}
      >
        Clear all
      </button>
    </div>
  );
}

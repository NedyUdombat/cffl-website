import { T, DISPLAY } from "./tokens";

export function EmptyState() {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${T.line}`,
        borderRadius: 14,
        textAlign: "center",
        padding: "60px 20px",
        color: T.muted,
      }}
    >
      <h3
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 28,
          textTransform: "uppercase",
          color: T.ink,
          margin: "0 0 8px",
        }}
      >
        No players match
      </h3>
      <p style={{ margin: 0 }}>Try clearing a filter or widening your search.</p>
    </div>
  );
}

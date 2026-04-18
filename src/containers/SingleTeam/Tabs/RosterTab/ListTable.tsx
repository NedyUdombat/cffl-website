import Image from "next/image";
import type { RosterEntry } from "@/queries/teams/useFetchRosterEntries";
import { T, DISPLAY, MONO, BODY, getSide } from "./tokens";
import { EmptyState } from "./EmptyState";

export function ListTable({
  entries,
  sort,
  setSort,
}: {
  entries: RosterEntry[];
  sort: { key: string; dir: "asc" | "desc" };
  setSort: (s: { key: string; dir: "asc" | "desc" }) => void;
}) {
  if (!entries.length) return <EmptyState />;

  const cols = [
    { key: "number", label: "#", align: "num" as const, width: 70 },
    { key: "name", label: "Player", align: "left" as const },
    { key: "positions", label: "Pos", align: "left" as const },
    { key: "side", label: "Side", align: "left" as const },
  ];

  const setSortCol = (key: string) => {
    if (sort.key === key) setSort({ key, dir: sort.dir === "asc" ? "desc" : "asc" });
    else setSort({ key, dir: "asc" });
  };

  const arrow = (col: string) => {
    if (sort.key !== col) return "↕";
    return sort.dir === "asc" ? "↑" : "↓";
  };

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${T.line}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(10,10,15,0.04)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {cols.map((c) => (
              <th
                key={c.key}
                onClick={() => setSortCol(c.key)}
                style={{
                  textAlign: c.align === "num" ? "right" : "left",
                  fontFamily: BODY,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: sort.key === c.key ? T.ink : T.muted,
                  padding: "14px 16px",
                  borderBottom: `1px solid ${T.line}`,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  userSelect: "none",
                  width: c.width,
                }}
              >
                {c.label}
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: 4,
                    fontFamily: MONO,
                    fontSize: 9,
                    color: sort.key === c.key ? T.ink : T.muted2,
                  }}
                >
                  {arrow(c.key)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const firstName = entry.player?.firstName ?? "";
            const lastName = entry.player?.lastName ?? "";
            const displayName =
              entry.jerseyName || `${firstName} ${lastName}`.trim() || "—";
            const number = entry.jerseyNumber ?? 0;
            const positions = entry.positions ?? [];
            const photo = entry.player?.photo;
            const isCaptain = entry.isCaptain ?? false;
            const side = getSide(positions);
            const initials =
              `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";

            const sideColor =
              side === "Offense"
                ? T.accent
                : side === "Defense"
                  ? "#d4af37"
                  : T.muted;

            return (
              <tr
                key={entry._id}
                style={{
                  background: isCaptain ? T.accentTint2 : "transparent",
                  cursor: "pointer",
                  transition: "background 0.12s",
                }}
                onMouseEnter={(e) => {
                  if (!isCaptain)
                    (e.currentTarget as HTMLTableRowElement).style.background = "#fafbfc";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background = isCaptain
                    ? T.accentTint2
                    : "transparent";
                }}
              >
                {/* Jersey # */}
                <td
                  style={{
                    textAlign: "right",
                    padding: "12px 16px",
                    borderBottom: `1px solid ${T.line2}`,
                    fontFamily: MONO,
                    fontSize: 13,
                    fontWeight: 700,
                    color: T.ink,
                  }}
                >
                  {String(number).padStart(2, "0")}
                </td>

                {/* Player */}
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${T.line2}`,
                    verticalAlign: "middle",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Avatar */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #1c1d20, #0f1012)",
                        display: "grid",
                        placeItems: "center",
                        fontFamily: DISPLAY,
                        fontWeight: 900,
                        fontStyle: "italic",
                        fontSize: 13,
                        color: "#fff",
                        flexShrink: 0,
                        position: "relative",
                        overflow: "hidden",
                        border: isCaptain ? `2px solid ${T.accent}` : "none",
                      }}
                    >
                      {photo ? (
                        <Image
                          src={photo}
                          alt={displayName}
                          fill
                          sizes="36px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span style={{ position: "relative", zIndex: 1 }}>{initials}</span>
                      )}
                      {!photo && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "radial-gradient(70% 50% at 50% 110%, rgba(237,50,55,0.4), transparent 60%)",
                          }}
                        />
                      )}
                    </div>
                    {/* Name */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div
                        style={{
                          fontFamily: BODY,
                          fontSize: 13,
                          fontWeight: 600,
                          color: T.ink,
                          letterSpacing: "-0.005em",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {displayName}
                        {isCaptain && (
                          <span
                            style={{
                              background: T.accent,
                              color: "#fff",
                              padding: "1px 5px",
                              borderRadius: 3,
                              fontSize: 9,
                              fontWeight: 800,
                              letterSpacing: "0.12em",
                              fontFamily: BODY,
                            }}
                          >
                            CAPT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Positions */}
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${T.line2}`,
                    verticalAlign: "middle",
                  }}
                >
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {positions.map((pos, i) => (
                      <span
                        key={pos}
                        style={{
                          height: 18,
                          padding: "0 5px",
                          display: "inline-flex",
                          alignItems: "center",
                          background: i === 0 ? T.ink : T.line2,
                          color: i === 0 ? "#fff" : T.ink,
                          borderRadius: 3,
                          fontFamily: MONO,
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {pos}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Side */}
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: `1px solid ${T.line2}`,
                    fontFamily: MONO,
                    fontSize: 11,
                    fontWeight: 700,
                    color: sideColor,
                    letterSpacing: "0.04em",
                  }}
                >
                  {side.toUpperCase()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

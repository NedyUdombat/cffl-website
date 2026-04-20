import Image from "next/image";
import type { RosterEntry } from "@/queries/teams/useFetchRosterEntries";
import { T, DISPLAY, MONO, BODY, getSide } from "@/styles/tokens";
import { EmptyState } from "./EmptyState";

export function CardGrid({ entries }: { entries: RosterEntry[] }) {
  if (!entries.length) return <EmptyState />;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 14,
      }}
    >
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
        const isOffense = side === "Offense" || side === "Both";

        const portraitBg = isOffense
          ? `radial-gradient(120% 80% at 50% 110%, rgba(237,50,55,0.35), transparent 60%), linear-gradient(180deg, #1c1d20 0%, #0f1012 100%)`
          : `radial-gradient(120% 80% at 50% 110%, rgba(212,175,55,0.22), transparent 60%), linear-gradient(180deg, #1c1d20 0%, #0f1012 100%)`;

        return (
          <div
            key={entry._id}
            tabIndex={0}
            style={{
              background: "#fff",
              border: `1px solid ${T.line}`,
              borderRadius: 14,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 10px 30px rgba(10,10,15,0.08)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#d4d6db";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "none";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              (e.currentTarget as HTMLDivElement).style.borderColor = T.line;
            }}
          >
            {/* Portrait */}
            <div
              style={{
                aspectRatio: "1 / 1.05",
                position: "relative",
                background: portraitBg,
                overflow: "hidden",
              }}
            >
              {/* Diagonal stripe texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 10px, rgba(255,255,255,0) 10px 22px)",
                }}
              />

              {/* Jersey number */}
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  top: 14,
                  fontFamily: DISPLAY,
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontSize: 72,
                  lineHeight: 0.85,
                  color: "#fff",
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 10,
                    fontStyle: "normal",
                    letterSpacing: "0.22em",
                    color: "#a9adb5",
                    fontFamily: BODY,
                    fontWeight: 700,
                    marginBottom: -2,
                  }}
                >
                  NO.
                </span>
                {String(number).padStart(2, "0")}
              </div>

              {/* Captain pin */}
              {isCaptain && (
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    background: T.accent,
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    padding: "3px 7px",
                    borderRadius: 4,
                    zIndex: 2,
                    fontFamily: BODY,
                  }}
                >
                  CAPT
                </div>
              )}

              {/* Photo or silhouette */}
              {photo ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "65%",
                    height: "75%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={photo}
                    alt={displayName}
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              ) : (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 0,
                      transform: "translateX(-50%)",
                      width: "75%",
                      height: "85%",
                      background: `radial-gradient(ellipse 35% 20% at 50% 20%, #0a0a0b 60%, transparent 62%), radial-gradient(ellipse 55% 45% at 50% 70%, #0a0a0b 60%, transparent 62%)`,
                      opacity: 0.55,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      fontFamily: MONO,
                      fontSize: 9,
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    // photo
                  </div>
                </>
              )}
            </div>

            {/* Body */}
            <div
              style={{
                padding: "14px",
                borderTop: `1px solid ${T.line}`,
              }}
            >
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontStyle: "italic",
                  fontSize: 20,
                  lineHeight: 1,
                  textTransform: "uppercase",
                  color: T.ink,
                  marginBottom: 6,
                }}
              >
                {displayName}
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {positions.map((pos, i) => (
                  <span
                    key={pos}
                    style={{
                      height: 20,
                      padding: "0 7px",
                      display: "inline-flex",
                      alignItems: "center",
                      background: i === 0 ? T.ink : T.line2,
                      borderRadius: 4,
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 700,
                      color: i === 0 ? "#fff" : T.ink,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {pos}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

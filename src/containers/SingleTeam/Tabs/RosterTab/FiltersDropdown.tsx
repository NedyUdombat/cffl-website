"use client";

import { useEffect, useRef, useState } from "react";
import { T, BODY, MONO, ALL_POSITIONS } from "./tokens";
import { IconCaret } from "./icons";

export function FiltersDropdown({
  positionFilter,
  togglePosition,
  sideFilter,
  setSideFilter,
  counts,
  onClearAll,
}: {
  positionFilter: string[];
  togglePosition: (p: string) => void;
  sideFilter: string;
  setSideFilter: (s: string) => void;
  counts: Record<string, number>;
  onClearAll: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeCount = (sideFilter !== "All" ? 1 : 0) + positionFilter.length;

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          height: 40,
          padding: "0 12px",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          border: `1px solid ${open || activeCount > 0 ? T.ink : T.line}`,
          borderRadius: 10,
          background: open ? "#fff" : T.surface2,
          fontFamily: BODY,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: T.ink,
          cursor: "pointer",
          whiteSpace: "nowrap",
          boxShadow: open ? `0 0 0 3px rgba(10,10,15,0.06)` : "none",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M1.5 2.5h9l-3.4 4v3l-2.2 1v-4z" />
        </svg>
        <span>Filters</span>
        {activeCount > 0 && (
          <span
            style={{
              display: "inline-grid",
              placeItems: "center",
              minWidth: 18,
              height: 18,
              padding: "0 5px",
              background: T.accent,
              color: "#fff",
              borderRadius: 999,
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            {activeCount}
          </span>
        )}
        <span style={{ color: T.muted, display: "inline-flex" }}>
          <IconCaret />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Filters"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width: 300,
            background: "#fff",
            border: `1px solid ${T.line}`,
            borderRadius: 12,
            boxShadow: "0 20px 40px rgba(10,10,15,0.12), 0 2px 6px rgba(10,10,15,0.06)",
            zIndex: 50,
            overflow: "hidden",
            animation: "ddIn 0.14s ease-out",
          }}
        >
          <style>{`@keyframes ddIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>

          {/* Head */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              borderBottom: `1px solid ${T.line2}`,
              fontFamily: BODY,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: T.muted,
            }}
          >
            <span>Filter roster</span>
            {activeCount > 0 && (
              <button
                onClick={onClearAll}
                style={{
                  fontFamily: BODY,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: T.accent,
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            )}
          </div>

          {/* Side section */}
          <div style={{ padding: "10px 8px", borderBottom: `1px solid ${T.line2}` }}>
            <div
              style={{
                padding: "4px 10px 8px",
                fontFamily: BODY,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: T.muted2,
              }}
            >
              Side
            </div>
            {["All", "Offense", "Defense", "Captains"].map((s) => (
              <label
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: sideFilter === s ? T.accentTint2 : "transparent",
                  fontFamily: BODY,
                  fontSize: 13,
                  color: T.ink,
                }}
              >
                <input
                  type="radio"
                  name="side"
                  checked={sideFilter === s}
                  onChange={() => setSideFilter(s)}
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: `1.5px solid ${sideFilter === s ? T.accent : T.line}`,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    background:
                      sideFilter === s
                        ? `radial-gradient(circle, ${T.accent} 45%, #fff 50%)`
                        : "transparent",
                  }}
                />
                <span style={{ flex: 1, fontWeight: 500 }}>{s}</span>
                {s !== "All" && (
                  <span style={{ fontFamily: MONO, fontSize: 10, color: T.muted }}>
                    {counts[s] ?? 0}
                  </span>
                )}
              </label>
            ))}
          </div>

          {/* Position section */}
          <div style={{ padding: "10px 8px" }}>
            <div
              style={{
                padding: "4px 10px 8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: BODY,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: T.muted2,
              }}
            >
              <span>Position</span>
              {positionFilter.length > 0 && (
                <button
                  onClick={() => positionFilter.slice().forEach(togglePosition)}
                  style={{
                    fontFamily: BODY,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: T.muted,
                    background: "none",
                    border: 0,
                    cursor: "pointer",
                  }}
                >
                  Clear ({positionFilter.length})
                </button>
              )}
            </div>
            {ALL_POSITIONS.map((p) => {
              const checked = positionFilter.includes(p);
              return (
                <label
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: checked ? T.accentTint2 : "transparent",
                    fontFamily: BODY,
                    fontSize: 13,
                    color: T.ink,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePosition(p)}
                    style={{ display: "none" }}
                  />
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      border: `1.5px solid ${checked ? T.ink : T.line}`,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      background: checked ? T.ink : "transparent",
                      color: "#fff",
                    }}
                  >
                    {checked && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 5.2l2 2 4-4.4" />
                      </svg>
                    )}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontWeight: 500,
                      fontFamily: MONO,
                      fontSize: 12,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: `1px solid ${T.line2}`,
              background: T.surface2,
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                width: "100%",
                height: 36,
                background: T.ink,
                color: "#fff",
                borderRadius: 8,
                fontFamily: BODY,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                border: 0,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

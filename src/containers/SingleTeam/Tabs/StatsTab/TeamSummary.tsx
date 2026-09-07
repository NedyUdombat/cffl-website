import { useMemo } from "react";
import { CATEGORIES } from "./categories";
import { getDisplayName } from "./helpers";
import type { Category, PlayerStatRow } from "./types";

// ── Design tokens (matches tokens.css) ───────────────────────────────────────
const CHART_COLORS: Record<Category, string> = {
  passing: "#34a853", // --color-win
  receiving: "#3b82f6", // --color-info
  defense: "#f59e0b", // --color-warning
};

const SEGMENT_PALETTES: Record<Category, [string, string, string]> = {
  passing: ["#34a853", "#71c98e", "#b2e4c4"],
  receiving: ["#3b82f6", "#7eb3f9", "#bcd4fc"],
  defense: ["#f59e0b", "#f9bf5a", "#fcd98e"],
};

// ── Donut geometry ────────────────────────────────────────────────────────────
const R = 40;
const CIRC = 2 * Math.PI * R; // ≈ 251.33

// ── Single-segment Donut ──────────────────────────────────────────────────────
function DonutChart({
  pct,
  color,
  centerLabel,
  centerSub,
  footnote,
}: {
  pct: number;
  color: string;
  centerLabel: string;
  centerSub?: string;
  footnote: string;
}) {
  const dash = Math.max(0, Math.min(1, pct)) * CIRC;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 100 100"
        width={116}
        height={116}
        role="img"
        aria-label={`${centerLabel} ${footnote}`}
      >
        {/* Track */}
        <circle cx="50" cy="50" r={R} fill="none" stroke="#e7e8eb" strokeWidth="10" />
        {/* Progress arc */}
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${dash} ${CIRC}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        {/* Center: primary value */}
        <text
          x="50"
          y="45"
          textAnchor="middle"
          fontFamily="'Barlow Condensed', 'Oswald', sans-serif"
          fontWeight="700"
          fontSize="20"
          fill="#0a0a0b"
        >
          {centerLabel}
        </text>
        {/* Center: sub-label */}
        {centerSub && (
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="7.5"
            fill="#6b7280"
            letterSpacing="0.08em"
          >
            {centerSub}
          </text>
        )}
      </svg>
      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.14em] text-center leading-tight">
        {footnote}
      </p>
    </div>
  );
}

// ── Multi-segment Donut (target share) ────────────────────────────────────────
interface Segment {
  value: number; // proportion 0–1
  color: string;
  name: string;
}

function MultiDonut({
  segments,
  centerLabel,
  centerSub,
  footnote,
}: {
  segments: Segment[];
  centerLabel: string;
  centerSub?: string;
  footnote: string;
}) {
  // Build arcs with cumulative offsets
  let cumulativeOffset = 0;
  const arcs = segments.map((seg) => {
    const dash = Math.max(0, Math.min(1, seg.value)) * CIRC;
    const arc = { ...seg, dash, offset: cumulativeOffset };
    cumulativeOffset += dash;
    return arc;
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 100 100"
        width={116}
        height={116}
        role="img"
        aria-label={`${footnote}: ${segments.map((s) => `${s.name} ${Math.round(s.value * 100)}%`).join(", ")}`}
      >
        {/* Track */}
        <circle cx="50" cy="50" r={R} fill="none" stroke="#e7e8eb" strokeWidth="10" />
        {/* Segments — rendered back-to-front so first is on top at 12 o'clock */}
        {arcs.map((arc, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length stable array
          <circle
            key={i}
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={arc.color}
            strokeWidth="10"
            strokeDasharray={`${arc.dash} ${CIRC}`}
            strokeDashoffset={-arc.offset}
            transform="rotate(-90 50 50)"
          />
        ))}
        {/* Center: primary label */}
        <text
          x="50"
          y="45"
          textAnchor="middle"
          fontFamily="'Barlow Condensed', 'Oswald', sans-serif"
          fontWeight="700"
          fontSize="20"
          fill="#0a0a0b"
        >
          {centerLabel}
        </text>
        {centerSub && (
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', ui-monospace, monospace"
            fontSize="7.5"
            fill="#6b7280"
            letterSpacing="0.08em"
          >
            {centerSub}
          </text>
        )}
      </svg>

      {/* Receiver legend */}
      <div className="flex flex-col gap-1 w-full">
        {segments.map((seg) => (
          <div key={seg.name} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: seg.color }}
              aria-hidden
            />
            <span className="font-mono text-[9px] text-muted flex-1 truncate">{seg.name}</span>
            <span className="font-mono text-[9px] font-semibold text-ink tabular-nums">
              {Math.round(seg.value * 100)}%
            </span>
          </div>
        ))}
      </div>

      <p className="font-mono text-[10px] text-muted uppercase tracking-[0.14em] text-center leading-tight">
        {footnote}
      </p>
    </div>
  );
}

// ── Stat Pair (bold number + label + avg) ─────────────────────────────────────
function StatPair({
  value,
  label,
  sub,
  accentClass,
}: {
  value: string | number;
  label: string;
  sub?: string;
  accentClass?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span
        className={`font-display font-bold text-4xl leading-none tabular-nums ${accentClass ?? "text-ink"}`}
      >
        {value}
      </span>
      <span className="font-inter text-[11px] font-medium text-muted uppercase tracking-[0.08em] leading-tight truncate">
        {label}
      </span>
      {sub && <span className="font-mono text-[9px] text-muted-2 leading-tight">{sub}</span>}
    </div>
  );
}

// ── Summary data builder ───────────────────────────────────────────────────────
type SummaryData =
  | {
      kind: "single";
      donut: { pct: number; color: string; centerLabel: string; centerSub?: string; footnote: string };
      stats: { value: string | number; label: string; sub?: string; accentClass?: string }[];
    }
  | {
      kind: "multi";
      multiDonut: { segments: Segment[]; centerLabel: string; centerSub?: string; footnote: string };
      stats: { value: string | number; label: string; sub?: string; accentClass?: string }[];
    };

function buildSummary(
  rows: PlayerStatRow[],
  category: Category,
  color: string,
  palette: [string, string, string],
  accentColor: string,
): SummaryData {
  const teamGames = rows.length > 0 ? Math.max(...rows.map((r) => r.gamesPlayed), 1) : 1;
  const avg = (n: number) => (n / teamGames).toFixed(1);

  if (category === "passing") {
    const att = rows.reduce((s, r) => s + r.passAttempts, 0);
    const cmp = rows.reduce((s, r) => s + r.passCompletions, 0);
    const tds = rows.reduce((s, r) => s + r.passTds, 0);
    const ints = rows.reduce((s, r) => s + r.interceptionsThrown, 0);
    const pct = att > 0 ? cmp / att : 0;
    return {
      kind: "single",
      donut: {
        pct,
        color,
        centerLabel: `${Math.round(pct * 100)}%`,
        centerSub: "CMP%",
        footnote: "Completion Rate",
      },
      stats: [
        { value: att, label: "Pass Attempts", sub: `${avg(att)} avg / game` },
        { value: cmp, label: "Completions", sub: `${avg(cmp)} avg / game` },
        { value: tds, label: "Passing TDs", sub: `${avg(tds)} avg / game`, accentClass: accentColor },
        { value: ints, label: "Interceptions" },
        { value: teamGames, label: "Games Played" },
      ],
    };
  }

  if (category === "receiving") {
    const tgts = rows.reduce((s, r) => s + r.targets, 0);
    const recs = rows.reduce((s, r) => s + r.catches, 0);
    const tds = rows.reduce((s, r) => s + r.passTds, 0);
    const drops = rows.reduce((s, r) => s + r.drops, 0);
    const top3 = [...rows].sort((a, b) => b.targets - a.targets).slice(0, 3);
    const segments: Segment[] = top3
      .filter((r) => r.targets > 0 && tgts > 0)
      .map((r, i) => ({
        value: r.targets / tgts,
        color: palette[i],
        // Last name or full fallback
        name: getDisplayName(r).split(" ").pop() ?? getDisplayName(r),
      }));
    const top3Share = segments.reduce((s, seg) => s + seg.value, 0);
    return {
      kind: "multi",
      multiDonut: {
        segments,
        centerLabel: `${Math.round(top3Share * 100)}%`,
        centerSub: "TOP 3",
        footnote: "Target Share",
      },
      stats: [
        { value: tgts, label: "Total Targets", sub: `${avg(tgts)} avg / game` },
        { value: recs, label: "Receptions", sub: `${avg(recs)} avg / game` },
        { value: tds, label: "Receiving TDs", sub: `${avg(tds)} avg / game`, accentClass: accentColor },
        { value: drops, label: "Drops" },
        { value: teamGames, label: "Games Played" },
      ],
    };
  }

  // defense
  const sacks = rows.reduce((s, r) => s + r.sacks, 0);
  const ints = rows.reduce((s, r) => s + r.interceptions, 0);
  const fp = rows.reduce((s, r) => s + r.flagPulls, 0);
  const pickSix = rows.reduce((s, r) => s + r.interceptionTouchdowns, 0);
  const pbu = rows.reduce((s, r) => s + r.passBreakups, 0);
  const totalStops = fp + sacks + ints + pbu;
  const turnoverRate = totalStops > 0 ? (ints + sacks) / totalStops : 0;
  return {
    kind: "single",
    donut: {
      pct: turnoverRate,
      color,
      centerLabel: `${Math.round(turnoverRate * 100)}%`,
      centerSub: "TURNOVER",
      footnote: "Turnover Rate",
    },
    stats: [
      { value: sacks, label: "Sacks", sub: `${avg(sacks)} avg / game` },
      { value: ints, label: "Interceptions", sub: `${avg(ints)} avg / game` },
      { value: fp, label: "Flag Pulls", sub: `${avg(fp)} avg / game`, accentClass: accentColor },
      { value: pickSix, label: "Pick-6" },
      { value: teamGames, label: "Games Played" },
    ],
  };
}

// ── Main Component ─────────────────────────────────────────────────────────────
const TeamSummary = ({ rows, category }: { rows: PlayerStatRow[]; category: Category }) => {
  const activeCat = CATEGORIES.find((c) => c.id === category)!;
  const color = CHART_COLORS[category];
  const palette = SEGMENT_PALETTES[category];

  const summary = useMemo(
    () => buildSummary(rows, category, color, palette, activeCat.accentColor),
    [rows, category, color, palette, activeCat.accentColor],
  );

  return (
    <div className="bg-white border border-line rounded-2xl overflow-hidden shadow-sm">
      {/* ── Card header — mirrors the Leaderboard/Table header style ── */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-line-2 bg-surface-2">
        <span className={`w-1 h-5 rounded-full ${activeCat.borderAccent} shrink-0`} aria-hidden />
        <h3 className="font-mono font-semibold text-sm uppercase tracking-[0.14em] text-ink">
          Team Summary
        </h3>
        <span className="font-mono text-[10px] text-muted ml-auto">
          * Dummy data — stats not yet seeded
        </span>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-6 md:gap-10 items-start">
        {/* Donut chart area */}
        <div className="shrink-0">
          {summary.kind === "multi" ? (
            <MultiDonut {...summary.multiDonut} />
          ) : (
            <DonutChart {...summary.donut} />
          )}
        </div>

        {/* Vertical rule (desktop) */}
        <div className="hidden sm:block w-px self-stretch bg-line-2" aria-hidden />

        {/* Stats grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-5">
          {summary.stats.map((stat) => (
            <StatPair key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSummary;

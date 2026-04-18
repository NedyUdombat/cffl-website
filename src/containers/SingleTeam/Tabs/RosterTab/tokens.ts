/* ─── Position → side mapping ─── */
export const OFFENSIVE_POSITIONS = new Set(["QB", "WR", "RB", "C"]);
export const DEFENSIVE_POSITIONS = new Set(["CB", "S", "LB", "RSH"]);
export const ALL_POSITIONS = ["QB", "WR", "RB", "C", "CB", "S", "LB", "RSH"];

export function getSide(positions: string[]): "Offense" | "Defense" | "Both" {
  const hasOff = positions.some((p) => OFFENSIVE_POSITIONS.has(p));
  const hasDef = positions.some((p) => DEFENSIVE_POSITIONS.has(p));
  if (hasOff && hasDef) return "Both";
  if (hasOff) return "Offense";
  if (hasDef) return "Defense";
  return "Offense";
}

/* ─── Fonts ─── */
export const DISPLAY = "'Barlow Condensed', 'Oswald', Impact, sans-serif";
export const MONO = "'JetBrains Mono', 'Fira Mono', ui-monospace, Menlo, monospace";
export const BODY = "Inter, ui-sans-serif, system-ui, sans-serif";

/* ─── Design tokens ─── */
export const T = {
  bg: "#f3f4f6",
  surface: "#ffffff",
  surface2: "#fafafa",
  ink: "#0a0a0b",
  ink2: "#1a1b1e",
  muted: "#6b7280",
  muted2: "#9aa0aa",
  line: "#e7e8eb",
  line2: "#eff0f2",
  accent: "#ED3237",
  accentTint: "#fce8ea",
  accentTint2: "#fdf2f3",
};

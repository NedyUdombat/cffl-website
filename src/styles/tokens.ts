// src/styles/tokens.ts
// TS mirror of src/styles/tokens.css @theme values.
// Use for inline styles where Tailwind classes can't be applied.
// Keep values in sync with tokens.css.

/* ─── Font families ─── */
export const DISPLAY = "'Barlow Condensed', 'Oswald', Impact, sans-serif";
export const MONO = "'JetBrains Mono', 'Fira Mono', ui-monospace, Menlo, monospace";
export const BODY = "'DM Sans', 'Inter', ui-sans-serif, sans-serif";
export const MACHINE = "'ITC Machine Std', sans-serif";
export const INTER = "'Inter', ui-sans-serif, sans-serif";

/* ─── Design tokens ─── */
export const T = {
  // Brand
  accent: "#ED3237",
  accentTint: "#fce8ea",
  accentTint2: "#fdf2f3",
  gold: "#d4af37",

  // Surfaces
  bg: "#f3f4f6",
  bg2: "#f0f2f5",
  surface: "#ffffff",
  surface2: "#fafafa",

  // Ink
  ink: "#0a0a0b",
  ink2: "#1a1b1e",
  muted: "#6b7280",
  muted2: "#9aa0aa",

  // Borders
  line: "#e7e8eb",
  line2: "#eff0f2",

  // Semantic
  win: "#34a853",
  loss: "#e60023",
  tie: "#f59e0b",

  // Info
  info: "#3b82f6",
  infoTint: "#eff6ff",

  // Semantic aliases (for Button usage)
  warning: "#f59e0b", // same as tie
  warningTint: "#fffbeb",
  danger: "#e60023", // same as loss
  dangerTint: "#fff1f2",
} as const;

/* ─── Position colors (dynamic — not in @theme, applied via inline styles) ─── */
export const POSITION_COLORS: Record<string, string> = {
  QB: "#1d4ed8",
  WR: "#15803d",
  RB: "#0f766e",
  TE: "#0f766e",
  CB: "#b91c1c",
  LB: "#b45309",
  S: "#7c3aed",
  DE: "#c2410c",
  C: "#be185d",
  OL: "#374151",
  DL: "#1e3a5f",
  K: "#6b21a8",
};

/* ─── Position sets ─── */
export const OFFENSIVE_POSITIONS = new Set(["QB", "WR", "RB", "C"]);
export const DEFENSIVE_POSITIONS = new Set(["CB", "S", "LB", "RSH"]);
export const ALL_POSITIONS = ["QB", "WR", "RB", "C", "CB", "S", "LB", "RSH"];

export const GENDER = [
  {
    value: "male",
    label: "Male",
    abbr: "M",
  },
  {
    value: "female",
    label: "Female",
    abbr: "F",
  },
];

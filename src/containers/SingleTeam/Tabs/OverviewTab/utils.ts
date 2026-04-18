const TEAM_COLOR_PALETTE = [
  "#1d4ed8", "#15803d", "#b91c1c", "#7c3aed", "#c2410c",
  "#0f766e", "#b45309", "#1e40af", "#065f46", "#9f1239",
  "#1a56db", "#0694a2", "#d61f69", "#6875f5", "#e3a008",
];

/** Deterministic color from a string — no images needed */
export function teamColor(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0x7fffffff;
  return TEAM_COLOR_PALETTE[h % TEAM_COLOR_PALETTE.length];
}

/** Format ISO date as "APR 12" */
export function fmtDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();
}

/** 3-letter initials abbreviation from team name */
export function abbr3(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";

export function formatGender(g: Gender | null | undefined): string {
  if (!g || g === "prefer-not-to-say") return "—";
  const map: Record<Gender, string> = {
    male: "M",
    female: "F",
    "non-binary": "Non-binary",
    "prefer-not-to-say": "—",
  };
  return map[g];
}

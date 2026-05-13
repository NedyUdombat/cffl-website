export type Gender = "male" | "female";

export function formatGender(g: Gender | null | undefined): string {
  if (!g) return "—";
  const map: Record<Gender, string> = {
    male: "M",
    female: "F",
  };
  return map[g];
}

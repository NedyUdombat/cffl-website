import { useEffect, useMemo, useState } from "react";
import useFetchRosterEntries from "@/queries/players/useFetchRosterEntries";

interface UseRosterTabLogicProps {
  teamId: string;
  competitionId?: string;
}
const useRosterTabLogic = ({ teamId, competitionId }: UseRosterTabLogicProps) => {
  const { data: roster, isPending } = useFetchRosterEntries({
    team: teamId,
    competition: competitionId,
    enabled: !!teamId,
  });

  const [query, setQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [positionFilter, setPositionFilter] = useState<string[]>([]);
  const [view, setView] = useState<"card" | "list">(() => {
    if (typeof window === "undefined") return "card";
    const stored = localStorage.getItem("roster-view");
    return stored === "list" ? "list" : "card";
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const togglePosition = (p: string) => {
    setPositionFilter((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
    setPage(1);
  };

  useEffect(() => {
    localStorage.setItem("roster-view", view);
  }, [view]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Whenever any filter changes → reset to page 1
  useEffect(() => {
    setPage(1);
  }, [query, genderFilter, positionFilter, view]);

  const filtered = useMemo(() => {
    let list = roster.slice();

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((e) => {
        const name = (
          e.jerseyName || `${e.player?.firstName ?? ""} ${e.player?.lastName ?? ""}`.trim()
        ).toLowerCase();
        const num = String(e.jerseyNumber ?? "");
        const pos = (e.positions ?? []).some((p) => p.toLowerCase().includes(q));
        return name.includes(q) || num.includes(q) || pos;
      });
    }

    if (genderFilter) {
      list = list.filter((e) => genderFilter === e.player?.gender);
    }

    if (positionFilter.length > 0) {
      list = list.filter((e) => (e.positions ?? []).some((p) => positionFilter.includes(p)));
    }

    return list;
  }, [roster, query, genderFilter, positionFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * perPage;
  const endIdx = Math.min(startIdx + perPage, total);
  const paged = filtered.slice(startIdx, endIdx);

  return {
    query,
    setQuery,
    positionFilter,
    setPositionFilter,
    view,
    setView,
    page,
    setPage,
    perPage,
    setPerPage,
    filtered,
    total,
    totalPages,
    safePage,
    startIdx,
    endIdx,
    paged,
    togglePosition,
    isPending,
    roster,
    genderFilter,
    setGenderFilter,
  };
};

export default useRosterTabLogic;

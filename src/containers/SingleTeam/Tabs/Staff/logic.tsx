import { useEffect, useMemo, useState } from "react";
import useFetchStaffs from "@/queries/staffs/useFetchStaffs";

interface UseStaffTabProps {
  teamId: string;
}

const useStaffTab = ({ teamId }: UseStaffTabProps) => {
  const { data: staffs, isPending } = useFetchStaffs({
    team: teamId,
    enabled: !!teamId,
  });

  const [query, setQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [view, setView] = useState<"card" | "list">(() => {
    if (typeof window === "undefined") return "card";
    const stored = localStorage.getItem("staff-view");
    return stored === "list" ? "list" : "card";
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  useEffect(() => {
    localStorage.setItem("staff-view", view);
  }, [view]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Whenever any filter changes → reset to page 1
  useEffect(() => {
    setPage(1);
  }, [query, genderFilter, view]);

  const filtered = useMemo(() => {
    let list = staffs.slice();

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((e) => {
        const name = `${e?.firstName ?? ""} ${e?.lastName ?? ""}`.trim().toLowerCase();

        return name.includes(q);
      });
    }

    if (genderFilter) {
      list = list.filter((e) => e.gender === genderFilter);
    }

    return list;
  }, [query, genderFilter, staffs]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * perPage;
  const endIdx = Math.min(startIdx + perPage, total);
  const paged = filtered.slice(startIdx, endIdx);

  return {
    staffs: paged,
    isPending,
    query,
    setQuery,
    genderFilter,
    setGenderFilter,
    view,
    setView,
    page,
    setPage,
    perPage,
    setPerPage,
    total,
    totalPages,
    safePage,
    startIdx,
    endIdx,
    paged,
  };
};

export default useStaffTab;

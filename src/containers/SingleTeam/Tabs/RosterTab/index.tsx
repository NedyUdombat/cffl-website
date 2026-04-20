"use client";

import { useEffect, useMemo, useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiViewList } from "react-icons/hi";
import { MdClear } from "react-icons/md";
import { PiListBold } from "react-icons/pi";
import { RiSearchLine } from "react-icons/ri";
import useFetchRosterEntries from "@/queries/teams/useFetchRosterEntries";
import { ActiveFiltersStrip } from "./ActiveFiltersStrip";
import { CardGrid } from "./CardGrid";
import { FiltersDropdown } from "./FiltersDropdown";
import { ListTable } from "./ListTable";
import OrientationToggle from "./OrientationToggle";
import { Pagination } from "./Pagination";
import { RosterSkeleton } from "./RosterSkeleton";
import { BODY, DISPLAY, getSide, MONO, T } from "@/styles/tokens";

export function RosterTab({ teamId, competitionId }: { teamId: string; competitionId?: string }) {
  const { data: roster, isPending } = useFetchRosterEntries({
    team: teamId,
    competition: competitionId,
    enabled: !!teamId,
  });

  const [query, setQuery] = useState("");
  const [sideFilter, setSideFilter] = useState("All");
  const [positionFilter, setPositionFilter] = useState<string[]>([]);
  const [view, setView] = useState<"card" | "list">("card");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({
    key: "number",
    dir: "asc",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const togglePosition = (p: string) => {
    setPositionFilter((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
    setPage(1);
  };

  const sideCounts = useMemo(
    () => ({
      Offense: roster.filter((e) => {
        const s = getSide(e.positions ?? []);
        return s === "Offense" || s === "Both";
      }).length,
      Defense: roster.filter((e) => {
        const s = getSide(e.positions ?? []);
        return s === "Defense" || s === "Both";
      }).length,
      Captains: roster.filter((e) => e.isCaptain).length,
    }),
    [roster]
  );

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

    if (sideFilter === "Offense") {
      list = list.filter((e) => {
        const s = getSide(e.positions ?? []);
        return s === "Offense" || s === "Both";
      });
    } else if (sideFilter === "Defense") {
      list = list.filter((e) => {
        const s = getSide(e.positions ?? []);
        return s === "Defense" || s === "Both";
      });
    } else if (sideFilter === "Captains") {
      list = list.filter((e) => e.isCaptain);
    }

    if (positionFilter.length > 0) {
      list = list.filter((e) => (e.positions ?? []).some((p) => positionFilter.includes(p)));
    }

    list.sort((a, b) => {
      const k = sort.key;
      let av: string | number = 0;
      let bv: string | number = 0;
      if (k === "number") {
        av = a.jerseyNumber ?? 0;
        bv = b.jerseyNumber ?? 0;
      } else if (k === "name") {
        av = (
          a.jerseyName || `${a.player?.firstName ?? ""} ${a.player?.lastName ?? ""}`.trim()
        ).toLowerCase();
        bv = (
          b.jerseyName || `${b.player?.firstName ?? ""} ${b.player?.lastName ?? ""}`.trim()
        ).toLowerCase();
      } else if (k === "positions") {
        av = (a.positions ?? [])[0]?.toLowerCase() ?? "";
        bv = (b.positions ?? [])[0]?.toLowerCase() ?? "";
      } else if (k === "side") {
        av = getSide(a.positions ?? []).toLowerCase();
        bv = getSide(b.positions ?? []).toLowerCase();
      }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [roster, query, sideFilter, positionFilter, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * perPage;
  const endIdx = Math.min(startIdx + perPage, total);
  const paged = filtered.slice(startIdx, endIdx);

  return (
    <section className="bg-[#f0f2f5]">
      <div className="max-w-[1440px] mx-auto py-8  px-6 md:px-14 lg:px-20">
        {/* Toolbar */}
        <div
          style={{
            background: "#fff",
            border: `1px solid ${T.line}`,
            borderRadius: 14,
            padding: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            boxShadow: "0 1px 2px rgba(10,10,15,0.04)",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ flex: "1 1 260px", position: "relative", minWidth: 220 }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: T.muted2,
                pointerEvents: "none",
                display: "flex",
              }}
            >
              <RiSearchLine />
            </span>
            <input
              placeholder="Search by name, number, or position…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                height: 40,
                border: `1px solid ${T.line}`,
                borderRadius: 10,
                padding: "0 36px 0 36px",
                fontFamily: BODY,
                fontSize: 13,
                color: T.ink,
                background: T.surface2,
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.background = "#fff";
                e.target.style.borderColor = T.ink;
                e.target.style.boxShadow = "0 0 0 3px rgba(10,10,15,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.background = T.surface2;
                e.target.style.borderColor = T.line;
                e.target.style.boxShadow = "none";
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 24,
                  height: 24,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 6,
                  color: T.muted,
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                }}
                type="button"
              >
                <MdClear />
              </button>
            )}
          </div>

          {/* Filters */}
          <FiltersDropdown
            positionFilter={positionFilter}
            togglePosition={togglePosition}
            onClearAll={() => {
              setSideFilter("All");
              setPositionFilter([]);
              setQuery("");
            }}
          />

          {/* View toggle */}
          <OrientationToggle view={view} setView={setView} />
        </div>

        <div
          className="border border-red-500"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 20,
            // flexWrap: "wrap",
          }}
        >
          {/* Active filters strip */}
          <ActiveFiltersStrip
            sideFilter={sideFilter}
            setSideFilter={setSideFilter}
            positionFilter={positionFilter}
            togglePosition={togglePosition}
            query={query}
            setQuery={setQuery}
          />
          <div
            style={{
              fontFamily: BODY,
              fontSize: 12,
              color: T.muted,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: 8,
              marginLeft: "auto",
            }}
          >
            {isPending ? "Loading…" : `${roster.length} players`}
          </div>
        </div>

        {/* Content */}
        {isPending ? (
          <RosterSkeleton />
        ) : view === "card" ? (
          <CardGrid entries={paged} />
        ) : (
          <ListTable entries={paged} sort={sort} setSort={setSort} />
        )}

        {/* Pagination */}
        {!isPending && total > 0 && (
          <Pagination
            total={total}
            page={safePage}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        )}
      </div>
    </section>
  );
}

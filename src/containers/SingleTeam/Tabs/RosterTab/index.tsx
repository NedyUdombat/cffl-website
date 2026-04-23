"use client";

import { MdClear } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ActiveFiltersStrip } from "./ActiveFiltersStrip";
import { CardGrid } from "./CardGrid";
import { FiltersDropdown } from "./FiltersDropdown";
import { ListTable } from "./ListTable";
import useRosterTabLogic from "./logic";
import OrientationToggle from "./OrientationToggle";
import { Pagination } from "./Pagination";
import { RosterSkeleton } from "./RosterSkeleton";

interface RosterTabProps {
  teamId: string;
  competitionId?: string;
}

export function RosterTab({ teamId, competitionId }: RosterTabProps) {
  const {
    query,
    setQuery,
    positionFilter,
    setPositionFilter,
    view,
    setView,
    setPage,
    perPage,
    setPerPage,
    total,
    safePage,
    paged,
    togglePosition,
    isPending,
    roster,
    genderFilter,
    setGenderFilter,
  } = useRosterTabLogic({ teamId, competitionId });
  return (
    <section className="bg-bg-2">
      <div className="max-w-[1440px] mx-auto py-8  px-6 md:px-14 lg:px-20">
        {/* Toolbar */}
        <div className="bg-surface border border-line rounded-[14px] p-3 flex items-center gap-2.5 mb-4 shadow-subtle flex-wrap">
          {/* Search */}
          <div className="flex-[1_1_260px] min-w-[220px] relative">
            <Input
              placeholder="Search by name, number, or position…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              startIcon={<RiSearchLine className="w-4 h-4" />}
              className="pr-8"
            />
            {query && (
              <Button
                variant="icon"
                size="sm"
                icon={<MdClear className="w-4 h-4" />}
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
              />
            )}
          </div>

          {/* Filters */}
          <FiltersDropdown
            positionFilter={positionFilter}
            genderFilter={genderFilter}
            togglePosition={togglePosition}
            setGenderFilter={setGenderFilter}
            onClearAll={() => {
              setPositionFilter([]);
              setGenderFilter(null);
              setQuery("");
            }}
          />

          {/* View toggle */}
          <OrientationToggle view={view} setView={setView} />
        </div>

        <div className="flex flex-row items-center justify-between gap-6 mb-5">
          {/* Active filters strip */}
          <ActiveFiltersStrip
            positionFilter={positionFilter}
            genderFilter={genderFilter}
            togglePosition={togglePosition}
            setGenderFilter={setGenderFilter}
            query={query}
            setQuery={setQuery}
          />
          <div className="font-body text-xs text-muted tracking-wide-ui uppercase ml-auto">
            {isPending ? "Loading…" : `${roster.length} players`}
          </div>
        </div>

        {/* Content */}
        {isPending ? (
          <RosterSkeleton />
        ) : view === "card" ? (
          <CardGrid entries={paged} />
        ) : (
          <ListTable entries={paged} />
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

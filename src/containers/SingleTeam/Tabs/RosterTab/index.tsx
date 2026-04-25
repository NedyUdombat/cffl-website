import { MdClear } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { ActiveFiltersStrip } from "@/components/ActiveFiltersStrip";
import { Button } from "@/components/Button";
import { FiltersDropdown } from "@/components/FiltersDropdown";
import { Input } from "@/components/Input";
import OrientationToggle from "@/components/OrientationToggle";
import { Pagination } from "@/components/Pagination";
import { DataSkeleton } from "@/components/Skeletons";
import { ALL_POSITIONS, GENDER } from "@/styles/tokens";
import { CardGrid } from "./CardGrid";
import { ListTable } from "./ListTable";
import useRosterTabLogic from "./logic";

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

  const isAnyFilterActive = !!query || !!genderFilter || positionFilter.length > 0;

  return (
    <section className="bg-bg-2">
      <div className="max-w-[1440px] mx-auto py-8 px-6 md:px-14 lg:px-20">
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
            activeCount={(genderFilter ? 1 : 0) + positionFilter.length}
            onClearAll={() => {
              setPositionFilter([]);
              setGenderFilter(null);
              setQuery("");
            }}
            sections={[
              {
                label: "Gender",
                options: GENDER.map((g) => ({ label: g.label, value: g.value })),
                isSelected: (v) => v === genderFilter,
                onToggle: (v) => setGenderFilter((prev) => (prev === v ? null : v)),
              },
              {
                label: "Position",
                options: ALL_POSITIONS.map((p) => ({ label: p, value: p })),
                isSelected: (v) => positionFilter.includes(v),
                onToggle: togglePosition,
              },
            ]}
          />

          {/* View toggle */}
          <OrientationToggle view={view} setView={setView} />
        </div>

        <div className="flex flex-row items-center justify-between gap-6 mb-5">
          {/* Active filters strip */}
          <ActiveFiltersStrip
            filters={[
              ...(genderFilter
                ? [{ label: genderFilter, onRemove: () => setGenderFilter(null) }]
                : []),
              ...positionFilter.map((p) => ({ label: p, onRemove: () => togglePosition(p) })),
              ...(query
                ? [{ label: `"${query.slice(0, 16)}"`, onRemove: () => setQuery("") }]
                : []),
            ]}
            onClearAll={() => {
              positionFilter.slice().forEach(togglePosition);
              setQuery("");
              setGenderFilter(null);
            }}
          />
          <div className="font-body text-xs text-muted tracking-wide-ui uppercase ml-auto">
            {isPending
              ? "Loading…"
              : isAnyFilterActive
                ? `${total} players`
                : `${roster.length} players`}
          </div>
        </div>

        {/* Content */}
        {isPending ? (
          <DataSkeleton view={view} />
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

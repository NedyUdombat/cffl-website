import type { Dispatch, SetStateAction } from "react";
import { MdClear } from "react-icons/md";
import { Button } from "@/components/Button";

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="h-6 px-1.5 inline-flex items-center gap-1.5 bg-accent-tint text-accent border border-accent rounded-full text-[11px] font-bold tracking-label uppercase font-body">
      {label}
      <Button
        variant="icon"
        size="sm"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="w-4 h-4 rounded-full bg-accent/[0.14] text-accent text-2xs"
      >
        <MdClear />
      </Button>
    </span>
  );
}

export function ActiveFiltersStrip({
  positionFilter,
  togglePosition,
  query,
  setQuery,
  genderFilter,
  setGenderFilter,
}: {
  positionFilter: string[];
  togglePosition: (p: string) => void;
  query: string;
  setQuery: (q: string) => void;
  genderFilter: string;
  setGenderFilter: Dispatch<SetStateAction<string>>;
}) {
  const any = positionFilter.length > 0 || query || genderFilter;
  if (!any) return null;

  return (
    <div className="flex gap-2 items-center text-xs text-muted font-body">
      {genderFilter && <Tag label={genderFilter} onRemove={() => setGenderFilter(null)} />}
      {positionFilter.map((p) => (
        <Tag key={p} label={p} onRemove={() => togglePosition(p)} />
      ))}
      {query && <Tag label={`"${query.slice(0, 16)}"`} onRemove={() => setQuery("")} />}
      <Button
        variant="transparent"
        size="sm"
        onClick={() => {
          positionFilter.slice().forEach(togglePosition);
          setQuery("");
          setGenderFilter(null);
        }}
        className="text-xs uppercase tracking-wide-ui underline underline-offset-[3px]"
      >
        Clear all
      </Button>
    </div>
  );
}

import { MdClear } from "react-icons/md";
import { BODY } from "@/styles/tokens";

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="h-[26px] pr-[6px] pl-[10px] inline-flex items-center gap-1.5 bg-[#fce8ea] text-[#ED3237] rounded-full text-[11px] font-bold tracking-[0.1em] uppercase"
      style={{ fontFamily: BODY }}
    >
      {label}
      <button
        onClick={onRemove}
        className="w-4 h-4 rounded-full grid place-items-center bg-[rgba(237,50,55,0.14)] text-[#ED3237] border-0 cursor-pointer text-[10px]"
        type="button"
      >
        <MdClear />
      </button>
    </span>
  );
}

export function ActiveFiltersStrip({
  sideFilter,
  setSideFilter,
  positionFilter,
  togglePosition,
  query,
  setQuery,
}: {
  sideFilter: string;
  setSideFilter: (s: string) => void;
  positionFilter: string[];
  togglePosition: (p: string) => void;
  query: string;
  setQuery: (q: string) => void;
}) {
  const any = sideFilter !== "All" || positionFilter.length > 0 || query;
  if (!any) return null;

  return (
    <div
      className="flex gap-2 items-center text-[12px] text-[#6b7280]"
      style={{ fontFamily: BODY }}
    >
      {sideFilter !== "All" && <Tag label={sideFilter} onRemove={() => setSideFilter("All")} />}
      {positionFilter.map((p) => (
        <Tag key={p} label={p} onRemove={() => togglePosition(p)} />
      ))}
      {query && <Tag label={`"${query.slice(0, 16)}"`} onRemove={() => setQuery("")} />}
      <button
        onClick={() => {
          setSideFilter("All");
          positionFilter.slice().forEach(togglePosition);
          setQuery("");
        }}
        className="text-[11px] uppercase tracking-[0.14em] text-[#6b7280] underline underline-offset-[3px] bg-transparent border-0 cursor-pointer"
        style={{ fontFamily: BODY }}
        type="button"
      >
        Clear all
      </button>
    </div>
  );
}

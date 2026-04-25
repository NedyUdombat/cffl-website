import { MdClear } from "react-icons/md";
import { Button } from "@/components/Button";

export interface ActiveFilter {
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersStripProps {
  filters: ActiveFilter[];
  onClearAll: () => void;
}

function Tag({ label, onRemove }: ActiveFilter) {
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

export function ActiveFiltersStrip({ filters, onClearAll }: ActiveFiltersStripProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex gap-2 items-center text-xs text-muted font-body">
      {filters.map((f) => (
        <Tag key={f.label} label={f.label} onRemove={f.onRemove} />
      ))}
      <Button
        variant="transparent"
        size="sm"
        onClick={onClearAll}
        className="text-xs uppercase tracking-wide-ui underline underline-offset-[3px]"
      >
        Clear all
      </Button>
    </div>
  );
}

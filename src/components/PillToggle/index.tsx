import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Button from "../Button";

export interface PillToggleItem<T extends string = string> {
  value: T;
  label: ReactNode;
  /** Per-item active class — overrides the component-level activeClassName. */
  activeClassName?: string;
  ariaLabel?: string;
}

export interface PillToggleProps<T extends string = string> {
  items: PillToggleItem<T>[];
  value: T;
  onChange: (value: T) => void;
  containerClassName?: string;
  itemClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function PillToggle<T extends string = string>({
  items,
  value,
  onChange,
  containerClassName,
  itemClassName,
  activeClassName = "text-ink bg-surface shadow-raised",
  inactiveClassName = "text-muted bg-transparent",
}: PillToggleProps<T>) {
  return (
    <div
      className={cn(
        "flex bg-surface-2 border border-line rounded-lg p-1 gap-1 cursor-pointer",
        containerClassName
      )}
    >
      {items.map((item) => (
        <Button
          key={item.value}
          type="button"
          variant="transparent"
          onClick={() => onChange(item.value)}
          aria-label={item.ariaLabel}
          aria-pressed={value === item.value}
          className={cn(
            "px-3 font-bold uppercase rounded transition-colors cursor-pointer",
            itemClassName,
            value === item.value ? (item.activeClassName ?? activeClassName) : inactiveClassName
          )}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

export default PillToggle;

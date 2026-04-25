"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import { Button } from "@/components/Button";

export interface FilterSection {
  label: string;
  options: { label: string; value: string }[];
  isSelected: (value: string) => boolean;
  onToggle: (value: string) => void;
}

interface FiltersDropdownProps {
  sections: FilterSection[];
  activeCount: number;
  onClearAll: () => void;
}

export function FiltersDropdown({ sections, activeCount, onClearAll }: FiltersDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="secondary"
        size="md"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`min-w-[136px] px-3 rounded-lg text-[11px] font-semibold tracking-wide uppercase whitespace-nowrap ${
          open || activeCount > 0 ? "border-ink" : ""
        } ${open ? "bg-surface shadow-focus" : "bg-surface-2"}`}
      >
        <IoFilter />
        <span>Filters</span>
        <span
          className={`inline-grid place-items-center w-4 h-4 px-1 rounded-full text-2xs font-extrabold tracking-normal text-white ${
            activeCount ? "bg-accent" : "bg-transparent"
          }`}
        >
          {activeCount > 0 && activeCount}
        </span>
        <span className="text-muted inline-flex">
          <PiCaretDownBold size={14} />
        </span>
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Filters"
          className="absolute top-[calc(100%+8px)] left-0 w-64 bg-surface border border-line rounded-xl z-50 overflow-hidden"
          style={{
            boxShadow: "0 20px 40px rgba(10,10,15,0.12), 0 2px 6px rgba(10,10,15,0.06)",
            animation: "ddIn 0.14s ease-out",
          }}
        >
          <style>{`@keyframes ddIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>

          {sections.map((section, i) => (
            <div key={section.label}>
              <div className="flex items-center justify-between p-3 border-b border-line-2 text-2xs font-body font-bold tracking-xwide uppercase text-muted-2">
                <span>{section.label}</span>
                {i === 0 && activeCount > 0 && (
                  <Button
                    variant="transparent"
                    size="sm"
                    onClick={onClearAll}
                    className="text-accent hover:text-accent h-auto px-0 py-0 text-[11px] tracking-[0.12em] uppercase"
                  >
                    Reset
                  </Button>
                )}
              </div>
              <div className="p-2 gap-1 flex flex-col">
                {section.options.map((opt) => {
                  const checked = section.isSelected(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-[13px] font-body text-ink ${
                        checked ? "bg-accent-tint-2" : "bg-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => section.onToggle(opt.value)}
                        className="hidden"
                      />
                      <span
                        className={`w-4 h-4 rounded inline-grid place-items-center shrink-0 text-white ${
                          checked
                            ? "border-[1.5px] border-ink bg-ink"
                            : "border-[1.5px] border-line bg-transparent"
                        }`}
                      >
                        {checked && <FaCheck size={11} />}
                      </span>
                      <span className="flex-1 font-mono font-medium text-[12px] tracking-ui">
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

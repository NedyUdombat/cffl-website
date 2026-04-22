"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import { Button } from "@/components/Button";
import { ALL_POSITIONS, GENDER } from "@/styles/tokens";

interface FilterItemProps {
  positionFilter: string[];
  togglePosition: (p: string) => void;
  onClearAll: () => void;
  genderFilter: string;
  setGenderFilter: (g: any) => void;
}

export function FiltersDropdown({
  positionFilter,
  togglePosition,
  onClearAll,
  genderFilter,
  setGenderFilter,
}: FilterItemProps) {
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

  const activeCount = genderFilter ? 1 + positionFilter.length : positionFilter.length;

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
          {/* Head */}
          <div className="flex items-center justify-between p-3 border-b border-line-2 text-2xs font-body font-bold tracking-xwide uppercase text-muted-2">
            <span>Gender</span>
            {activeCount > 0 && (
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

          {/* Gender section */}
          <div className="p-2 gap-1 flex flex-col">
            {GENDER.map((gender) => {
              const checked = gender.value === genderFilter;
              return (
                <label
                  key={gender.value}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-[13px] font-body text-ink ${
                    checked ? "bg-accent-tint-2" : "bg-transparent"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setGenderFilter((prevVal) => (prevVal === gender.value ? null : gender.value))
                    }
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
                    {gender.label}
                  </span>
                </label>
              );
            })}
          </div>
          {/* Head */}
          <div className="flex items-center justify-between p-3 border-b border-line-2 text-2xs font-body font-bold tracking-xwide uppercase text-muted-2">
            <span>Position</span>
          </div>

          {/* Position section */}
          <div className="p-2 gap-1 flex flex-col">
            {ALL_POSITIONS.map((p) => {
              const checked = positionFilter.includes(p);
              return (
                <label
                  key={p}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-[13px] font-body text-ink ${
                    checked ? "bg-accent-tint-2" : "bg-transparent"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePosition(p)}
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
                  <span className="flex-1 font-mono font-medium text-[12px] tracking-ui">{p}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";

import { IoFilter } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import { ALL_POSITIONS, BODY, MONO } from "@/styles/tokens";

interface FilterItemProps {
  positionFilter: string[];
  togglePosition: (p: string) => void;
  onClearAll: () => void;
}

export function FiltersDropdown({ positionFilter, togglePosition, onClearAll }: FilterItemProps) {
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

  const activeCount = positionFilter.length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`h-10 min-w-[136px] px-3 inline-flex items-center gap-2 border rounded-lg text-[11px] font-semibold tracking-wide uppercase text-[#0a0a0b] cursor-pointer whitespace-nowrap ${
          open || activeCount > 0 ? "border-[#0a0a0b]" : "border-[#e7e8eb]"
        } ${open ? "bg-white shadow-[0_0_0_3px_rgba(10,10,15,0.06)]" : "bg-[#fafafa] shadow-none"}`}
        style={{ fontFamily: BODY }}
        type="button"
      >
        <IoFilter />
        <span>Filters</span>

        <span
          className={`inline-grid place-items-center w-4 h-4 px-1 rounded-full text-[10px] font-extrabold tracking-normal text-white ${
            activeCount ? "bg-[#ED3237]" : "bg-transparent"
          }`}
          style={{ fontFamily: MONO }}
        >
          {activeCount > 0 && activeCount}
        </span>
        <span className="text-[#6b7280] inline-flex">
          <PiCaretDownBold size={14} />
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Filters"
          className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white border border-[#e7e8eb] rounded-xl z-50 overflow-hidden"
          style={{
            // Multi-value shadow can't be expressed cleanly in Tailwind arbitrary values
            boxShadow: "0 20px 40px rgba(10,10,15,0.12), 0 2px 6px rgba(10,10,15,0.06)",
            // Custom keyframe animation requires the <style> tag below
            animation: "ddIn 0.14s ease-out",
          }}
        >
          <style>{`@keyframes ddIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>

          {/* Head */}
          <div
            className="flex items-center justify-between p-3 border-b border-[#eff0f2] text-[10px] font-bold tracking-[0.18em] uppercase text-[#9aa0aa]"
            style={{ fontFamily: BODY }}
          >
            <span>Position</span>
            {activeCount > 0 && (
              <button
                onClick={onClearAll}
                className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#ED3237] bg-transparent border-0 cursor-pointer"
                style={{ fontFamily: BODY }}
                type="button"
              >
                Reset
              </button>
            )}
          </div>

          {/* Position section */}
          <div className="p-2 gap-1 flex flex-col">
            {ALL_POSITIONS.map((p) => {
              const checked = positionFilter.includes(p);
              return (
                <label
                  key={p}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-[13px] text-[#0a0a0b] ${
                    checked ? "bg-[#fdf2f3]" : "bg-transparent"
                  }`}
                  style={{ fontFamily: BODY }}
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
                        ? "border-[1.5px] border-[#0a0a0b] bg-[#0a0a0b]"
                        : "border-[1.5px] border-[#e7e8eb] bg-transparent"
                    }`}
                  >
                    {checked && <FaCheck size={11} />}
                  </span>
                  <span
                    className="flex-1 font-medium text-[12px] tracking-[0.04em]"
                    style={{ fontFamily: MONO }}
                  >
                    {p}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

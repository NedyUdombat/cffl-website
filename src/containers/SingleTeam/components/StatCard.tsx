"use client";

export function StatCard({
  label,
  value,
  primaryColor,
}: {
  label: string;
  value: string | number;
  primaryColor: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-7 min-w-[130px] border-r border-white/10 last:border-r-0">
      <span
        className="font-barlow-condensed font-bold text-4xl md:text-5xl leading-none tabular-nums"
        style={{ color: primaryColor }}
      >
        {value}
      </span>
      <span className="mt-2 text-[10px] font-inter uppercase tracking-[0.22em] text-white/40">
        {label}
      </span>
    </div>
  );
}

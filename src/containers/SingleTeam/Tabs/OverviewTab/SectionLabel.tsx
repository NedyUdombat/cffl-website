/** Section header: red bullet • + small uppercase tracking label */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[#e63946] text-[13px] leading-none select-none">•</span>
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 font-barlow-condensed">
        {children}
      </span>
    </span>
  );
}

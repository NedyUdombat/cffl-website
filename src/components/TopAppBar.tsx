import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface TopAppBarProps {
  teamName: string;
}

const TopAppBar = ({ teamName }: TopAppBarProps) => {
  return (
    <div
      className="absolute top-0 inset-x-0 z-20"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-14 lg:px-20 h-12 flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] font-inter">
          <Link
            href="/"
            className={`text-white/40 hover:text-white/70 transition-colors uppercase`}
          >
            CFFL
          </Link>
          <ChevronRight className="text-white/25 w-3 h-3 shrink-0" />
          <Link
            href="/teams"
            className="text-white/40 hover:text-white/70 transition-colors uppercase"
          >
            TEAMS
          </Link>
          <ChevronRight className="text-white/25 w-3 h-3 shrink-0" />
          <span className="text-white uppercase">{teamName}</span>
        </div>
      </div>
    </div>
  );
};

export default TopAppBar;

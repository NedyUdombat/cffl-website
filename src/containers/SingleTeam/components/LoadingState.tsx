"use client";

// Shimmer skeleton that mirrors the page layout
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-white/5 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function LoadingState() {
  return (
    <main
      className="min-h-screen w-full"
      style={{ backgroundColor: "#09090f" }}
      aria-label="Loading team page"
    >
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Hero skeleton */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: "600px", maxHeight: "900px" }}
      >
        <Shimmer className="absolute inset-0 rounded-none" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10" />

        {/* Bottom content area */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 lg:px-20 pb-10 md:pb-14">
          {/* League label row */}
          <Shimmer className="h-3 w-40 mb-5" />

          {/* Color swatches */}
          <div className="flex gap-7 mb-4">
            <Shimmer className="h-5 w-24" />
            <Shimmer className="h-5 w-24" />
          </div>

          {/* Abbreviation */}
          <Shimmer className="h-24 md:h-32 w-48 md:w-72 mb-2" />
          {/* Team name */}
          <Shimmer className="h-10 md:h-14 w-64 md:w-96" />

          {/* Accent bar */}
          <Shimmer className="mt-5 mb-5 h-0.5 w-36" />

          {/* Social icons */}
          <div className="flex gap-2.5">
            {[0, 1, 2].map((i) => (
              <Shimmer key={i} className="w-9 h-9 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip skeleton */}
      <section
        className="border-b border-white/5 overflow-x-auto"
        style={{ backgroundColor: "#09090f" }}
      >
        <div className="flex" style={{ minWidth: "650px" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center justify-center px-4 py-7 min-w-[130px] border-r border-white/10 last:border-r-0 gap-2"
            >
              <Shimmer className="h-10 w-14" />
              <Shimmer className="h-2.5 w-16" />
            </div>
          ))}
        </div>
      </section>

      {/* Section skeletons */}
      {[0, 1].map((s) => (
        <section
          key={s}
          className="py-16 md:py-20 px-6 md:px-14 lg:px-20"
          style={{ backgroundColor: s % 2 === 0 ? "#09090f" : "#0b0c12" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Shimmer className="w-1 h-7 rounded-full" />
              <Shimmer className="h-6 w-40" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: will fix
                <Shimmer key={i} className="h-36 rounded-xl" />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

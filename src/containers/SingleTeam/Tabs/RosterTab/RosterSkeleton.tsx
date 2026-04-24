export function RosterSkeleton() {
  return (
    <div
      className="grid gap-[14px]"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: will fix
          key={`skeleton-${i}`}
          className="bg-surface border border-line rounded-lg overflow-hidden"
        >
          <div className="h-80 bg-[linear-gradient(90deg,#f0f0f0_25%,#e8e8e8_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]" />
          <div className="p-4">
            <div className="h-5 bg-[#f0f0f0] rounded mb-2 w-[70%]" />
            <div className="h-5 bg-[#f0f0f0] rounded w-[40%]" />
          </div>
        </div>
      ))}
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}

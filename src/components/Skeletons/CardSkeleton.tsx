import type { SkeletonProps } from "./types";

const CardSkeleton = ({ shimmer }: SkeletonProps) => {
  return (
    <div
      className="grid gap-[14px]"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <div key={i} className="bg-surface border border-line rounded-lg overflow-hidden">
          <div className={`h-80 ${shimmer}`} />
          <div className="p-4">
            <div className={`h-5 rounded mb-2 w-[70%] ${shimmer}`} />
            <div className={`h-5 rounded w-[40%] ${shimmer}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;

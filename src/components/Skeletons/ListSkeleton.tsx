import type { SkeletonProps } from "./types";

const ListSkeleton = ({ shimmer }: SkeletonProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className={`h-9 rounded-lg mb-3 w-full ${shimmer}`} />
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          key={i}
          className="flex items-center gap-4 py-2.5 border-b border-line-2 last:border-0"
        >
          <div className={`h-4 w-8 rounded ${shimmer}`} />
          <div className={`h-9 w-9 rounded-full shrink-0 ${shimmer}`} />
          <div className={`h-4 rounded w-36 ${shimmer}`} />
          <div className={`h-4 rounded w-24 ml-auto ${shimmer}`} />
          <div className={`h-4 rounded w-8 ${shimmer}`} />
          <div className={`h-6 rounded w-16 ${shimmer}`} />
        </div>
      ))}
    </div>
  );
};

export default ListSkeleton;

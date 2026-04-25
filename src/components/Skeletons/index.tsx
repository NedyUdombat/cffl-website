import CardSkeleton from "@/components/Skeletons/CardSkeleton";
import ListSkeleton from "@/components/Skeletons/ListSkeleton";

const shimmer =
  "bg-[linear-gradient(90deg,#f0f0f0_25%,#e8e8e8_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-[shimmer_1.4s_infinite]";

export function DataSkeleton({ view }: { view: "card" | "list" }) {
  return (
    <>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      {view === "list" ? <ListSkeleton shimmer={shimmer} /> : <CardSkeleton shimmer={shimmer} />}
    </>
  );
}

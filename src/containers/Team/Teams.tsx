import TeamsCard from "@/components/TeamsCard";
import { useTeams } from "@/contexts/TeamContext";

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

const SkeletonCard = () => (
  <div className="flex flex-col items-center rounded-xl overflow-hidden bg-white/5 animate-pulse">
    <div className="w-full h-40 bg-white/10" />
    <div className="w-full py-3 px-4 flex justify-center">
      <div className="h-3 w-24 rounded bg-white/10" />
    </div>
  </div>
);

const Teams = () => {
  const { teams, isPending, isError, error, refetch } = useTeams();

  return (
    <main className="min-h-screen bg-white text-white pt-35 md:pt-40 pb-20 px-6 md:px-10 w-full">
      <div className="max-w-5xl mx-auto">
        {isPending && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
            {SKELETON_KEYS.map((key) => (
              <SkeletonCard key={key} />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <svg
                aria-hidden="true"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-red-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="font-machine text-sm tracking-widest uppercase text-white/40">
                Failed to load teams
              </p>
              <p className="text-xs text-white/25 max-w-xs">
                {error?.message ?? "Something went wrong. Please try again."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-2 px-6 py-2.5 text-xs tracking-widest uppercase font-machine border border-white/20 rounded-lg text-white/70 hover:border-white/50 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {!isPending && !isError && teams && teams.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <svg
                aria-hidden="true"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/30"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="font-machine text-sm tracking-widest uppercase text-white/40">
                No Teams Yet
              </p>
              <p className="text-xs text-white/25">Teams will appear here once they are added.</p>
            </div>
          </div>
        )}

        {!isPending && !isError && teams && teams.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
            {teams.map((team) => (
              <TeamsCard key={team._id} team={{ ...team, slug: team.slug?.current ?? null }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Teams;

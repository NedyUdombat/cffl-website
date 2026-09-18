import { CircleAlert } from "lucide-react";
import TeamsCard from "@/components/TeamsCard";
import { useTeams } from "@/contexts/TeamContext";

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

const SkeletonCard = () => (
  <div className="flex flex-col items-center rounded-xl overflow-hidden bg-gray-100 animate-pulse border border-gray-200">
    <div className="w-full h-40 bg-gray-200" />
    <div className="w-full py-4 px-4 flex justify-center">
      <div className="h-4 w-28 rounded bg-gray-200" />
    </div>
  </div>
);

const Teams = () => {
  const { teams, isPending, isError, error, refetch } = useTeams();

  return (
    <>
      <section className="relative w-full bg-[#1C2028] pt-36 pb-16 px-6 text-center mt-35.5 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-1 font-inter">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wide font-sans">
            THE TEAMS
          </h1>

          <div className="space-y-2 text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            <p className="font-semibold text-white">
              Meet the teams competing, building rivalries and pushing Nigerian flag football
              forward.
            </p>
            <p className="text-gray-300">
              Every team brings its own identity, style and ambition to the CFFL.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 text-black py-12 grow">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-12">
          {isPending && (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
              {SKELETON_KEYS.map((key) => (
                <SkeletonCard key={key} />
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-200">
                <CircleAlert className="text-red-500" size={40} />
              </div>
              <div className="space-y-2">
                <p className="font-inter text-sm tracking-widest uppercase text-gray-700">
                  Failed to load teams
                </p>
                <p className="text-xs text-gray-500 max-w-xs">
                  {error?.message ?? "Something went wrong. Please try again."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-2 px-6 py-2.5 text-xs tracking-widest uppercase font-inter border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {!isPending && !isError && teams && teams.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <CircleAlert size={40} />
              </div>
              <div className="space-y-2">
                <p className="font-inter text-sm tracking-widest uppercase text-gray-600">
                  No Teams Yet
                </p>
                <p className="text-xs text-gray-400">Teams will appear here once they are added.</p>
              </div>
            </div>
          )}

          {!isPending && !isError && teams && teams.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
              {teams.map((team) => (
                <TeamsCard key={team._id} team={{ ...team, slug: team.slug?.current ?? null }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Teams;
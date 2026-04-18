import useFetchSingleTeam from "@/queries/teams/useFetchSingleTeam";

const useSingleTeamLogic = (slug: string) => {
  const { singleTeam, isPending, isError, error, refetch } = useFetchSingleTeam(slug);

  return {
    singleTeam,
    isPending,
    isError,
    error,
    refetch,
  };
};

export default useSingleTeamLogic;

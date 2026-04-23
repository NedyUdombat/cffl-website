import useStaffTab from "./logic";

interface StaffTabProps {
  teamId: string;
  competitionId?: string;
}

const StaffTab = ({ teamId, competitionId }: StaffTabProps) => {
  const {} = useStaffTab();

  return (
    <section className="bg-bg-2">
      <div className="max-w-[1440px] mx-auto py-8  px-6 md:px-14 lg:px-20  flex flex-col gap-6">
        ghjklkj
      </div>
    </section>
  );
};

export default StaffTab;

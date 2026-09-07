import type { MATCHES_QUERYResult } from "sanity.types";
import CalendarItemCard from "./CalendarItemCard";
import useCalendarTab from "./logic";

interface CalendarTabProps {
  matches: MATCHES_QUERYResult;
  teamId: string;
}

const CalendarTab = ({ matches, teamId }: CalendarTabProps) => {
  const { groupedMatches } = useCalendarTab({ matches });

  return (
    <section className="bg-bg-2">
      <div className="max-w-[1440px] mx-auto py-8 px-6 md:px-14 lg:px-20 flex flex-col gap-6">
        {Object.entries(groupedMatches)
          .sort(([, a], [, b]) => a.sortValue.getTime() - b.sortValue.getTime())
          .map(([month, monthData]) => (
            <div key={month} className=" flex flex-col gap-6">
              <div className="flex w-full gap-2 items-center">
                <h2 className="font-mono text-xl">{month}</h2>
                <div className="bg-muted-2 opacity-40 flex-1 h-[1px]"></div>
              </div>
              <div className="gap-3 flex flex-col">
                {Object.entries(monthData.days)
                  .sort(([, a], [, b]) => a.sortValue.getTime() - b.sortValue.getTime())
                  .map(([day, dayData]) => (
                    <CalendarItemCard key={day} dayData={dayData} day={day} teamId={teamId} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CalendarTab;

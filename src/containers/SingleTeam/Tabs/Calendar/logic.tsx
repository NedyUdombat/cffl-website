import { format } from "date-fns";
import type { MATCHES_QUERYResult } from "sanity.types";

const useCalendarTab = ({ matches }: { matches: MATCHES_QUERYResult }) => {
  const groupedMatches = matches.reduce(
    (acc, match) => {
      const date = new Date(match.date);

      const monthKey = format(date, "MMM yyyy");
      const dayKey = format(date, "dd");

      if (!acc[monthKey]) {
        acc[monthKey] = {
          sortValue: date,
          days: {},
        };
      }

      // ⚠️ enforce single match per day
      if (acc[monthKey].days[dayKey]) {
        console.warn(`Duplicate match for ${monthKey} ${dayKey}`);
      }

      acc[monthKey].days[dayKey] = {
        sortValue: date,
        match,
      };

      return acc;
    },
    {} as Record<
      string,
      {
        sortValue: Date;
        days: Record<
          string,
          {
            sortValue: Date;
            match: (typeof matches)[number];
          }
        >;
      }
    >
  );

  return {
    groupedMatches,
  };
};

export default useCalendarTab;

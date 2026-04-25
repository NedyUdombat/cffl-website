import type { STAFFS_QUERYResult } from "sanity.types";
import EmptyState from "@/components/EmptyState";
import { ProfileCard } from "@/components/ProfileCard";

export function CardGrid({ entries }: { entries: STAFFS_QUERYResult }) {
  if (!entries.length) return <EmptyState title="No staffs found" />;

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
    >
      {entries.map((entry) => {
        const firstName = entry?.firstName ?? "";
        const lastName = entry?.lastName ?? "";
        const displayName = `${firstName} ${lastName}`.trim() || "—";

        return (
          <ProfileCard
            key={entry._id}
            isPlayer={false}
            displayName={displayName}
            photo={entry?.photo}
            gender={entry?.gender?.toLowerCase() ?? null}
            href={entry?._id ? `/staffs/${entry._id}` : undefined}
            role={entry.role}
          />
        );
      })}
    </div>
  );
}

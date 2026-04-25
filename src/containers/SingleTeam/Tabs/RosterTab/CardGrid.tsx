import type { ROSTER_ENTRIES_QUERYResult } from "sanity.types";
import EmptyState from "@/components/EmptyState";
import { ProfileCard } from "@/components/ProfileCard";

export function CardGrid({ entries }: { entries: ROSTER_ENTRIES_QUERYResult }) {
  if (!entries.length) return <EmptyState title="No players found" />;

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
    >
      {entries.map((entry) => {
        const firstName = entry.player?.firstName ?? "";
        const lastName = entry.player?.lastName ?? "";
        const displayName = `${firstName} ${lastName}`.trim() || "—";

        return (
          <ProfileCard
            key={entry._id}
            displayName={displayName}
            jerseyName={entry.jerseyName}
            jerseyNumber={entry.jerseyNumber ?? 0}
            positions={entry.positions ?? []}
            photo={entry.player?.photo}
            isCaptain={entry.isCaptain ?? false}
            gender={entry.player?.gender?.toLowerCase() ?? null}
            href={entry.player?._id ? `/players/${entry.player._id}` : undefined}
          />
        );
      })}
    </div>
  );
}

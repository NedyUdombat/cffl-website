import Image from "next/image";
import Link from "next/link";
import type { ROSTER_ENTRIES_QUERYResult } from "sanity.types";
import FemaleAvatar from "./avatar/female";
import MaleAvatar from "./avatar/male";
import { EmptyState } from "./EmptyState";

export function CardGrid({ entries }: { entries: ROSTER_ENTRIES_QUERYResult }) {
  if (!entries.length) return <EmptyState />;

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
    >
      {entries.map((entry) => {
        const firstName = entry.player?.firstName ?? "";
        const lastName = entry.player?.lastName ?? "";
        const displayName = `${firstName} ${lastName}`.trim() || "—";
        const jerseyName = entry.jerseyName;
        const number = entry.jerseyNumber ?? 0;
        const positions = entry.positions ?? [];
        const photo = entry.player?.photo;
        const isCaptain = entry.isCaptain ?? false;
        const gender = entry.player?.gender?.toLowerCase() ?? null;
        const href = entry.player?._id ? `/players/${entry.player._id}` : undefined;

        const card = (
          <div
            key={entry._id}
            role={href ? "link" : "button"}
            tabIndex={href ? undefined : 0}
            className="group relative rounded-xl overflow-hidden cursor-pointer flex flex-col h-96 border"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 110%, color-mix(in srgb, var(--color-gold) 25%, transparent), transparent 60%), linear-gradient(180deg, #2d2f36 0%, #1c1d22 100%)",
            }}
          >
            {/* Diagonal stripe texture */}
            <div
              className="absolute inset-0 pointer-events-none z-[-1000px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 10px, rgba(255,255,255,0) 10px 25px)",
              }}
            />

            <div className="px-4 pt-3">
              {/* Jersey number */}
              <div className="flex gap-1">
                <span className="font-display text-sm font-bold text-white/60">#</span>
                <span className="font-display text-5xl font-black tracking-ui text-white/90">
                  {String(number).padStart(2, "0")}
                </span>
              </div>

              {/* Captain badge */}
              {isCaptain && (
                <div className="absolute top-0 right-0 bg-[#f20511]/60 text-white/85 font-body text-xs font-bold tracking-wide-ui uppercase px-6 py-2 rounded-bl-xl">
                  Capt
                </div>
              )}
            </div>

            {/* Player photo or avatar */}
            <div className="relative h-full">
              {photo ? (
                <div>
                  <Image
                    src={photo}
                    alt={displayName}
                    fill
                    className="object-cover object-bottom w-full h-full"
                  />
                </div>
              ) : gender === "female" ? (
                <FemaleAvatar className="w-full h-full opacity-70" />
              ) : (
                <MaleAvatar className="w-full h-full opacity-70" />
              )}
            </div>

            {/* Static label — fades out on hover */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 transition-opacity duration-[220ms] ease-out group-hover:opacity-0">
              <div className="font-display font-bold text-xl text-white uppercase tracking-ui leading-[1.1] truncate">
                {displayName || firstName}
              </div>
            </div>

            {/* Reveal panel — slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-[8px] p-4 border-t border-white/[0.08] translate-y-full transition-transform duration-[320ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
              <div className="font-display font-bold text-xl text-white uppercase tracking-ui leading-[1.1] mb-1 truncate">
                {displayName}
              </div>
              <div className="flex gap-1 items-center">
                {jerseyName && (
                  <div className="text-xs text-white/60 uppercase tracking-[0.06em] font-medium">
                    {jerseyName}
                  </div>
                )}
                <div className="text-xs font-medium tracking-label text-white/50 uppercase">
                  {gender === "female" ? "(F)" : "(M)"}
                </div>
              </div>
              <div className="h-px bg-white/10 my-2.5" />
              {positions.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {positions.map((pos) => (
                    <span
                      key={pos}
                      className="font-mono text-2xs font-bold tracking-label uppercase px-2 py-1 rounded border border-white/20 text-white/75 bg-white/[0.06]"
                    >
                      {pos}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

        return href ? (
          <Link key={entry._id} href={href} className="block">
            {card}
          </Link>
        ) : (
          <div key={entry._id}>{card}</div>
        );
      })}
    </div>
  );
}

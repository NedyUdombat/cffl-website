import Image from "next/image";
import Link from "next/link";
import { STAFF_ROLES } from "@/styles/tokens";
import FemaleAvatar from "./avatar/female";
import MaleAvatar from "./avatar/male";

export interface ProfileCardProps {
  displayName: string;
  jerseyName?: string | null;
  jerseyNumber?: number | null;
  positions?: string[];
  photo?: string | null;
  isCaptain?: boolean;
  gender?: string | null;
  href?: string;
  isPlayer?: boolean;
  role?: string;
}

export function ProfileCard({
  displayName,
  jerseyName,
  jerseyNumber,
  positions = [],
  photo,
  isCaptain = false,
  gender,
  href,
  isPlayer = true,
  role,
}: ProfileCardProps) {
  const card = (
    <div
      role={href ? "link" : undefined}
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

      {isPlayer && (
        <div className="px-4 pt-3">
          <div className="flex gap-1">
            <span className="font-display text-sm font-bold text-white/60">#</span>
            <span className="font-display text-5xl font-black tracking-ui text-white/90">
              {String(jerseyNumber).padStart(2, "0")}
            </span>
          </div>

          {isCaptain && (
            <div className="absolute top-0 right-0 bg-[#f20511]/60 text-white/85 font-body text-xs font-bold tracking-wide-ui uppercase px-6 py-2 rounded-bl-xl">
              Capt
            </div>
          )}
        </div>
      )}

      {/* Photo or avatar */}
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

      {/* Static label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 transition-opacity duration-[220ms] ease-out group-hover:opacity-0">
        <div className="font-display font-bold text-xl text-white uppercase tracking-ui leading-[1.1] truncate">
          {displayName}
        </div>
      </div>

      {/* Reveal panel */}
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
            {gender === "female" ? "(F)" : gender === "male" ? "(M)" : ""}
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
        {role && (
          <span className="font-mono text-2xs font-bold tracking-label uppercase px-2 py-1 rounded border border-white/20 text-white/75 bg-white/[0.06]">
            {STAFF_ROLES[role]}
          </span>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {card}
    </Link>
  ) : (
    <div>{card}</div>
  );
}

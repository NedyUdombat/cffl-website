"use client";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "roster", label: "Roster" },
  { id: "matches", label: "Matches" },
  { id: "standings", label: "Standings" },
  { id: "stats", label: "Statistics" },
  { id: "staff", label: "Staff" },
  { id: "news", label: "News" },
] as const;

export type Tab = (typeof TABS)[number]["id"];

export function TabBar({
  activeTab,
  onTabChange,
  primaryColor,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  primaryColor: string;
}) {
  return (
    <nav
      className="sticky top-0 z-40 bg-white border-b border-gray-200 overflow-x-auto"
      aria-label="Team page sections"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 ">
        <div className="flex items-end gap-0 min-w-max">
          {TABS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={[
                  "cursor-pointer relative px-5 py-4 text-sm font-barlow font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-150",
                  isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-700",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import PillToggle from "@/components/PillToggle";
import type { Category } from "@/containers/SingleTeam/Tabs/StatsTab/types";

interface CategoryItem {
  id: string;
  label: string;
  activeBg: string;
}

interface CategoriesToggleProps {
  items: CategoryItem[];
  value: string;
  onChange: (value: Category) => void;
}

const CategoriesToggle = ({ items, value, onChange }: CategoriesToggleProps) => {
  return (
    <PillToggle
      items={items.map((cat) => ({
        value: cat.id,
        label: cat.label,
        activeClassName: `shadow-sm bg-white text-ink border border-line`,
      }))}
      value={value}
      onChange={onChange}
      containerClassName="items-center bg-surface-2 rounded-xl gap-1 shadow-sm"
      itemClassName="relative px-4 py-2 rounded-lg tracking-ui font-mono text-xs uppercase  border-0 cursor-pointer"
      inactiveClassName="text-muted hover:text-ink-2 hover:bg-line-2"
    />
  );
};

export default CategoriesToggle;

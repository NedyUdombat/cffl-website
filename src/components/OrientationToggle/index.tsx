import { BsFillGridFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import type { PillToggleItem } from "@/components/PillToggle";
import PillToggle from "@/components/PillToggle";

interface OrientationToggleProps {
  view: "card" | "list";
  setView: (view: "card" | "list") => void;
}

const ITEMS: PillToggleItem<"card" | "list">[] = [
  { value: "card", label: <BsFillGridFill />, ariaLabel: "Card view" },
  { value: "list", label: <GiHamburgerMenu />, ariaLabel: "List view" },
];

const OrientationToggle = ({ view, setView }: OrientationToggleProps) => {
  return (
    <PillToggle
      items={ITEMS}
      value={view}
      onChange={setView}
      containerClassName="h-10 ml-auto"
      itemClassName="w-full h-full cursor-pointer"
    />
  );
};

export default OrientationToggle;

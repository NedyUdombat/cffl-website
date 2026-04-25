import { BsFillGridFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/components/Button";

interface OrientationToggleProps {
  view: "card" | "list";
  setView: (view: "card" | "list") => void;
}

const OrientationToggle = ({ view, setView }: OrientationToggleProps) => {
  return (
    <div className="flex h-10 bg-surface-2 border border-line rounded-lg p-1 gap-1 ml-auto">
      {(["card", "list"] as const).map((v) => (
        <Button
          key={v}
          variant="icon"
          size="sm"
          onClick={() => setView(v)}
          aria-label={v === "card" ? "Card view" : "List view"}
          aria-pressed={view === v}
          className={`px-3 w-full h-full font-bold tracking-wide-ui uppercase rounded ${
            view === v
              ? "text-ink bg-surface shadow-raised"
              : "text-muted bg-transparent shadow-none"
          }`}
        >
          {v === "card" ? <BsFillGridFill /> : <GiHamburgerMenu />}
        </Button>
      ))}
    </div>
  );
};

export default OrientationToggle;

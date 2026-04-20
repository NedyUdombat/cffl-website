import { BsFillGridFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { BODY } from "@/styles/tokens";

interface OrientationToggleProps {
  view: "card" | "list";
  setView: (view: "card" | "list") => void;
}

const OrientationToggle = ({ view, setView }: OrientationToggleProps) => {
  return (
    <div className="flex h-10 bg-[#fafafa] border border-[#e7e8eb] rounded-lg p-1 gap-0.5 ml-auto">
      {(["card", "list"] as const).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`h-full px-3 text-[11px] font-bold tracking-[0.14em] uppercase rounded flex items-center cursor-pointer transition-all duration-150 ${
            view === v
              ? "text-[#0a0a0b] bg-white shadow-[0_4px_12px_rgba(10,10,15,0.12),_0_1px_3px_rgba(10,10,15,0.08)]"
              : "text-[#6b7280] bg-transparent shadow-none"
          }`}
          style={{ fontFamily: BODY }}
          type="button"
        >
          {v === "card" ? <BsFillGridFill /> : <GiHamburgerMenu />}
        </button>
      ))}
    </div>
  );
};

export default OrientationToggle;

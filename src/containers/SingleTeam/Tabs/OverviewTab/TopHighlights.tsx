import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeUp } from "../../types";

const CLIPS = [
  {
    duration: "02:48",
    cat: "Match Highlights",
    title: "21-14 Win vs Lagos Lions — Full Highlights",
    grad: "linear-gradient(145deg, #0a0e1a 0%, #1a1a2e 60%, #16213e 100%)",
  },
  {
    duration: "01:32",
    cat: "Training",
    title: "Pre-Season Camp Day 2 Best Plays",
    grad: "linear-gradient(145deg, #0d1b2a 0%, #162032 60%, #1a2840 100%)",
  },
];

const GRID_TEXTURE =
  "repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,1) 19px,rgba(255,255,255,1) 20px)," +
  "repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,1) 19px,rgba(255,255,255,1) 20px)";

export function TopHighlights() {
  return (
    <motion.div variants={fadeUp} className="bg-white rounded-xl px-5 pt-4 pb-5">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          className="text-[10px] font-bold uppercase tracking-widest font-inter text-gray-400 hover:text-gray-800 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CLIPS.map((clip) => (
          <div key={clip.title}>
            {/* Video thumbnail — CSS gradient + subtle grid texture */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ background: clip.grad, paddingBottom: "56.25%" }}
            >
              {/* Grid texture overlay */}
              <div
                className="absolute inset-0"
                style={{ opacity: 0.08, backgroundImage: GRID_TEXTURE }}
              />

              {/* Frosted play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <Play size={15} className="text-white" fill="white" style={{ marginLeft: 2 }} />
                </div>
              </div>

              {/* Duration badge */}
              <span
                className="absolute bottom-2 left-2 text-[9px] font-bold text-white font-inter px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
              >
                {clip.duration}
              </span>
            </div>

            <div className="mt-2">
              <p
                className="text-[9px] uppercase tracking-widest font-inter mb-1"
                style={{ color: "#9ca3af" }}
              >
                {clip.cat}
              </p>
              <p
                className="text-[12px] font-bold font-barlow-condensed leading-snug line-clamp-2"
                style={{ color: "#111827" }}
              >
                {clip.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { fadeUp } from "../../types";

export function FeaturedStory() {
  return (
    <motion.div variants={fadeUp}>
      <div
        className="rounded-xl p-5 flex flex-col justify-between"
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0f1923 45%, #0d1b2e 100%)",
          minHeight: 180,
        }}
      >
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white font-barlow-condensed leading-none"
              style={{ backgroundColor: "#e63946" }}
            >
              Exclusive Feature
            </span>
            <span className="text-[10px] font-inter" style={{ color: "#4b5563" }}>
              5 min read
            </span>
          </div>

          <h3
            className="font-barlow-condensed font-black uppercase italic text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", maxWidth: "36ch" }}
          >
            Captain Speaks Ahead of Rivalry Fixture: &ldquo;We Know What&rsquo;s At Stake&rdquo;
          </h3>
        </div>

        <div
          className="flex items-center gap-5 mt-5 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-1.5">
            <User size={11} style={{ color: "#4b5563" }} />
            <span className="text-[10px] font-inter" style={{ color: "#4b5563" }}>
              CFFL Editorial
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={11} style={{ color: "#4b5563" }} />
            <span className="text-[10px] font-inter" style={{ color: "#4b5563" }}>
              Mar 28, 2026
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

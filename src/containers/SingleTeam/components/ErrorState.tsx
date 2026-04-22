"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <main
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ backgroundColor: "#09090f" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-6 text-center max-w-sm"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle size={28} className="text-red-400" />
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-2">
          <h2 className="font-machine font-black text-white text-xl uppercase tracking-widest leading-none">
            Failed to Load
          </h2>
          <p className="text-white/40 text-sm font-machine leading-relaxed">
            {message ?? "We couldn't fetch this team's data. Check your connection and try again."}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="w-16 h-px bg-white/10" />

        {/* Retry */}
        {onRetry && (
          <button
            onClick={onRetry}
            type="button"
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all duration-200 font-machine text-xs uppercase tracking-widest"
          >
            <RefreshCw
              size={13}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            Try Again
          </button>
        )}
      </motion.div>
    </main>
  );
}

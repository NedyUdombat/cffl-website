"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <main className="min-h-screen w-full bg-bg-2 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5 text-center max-w-xs"
      >
        <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
          <AlertTriangle size={24} className="text-red-400" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="font-mono font-bold text-gray-900 text-lg tracking-tight">
            Failed to load
          </h2>
          <p className="font-body text-gray-500 text-sm leading-relaxed">
            {message ?? "We couldn't fetch this team's data. Check your connection and try again."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              type="button"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 font-mono text-xs tracking-wide cursor-pointer"
            >
              <RefreshCw
                size={12}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
              Try again
            </button>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 font-mono text-xs tracking-wide"
          >
            <Home size={12} />
            Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default ErrorState;

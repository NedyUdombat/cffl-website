const LoadingState = () => {
  return (
    <main
      className="min-h-screen w-full bg-bg-2 flex flex-col items-center justify-center gap-5"
      aria-label="Loading team page"
    >
      <style>{`
        @keyframes spin-arc {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
        .loader-ring {
          width: 44px;
          height: 44px;
          border: 2px solid rgba(0,0,0,0.08);
          border-top-color: rgba(0,0,0,0.6);
          border-radius: 50%;
          animation: spin-arc 0.9s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .loader-text {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.35);
          animation: pulse-text 2s ease-in-out infinite;
          font-family: ui-monospace, 'SF Mono', monospace;
        }
      `}</style>

      <div className="loader-ring" />
      <span className="loader-text">Loading</span>
    </main>
  );
};

export default LoadingState;

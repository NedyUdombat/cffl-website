interface EmptyStateProps {
  title: string;
  subtitle?: string;
}
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <div className="bg-surface border border-line rounded-lg text-center h-40 text-muted flex flex-col items-center justify-center gap-2 shadow-sm">
      <h3 className="font-body font-black text-xl uppercase text-ink">{title || "No results"}</h3>
      <p className="font-body">{subtitle || "Try clearing a filter or widening your search."}</p>
    </div>
  );
};

export default EmptyState;

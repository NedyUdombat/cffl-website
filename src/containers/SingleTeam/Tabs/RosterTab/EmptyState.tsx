export function EmptyState() {
  return (
    <div className="bg-surface border border-line rounded-lg text-center py-16 px-5 text-muted">
      <h3 className="font-display font-black italic text-2xl uppercase text-ink mb-2 mt-0">
        No players match
      </h3>
      <p className="m-0">Try clearing a filter or widening your search.</p>
    </div>
  );
}

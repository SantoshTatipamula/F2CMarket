export default function ListItemSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-xl bg-[var(--surface-2)] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded bg-[var(--surface-2)]" />
          <div className="h-3 w-1/2 rounded bg-[var(--surface-2)]" />
        </div>
        <div className="h-8 w-20 rounded-xl bg-[var(--surface-2)] shrink-0" />
      </div>
    </div>
  );
}

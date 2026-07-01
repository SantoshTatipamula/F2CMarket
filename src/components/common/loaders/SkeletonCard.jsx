export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-[var(--border)] bg-white p-4">
      <div className="h-56 rounded-2xl bg-gray-200" />

      <div className="mt-4 space-y-3">
        <div className="h-4 w-24 rounded bg-gray-200" />

        <div className="h-6 w-3/4 rounded bg-gray-200" />

        <div className="h-4 w-1/2 rounded bg-gray-200" />

        <div className="flex justify-between pt-4">
          <div className="h-10 w-28 rounded-2xl bg-gray-200" />

          <div className="h-10 w-20 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
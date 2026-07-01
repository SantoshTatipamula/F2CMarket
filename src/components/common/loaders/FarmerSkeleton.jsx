export default function FarmerSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl overflow-hidden border border-[var(--border)] bg-white">
      <div className="h-56 bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="h-6 w-2/3 rounded bg-gray-200" />

        <div className="h-4 w-full rounded bg-gray-200" />

        <div className="h-4 w-3/4 rounded bg-gray-200" />

        <div className="flex justify-between pt-3">
          <div className="h-10 w-24 rounded-xl bg-gray-200" />

          <div className="h-10 w-32 rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
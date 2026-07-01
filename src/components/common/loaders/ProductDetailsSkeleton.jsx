export default function ProductDetailsSkeleton() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[var(--bg)] via-white to-[var(--bg)] pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">

        {/* Breadcrumb */}
        <div className="mb-8 h-5 w-48 rounded bg-gray-200" />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          
          {/* Left */}
          <div className="space-y-6">
            {/* Image */}
            <div className="h-[500px] rounded-3xl bg-gray-200" />

            {/* Farmer Card */}
            <div className="rounded-2xl border border-[var(--border)] p-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-5 w-40 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div className="h-10 w-3/4 rounded bg-gray-200" />

            <div className="h-6 w-24 rounded bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>

            <div className="h-14 w-full rounded-2xl bg-gray-200" />
            <div className="h-14 w-full rounded-2xl bg-gray-200" />
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 space-y-4">
          <div className="h-8 w-52 rounded bg-gray-200" />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-[var(--border)] p-6"
              >
                <div className="h-5 w-32 rounded bg-gray-200" />

                <div className="mt-4 h-4 rounded bg-gray-200" />
                <div className="mt-2 h-4 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
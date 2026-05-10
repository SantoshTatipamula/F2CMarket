import { Users, Search } from "lucide-react";

export default function FarmersPageHeader({
  totalFarmers,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <section className="bg-white border-b border-[var(--border)]">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        {/* Top */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
              <Users size={16} />

              Trusted Local Farmers
            </div>

            <h1 className="mt-4 text-4xl font-bold text-[var(--text-primary)] leading-tight">
              Meet Our Farmers
            </h1>

            <p className="mt-3 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
              Connect directly with trusted local farmers
              providing fresh, healthy, and naturally grown
              products across different regions.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">

            {/* Search */}
            <div className="flex items-center gap-2 h-12 px-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] focus-within:border-[var(--primary)] transition">

              <Search
                size={18}
                className="text-[var(--text-secondary)]"
              />

              <input
                type="text"
                placeholder="Search farmers..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="bg-transparent outline-none border-none focus:ring-0 text-sm w-full sm:w-56 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
              />
            </div>

            {/* Count */}
            <div className="h-12 px-5 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center text-sm font-semibold whitespace-nowrap">
              {totalFarmers} Farmers
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
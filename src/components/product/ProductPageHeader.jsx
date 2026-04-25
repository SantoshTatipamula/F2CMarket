import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import ProductFilters from "./ProductFilters";

export default function ProductPageHeader({
  totalProducts,
  sortBy,
  setSortBy,
  category,
  setCategory,
  categories,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  selectedLocation,
  setSelectedLocation,
  availableLocations = [],
}) {
  return (
    <section className="bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
          <span className="hover:text-[var(--primary)] transition cursor-pointer">
            Home
          </span>
          <ChevronRight size={14} />
          <span className="font-medium text-[var(--text-primary)]">Products</span>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Fresh Produce</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Showing{" "}
              <span className="font-bold text-[var(--text-primary)]">{totalProducts}</span>{" "}
              available products
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            >
              <option value="featured">Featured</option>
              <option value="low">Price Low ↑</option>
              <option value="high">Price High ↓</option>
            </select>

            {/* Mobile/Tablet Filter Button (lg:hidden) */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="h-11 px-5 rounded-xl bg-[var(--primary)] text-white flex items-center gap-2 text-sm font-semibold active:scale-95 transition">
                    <SlidersHorizontal size={16} />
                    Filters
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] p-0 bg-[var(--bg)]">
                  <div className="p-6 h-full overflow-y-auto">
                    <SheetTitle className="text-xl font-bold mb-2">
                      Filter Products
                    </SheetTitle>
                    <SheetDescription className="text-sm text-[var(--text-muted)] mb-8">
                      Adjust your preferences to find the best local produce.
                    </SheetDescription>

                    {/* Content updates instantly, no extra button needed */}
                    <ProductFilters
                      category={category}
                      setCategory={setCategory}
                      maxPrice={maxPrice}
                      setMaxPrice={setMaxPrice}
                      minRating={minRating}
                      setMinRating={setMinRating}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                      availableLocations={availableLocations}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories?.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                category === item
                  ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-md shadow-green-100"
                  : "bg-[var(--bg)] border-[var(--border)] text-[var(--text-secondary)] hover:border-green-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

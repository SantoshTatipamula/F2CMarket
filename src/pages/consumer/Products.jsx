import { useState, useMemo } from "react";
import { productsData } from "@/data/productsData";
import { useSearchParams } from "react-router-dom";
import { parsePrice } from "@/utils/parsePrice";

import useProductsFilter from "@/hooks/useProductsFilter";
import ProductFilters from "@/components/product/ProductFilters";
import ProductsPageHeader from "@/components/product/ProductPageHeader";
import ProductGrid from "@/components/product/ProductGrid";

export default function Products() {
  /* Dynamic categories */
  const categories = useMemo(
    () => ["All", ...new Set(productsData.map((item) => item.category))],
    []
  );

  /* Dynamic max price */
  const maxLimit = useMemo(
    () => Math.max(...productsData.map((item) => parsePrice(item.price))),
    []
  );

  const [selectedLocation, setSelectedLocation] = useState("All");

  const {
    category, setCategory,
    sortBy, setSortBy,
    maxPrice, setMaxPrice,
    minRating, setMinRating,
    filteredProducts,
  } = useProductsFilter(productsData);

  /* Dynamic locations */
  const availableLocations = useMemo(() => {
    const locs = productsData.map((p) => {
      const loc = p.location || "";
      return loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
    });
    return ["All", ...new Set(locs.filter(Boolean))];
  }, []);

  /* Search query from URL */
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  /* Final filtering */
  const finalProducts = useMemo(
    () =>
      filteredProducts.filter((product) => {
        const matchesLocation =
          selectedLocation === "All"
            ? true
            : product.location?.toLowerCase() === selectedLocation.toLowerCase();
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        return matchesLocation && matchesSearch;
      }),
    [filteredProducts, selectedLocation, searchQuery]
  );

  const filterProps = {
    category, setCategory,
    maxPrice, setMaxPrice,
    minRating, setMinRating,
    selectedLocation, setSelectedLocation,
    availableLocations,
    maxLimit,
  };

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <ProductsPageHeader
        totalProducts={finalProducts.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        {...filterProps}
      />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row items-start gap-8">

          {/* Sidebar — sticky, scrolls with viewport, never taller than viewport */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-[76px] max-h-[calc(100vh-96px)] overflow-y-auto">
            <ProductFilters {...filterProps} />
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full min-w-0">
            <ProductGrid products={finalProducts} />
          </div>

        </div>
      </section>
    </div>
  );
}

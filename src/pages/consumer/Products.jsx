import { useState, useMemo } from "react";
import { productsData } from "@/data/productsData";
import { useSearchParams } from "react-router-dom";

import useProductsFilter from "@/hooks/useProductsFilter";
import ProductFilters from "@/components/product/ProductFilters";
import ProductsPageHeader from "@/components/product/ProductPageHeader";
import ProductGrid from "@/components/product/ProductGrid";

export default function Products() {
  /* Dynamic Categories */
  const categories = useMemo(() => {
    return ["All", ...new Set(productsData.map((item) => item.category))];
  }, []);

  
  /* Dynamic Max Price */
  const maxLimit = useMemo(() => {
    return Math.max(
      ...productsData.map((item) => Number(item.price.replace(/[^\d.]/g, ""))),
    );
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("All");

  const {
    category,
    setCategory,
    sortBy,
    setSortBy,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    filteredProducts,
  } = useProductsFilter(productsData);
  
  /* Dynamic Locations */
  const availableLocations = useMemo(() => {
    const locations = productsData.map((p) => {
      const loc = p.location || "";

      return loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
    });
    
    return ["All", ...new Set(locations.filter((loc) => loc !== ""))];
  }, []);
  
  // Search Query
  
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  
  /* Final Filtering */
  const finalFilteredProducts = useMemo(() => {
    return filteredProducts.filter((product) => {
      /* Location Filter */
      const matchesLocation =
        selectedLocation === "All"
          ? true
          : product.location?.toLowerCase() === selectedLocation.toLowerCase();

      /* Search Filter */
      const matchesSearch = product.name.toLowerCase().includes(searchQuery);

      return matchesLocation && matchesSearch;
    });
  }, [filteredProducts, selectedLocation, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <ProductsPageHeader
        totalProducts={finalFilteredProducts.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        category={category}
        setCategory={setCategory}
        categories={categories}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minRating={minRating}
        setMinRating={setMinRating}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        availableLocations={availableLocations}
        maxLimit={maxLimit}
      />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24">
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
              maxLimit={maxLimit}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <ProductGrid products={finalFilteredProducts} />
          </div>
        </div>
      </section>
    </div>
  );
}

import { useMemo, useState } from "react";

import { useProducts } from "@/context/ProductContext";

import { parsePrice } from "@/utils/parsePrice";

import useProductsFilter from "@/hooks/useProductsFilter";

import ProductFilters from "@/components/product/ProductFilters";

import ProductsPageHeader from "@/components/product/ProductPageHeader";

import ProductGrid from "@/components/product/ProductGrid";

import { useSearch } from "@/context/SearchContext";

export default function Products() {
  // Global Search
  const { searchQuery } = useSearch();

  const { products } = useProducts();

  /* Dynamic categories */

  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category))],
    [products],
  );

  /* Dynamic max price */
  const maxLimit = useMemo(
    () =>
      products.length > 0
        ? Math.max(...products.map((item) => parsePrice(item.price)))
        : 1000,
    [products],
  );

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
  } = useProductsFilter(products);

  /* Dynamic locations */
const availableLocations = useMemo(() => {
  const locs = products.map((p) => {
    const loc =
      typeof p.location === "string"
        ? p.location
        : p.farmLocation?.city ||
          p.location?.city ||
          "";

    return loc
      ? loc.charAt(0).toUpperCase() +
          loc.slice(1).toLowerCase()
      : "";
  });

  return ["All", ...new Set(locs.filter(Boolean))];
}, [products]);

  /* Final filtering */
 const finalProducts = useMemo(() => {
  const searchTerm = searchQuery?.toLowerCase().trim() || "";

  return filteredProducts.filter((product) => {
    const productLocation =
      typeof product.location === "string"
        ? product.location
        : product.farmLocation?.city ||
          product.location?.city ||
          "";

    const matchesLocation =
      selectedLocation === "All"
        ? true
        : productLocation.toLowerCase() ===
          selectedLocation.toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm) ||
      product.farmerName?.toLowerCase().includes(searchTerm) ||
      product.farmer?.toLowerCase().includes(searchTerm) ||
      productLocation.toLowerCase().includes(searchTerm);

    return matchesLocation && matchesSearch;
  });
}, [filteredProducts, selectedLocation, searchQuery]);

  const filterProps = {
    category,
    setCategory,

    maxPrice,
    setMaxPrice,

    minRating,
    setMinRating,

    selectedLocation,
    setSelectedLocation,

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
          {/* Sidebar */}
          <aside
            className="
              hidden lg:block
              w-[280px]
              shrink-0
              sticky top-[76px]
              max-h-[calc(100vh-96px)]
              overflow-y-auto
            "
          >
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

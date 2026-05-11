import { useMemo, useState } from "react";
import { parsePrice } from "@/utils/parsePrice";

/**
 * Encapsulates all product filtering & sorting logic for the Products page.
 * Accepts the full product list and returns filtered results + filter state setters.
 */
export default function useProductsFilter(productsData) {
  const highestPrice = useMemo(
    () => Math.max(...productsData.map((item) => parsePrice(item.price))),
    [productsData]
  );

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(highestPrice);
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = useMemo(() => {
    let items = [...productsData];

    if (category !== "All") {
      items = items.filter((item) => item.category === category);
    }

    items = items.filter((item) => parsePrice(item.price) <= maxPrice);

    if (minRating > 0) {
      items = items.filter((item) => item.rating >= minRating);
    }

    const priceOf = (item) => parsePrice(item.price);

    if (sortBy === "low")    items.sort((a, b) => priceOf(a) - priceOf(b));
    if (sortBy === "high")   items.sort((a, b) => priceOf(b) - priceOf(a));
    if (sortBy === "rating") items.sort((a, b) => b.rating - a.rating);

    return items;
  }, [productsData, category, sortBy, maxPrice, minRating]);

  return {
    category, setCategory,
    sortBy,   setSortBy,
    maxPrice, setMaxPrice,
    minRating, setMinRating,
    filteredProducts,
  };
}

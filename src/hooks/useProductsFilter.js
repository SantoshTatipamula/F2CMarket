import { useMemo, useState } from "react";

export default function useProductsFilter(productsData) {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const highestPrice = Math.max(
    ...productsData.map((item) =>
      Number(item.price.replace(/[^\d.]/g, ""))
    )
  );

  const [maxPrice, setMaxPrice] = useState(highestPrice);

  const [minRating, setMinRating] = useState(0);

  const filteredProducts = useMemo(() => {
    let items = [...productsData];

    // Category
    if (category !== "All") {
      items = items.filter(
        (item) => item.category === category
      );
    }

    // Price
    items = items.filter(
      (item) =>
        Number(item.price.replace(/[^\d.]/g, "")) <= maxPrice
    );

    // Rating
    if (minRating > 0) {
  items = items.filter(
    (item) => item.rating >= minRating
  );
}

    // Sorting
    if (sortBy === "low") {
      items.sort(
        (a, b) =>
          Number(a.price.replace(/[^\d.]/g, "")) -
          Number(b.price.replace(/[^\d.]/g, ""))
      );
    }

    if (sortBy === "high") {
      items.sort(
        (a, b) =>
          Number(b.price.replace(/[^\d.]/g, "")) -
          Number(a.price.replace(/[^\d.]/g, ""))
      );
    }

    if (sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [
    productsData,
    category,
    sortBy,
    maxPrice,
    minRating,
  ]);

  return {
    category,
    setCategory,
    sortBy,
    setSortBy,
    maxPrice,
    setMaxPrice,
    minRating,
    setMinRating,
    filteredProducts,
  };
}
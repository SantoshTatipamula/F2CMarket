// src/components/productDetails/productReviews/ProductReviews.jsx

import { useState } from "react";
import { reviewsData } from "@/data/reviewsData";
import ReviewCard from "./ReviewCard";
import ReviewsSummary from "./ReviewsSummary";

export default function ProductReviews({ product }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const visibleReviews = reviewsData.slice(0, visibleCount);
  const hasMore = visibleCount < reviewsData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="mt-20">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">
          Customer Reviews
        </h2>

        <p className="mt-2 text-[var(--text-secondary)]">
          Real feedback from verified buyers
        </p>
      </div>

      {/* Summary */}
      <ReviewsSummary product={product} />

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="rounded-full border-2 border-[var(--border)] bg-white px-8 py-3 font-semibold text-[var(--text-primary)] transition-all hover:scale-105 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </section>
  );
}
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import ReviewsSummary from "./ReviewsSummary";
import AddReviewForm from "./AddReviewForm";
import ErrorState from "@/components/common/ui/ErrorState";
import { getProductReviews } from "@/services/reviewService";

export default function ProductReviews({ product }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    loadReviews();
  }, [product.id]);

  const loadReviews = async () => {
    try {
      setLoading(true);

      const fetchedReviews = await getProductReviews(product.id);

      setReviews(fetchedReviews);
      setError(null);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  const hasMore = visibleCount < reviews.length;

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

      {/* Add Review Form */}
      <AddReviewForm product={product} onReviewAdded={loadReviews} />
      {/* Summary */}
      <ReviewsSummary product={product} reviews={reviews} />

      {/* Reviews Grid */}
      {loading ? (
        <div className="py-10 text-center">
          <p className="text-[var(--text-secondary)]">Loading reviews...</p>
        </div>
      ) : error ? (
        <ErrorState
          title="Couldn't load reviews"
          description="We ran into a problem loading reviews for this product."
          onRetry={loadReviews}
        />
      ) : reviews.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-[var(--text-secondary)]">No reviews yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

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

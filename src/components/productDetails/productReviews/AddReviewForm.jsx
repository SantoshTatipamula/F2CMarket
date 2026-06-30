import { useState } from "react";
import { Star } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  addReview,
  hasUserReviewed,
} from "@/services/reviewService";

export default function AddReviewForm({ product, onReviewAdded }) {
  const { user } = useAuth();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login to submit a review.");
      return;
    }

    if (user.role !== "consumer") {
      setError("Only consumers can submit reviews.");
      return;
    }

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a review.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const alreadyReviewed =
  await hasUserReviewed(
    product.id,
    user.id
  );

if (alreadyReviewed) {
  setError(
    "You have already reviewed this product."
  );
  return;
}

      await addReview({
        productId: product.id,

        consumerId: user.id,
        consumerName: user.name,
        consumerAvatar: user.avatar || "",

        rating,
        review: comment,

        verified: true,

        location: user.profile?.location || "India",

        date: new Date().toLocaleDateString("en-IN"),
      });

      setRating(0);
      setComment("");

      onReviewAdded?.();
    } catch (error) {
      console.error(error);

      setError("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="mb-3 block font-medium">Your Rating</label>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={30}
                  fill={star <= (hover || rating) ? "#F59E0B" : "none"}
                  className={
                    star <= (hover || rating)
                      ? "text-amber-500"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review */}
        <div>
          <label className="mb-3 block font-medium">Your Review</label>

          <textarea
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full rounded-2xl border border-[var(--border)] p-4 outline-none focus:border-[var(--primary)]"
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[var(--primary)] px-8 py-3 font-semibold text-white transition hover:scale-105"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

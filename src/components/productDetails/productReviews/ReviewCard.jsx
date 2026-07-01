// src/components/productDetails/productReviews/ReviewCard.jsx

import {
  Star,
  BadgeCheck,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="group rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img loading="lazy"
            src={review.avatar}
            alt={review.name}
            className="h-12 w-12 rounded-full border-2 border-[var(--border)] object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-[var(--text-primary)]">
                {review.name}
              </p>

              {review.verified && (
                <BadgeCheck
                  size={16}
                  className="text-green-600"
                />
              )}
            </div>

            <p className="text-xs text-[var(--text-muted)]">
              {review.location} • {review.date}
            </p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            fill={
              index < review.rating
                ? "#F59E0B"
                : "none"
            }
            className={
              index < review.rating
                ? "text-amber-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {/* Review */}
      <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
        {review.review}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
        <button className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--primary)]">
          <ThumbsUp size={16} />
          <span>Helpful ({review.helpful})</span>
        </button>

        <button className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--primary)]">
          <MessageCircle size={16} />
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
}
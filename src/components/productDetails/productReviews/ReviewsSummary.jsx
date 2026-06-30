// src/components/productDetails/productReviews/ReviewsSummary.jsx

import { Star, BadgeCheck } from "lucide-react";

export default function ReviewsSummary({
  product,
  reviews = [],
}) {
  const totalReviews = reviews.length;

  const rating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0,
          ) / totalReviews
        ).toFixed(1)
      : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (stars) => {
      const count = reviews.filter(
        (review) => review.rating === stars,
      ).length;

      return {
        stars,
        count,
        percentage:
          totalReviews > 0
            ? (count / totalReviews) * 100
            : 0,
      };
    },
  );

  return (
    <div className="mb-10 grid gap-6 lg:grid-cols-3">
      {/* Overall */}
      <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-amber-50 via-white to-white p-8 shadow-lg">
        <div className="text-center">
          <div className="mb-3 text-6xl font-bold text-[var(--text-primary)]">
            {rating}
          </div>

          <div className="mb-2 flex justify-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                fill={
                  index < Math.round(rating)
                    ? "#F59E0B"
                    : "none"
                }
                className={
                  index < Math.round(rating)
                    ? "text-amber-500"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-sm font-medium text-[var(--text-muted)]">
            Based on {totalReviews} reviews
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <BadgeCheck
              size={16}
              className="text-green-600"
            />
            <span className="font-medium text-green-700">
              All Verified Purchases
            </span>
          </div>
        </div>
      </div>

      {/* Distribution */}
      <div className="lg:col-span-2 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-lg">
        <h3 className="mb-5 text-lg font-bold text-[var(--text-primary)]">
          Rating Distribution
        </h3>

        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div
              key={item.stars}
              className="flex items-center gap-3"
            >
              <div className="flex w-16 items-center gap-1 text-sm font-medium">
                <span>{item.stars}</span>

                <Star
                  size={14}
                  fill="#F59E0B"
                  className="text-amber-500"
                />
              </div>

              <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>

              <span className="w-12 text-right text-sm font-medium text-[var(--text-muted)]">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
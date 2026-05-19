import {
  Star,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProfileSectionHeader from "@/components/profile/shared/ProfileSectionHeader";

export default function ReviewPreview() {
  const reviews = [
    {
      id: 1,
      customer: "Akhil Kumar",
      rating: 5,
      review:
        "Fresh vegetables and excellent delivery quality. Highly recommended seller.",
      time: "2 days ago",
    },

    {
      id: 2,
      customer: "Priya Sharma",
      rating: 4,
      review:
        "Products were fresh and packaging was very clean and professional.",
      time: "5 days ago",
    },

    {
      id: 3,
      customer: "Rahul Verma",
      rating: 5,
      review:
        "One of the best farmers on the marketplace with great product quality.",
      time: "Last week",
    },
  ];

  return (
    <section
      className="
        rounded-3xl
        border border-black/5
        bg-[var(--surface)]
        p-6
        shadow-sm
      "
    >
      
      {/* Header */}
      <ProfileSectionHeader
        title="Customer Reviews"
        description="Recent marketplace feedback from your customers and buyers."
        buttonLabel="View All"
        buttonHref="/profile/reviews"
      />

      {/* Reviews */}
      <div className="mt-8 space-y-5">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="
              rounded-2xl
              border border-black/5
              bg-[var(--surface-2)]
              p-5
              transition-all duration-300
              hover:border-[var(--primary)]/10
            "
          >
            
            {/* Header */}
            <div
              className="
                flex flex-col gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              
              {/* User */}
              <div className="flex items-center gap-3">
                
                {/* Avatar */}
                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-2xl
                    bg-[var(--primary)]
                    text-sm font-bold
                    text-white
                  "
                >
                  {review.customer
                    .charAt(0)
                    .toUpperCase()}
                </div>

                {/* Name */}
                <div>
                  
                  <h3
                    className="
                      text-base font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    {review.customer}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[var(--text-secondary)]
                    "
                  >
                    {review.time}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div
                className="
                  inline-flex items-center gap-1
                  rounded-full
                  bg-amber-500/10
                  px-3 py-1
                  text-sm font-semibold
                  text-amber-600
                "
              >
                <Star
                  size={16}
                  fill="currentColor"
                />

                {review.rating}.0
              </div>
            </div>

            {/* Review Text */}
            <p
              className="
                mt-5
                text-sm leading-relaxed
                text-[var(--text-secondary)]
              "
            >
              {review.review}
            </p>
          </article>
        ))}
      </div>

      {/* Footer CTA */}
      <div
        className="
          mt-8
          flex items-center
          justify-between
          rounded-2xl
          border border-dashed border-[var(--border)]
          bg-[var(--surface-2)]
          p-5
        "
      >
        
        <div>
          
          <h3
            className="
              text-base font-semibold
              text-[var(--text-primary)]
            "
          >
            Maintain Seller Reputation
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-[var(--text-secondary)]
            "
          >
            Positive reviews increase
            visibility and marketplace
            trust for your products.
          </p>
        </div>

        <Link
          to="/profile/reviews"
          className="
            hidden items-center gap-2
            rounded-2xl
            bg-[var(--primary)]
            px-5 py-3
            text-sm font-semibold
            text-white
            transition-all duration-300
            hover:opacity-90
            sm:inline-flex
          "
        >
          View Reviews

          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
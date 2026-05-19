import {
  Star,
  MessageCircle,
  BadgeCheck,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

export default function SellerReviews() {
  const { user } = useAuth();

  const reviews = [
    {
      id: 1,

      customer: "Ramesh",

      rating: 5,

      comment:
        "Excellent product quality and very fast delivery.",

      date: "2 days ago",
    },

    {
      id: 2,

      customer: "Priya",

      rating: 4,

      comment:
        "Fresh vegetables and good packaging experience.",

      date: "5 days ago",
    },

    {
      id: 3,

      customer: "Kiran",

      rating: 5,

      comment:
        "Highly trusted seller with premium farm products.",

      date: "1 week ago",
    },
  ];

  const averageRating =
    (
      reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / reviews.length
    ).toFixed(1);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      
      <section
        className="
          mx-auto
          max-w-6xl
          px-4 py-8
          lg:px-8
        "
      >
        
        {/* Hero */}
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border border-black/5
            bg-[var(--surface)]
            shadow-sm
          "
        >
          
          {/* Banner */}
          <div
            className="
              bg-gradient-to-br
              from-[var(--primary)]
              via-[var(--primary)]/90
              to-emerald-500
              px-8 py-10
              text-white
            "
          >
            
            <div
              className="
                inline-flex items-center
                rounded-full
                bg-white/10
                px-4 py-1.5
                text-sm font-semibold
                backdrop-blur-md
              "
            >
              Seller Reputation
            </div>

            <div className="mt-6 flex items-start gap-4">
              
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-white/10
                  backdrop-blur-md
                "
              >
                <MessageCircle size={24} />
              </div>

              <div>
                
                <h1
                  className="
                    text-3xl font-bold
                    tracking-tight
                  "
                >
                  Seller Reviews
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm leading-relaxed
                    text-white/80
                  "
                >
                  Customer feedback,
                  marketplace trust,
                  and seller reputation
                  across F2CMARKET.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Summary */}
            <ProfileCard>
              
              <ProfileCardHeader
                title="Seller Rating Summary"
                description="Overall marketplace trust and customer satisfaction."
              />

              <div
                className="
                  mt-8
                  grid grid-cols-1
                  gap-6
                  md:grid-cols-3
                "
              >
                
                <SummaryCard
                  label="Average Rating"
                  value={`${averageRating}/5`}
                  icon={Star}
                />

                <SummaryCard
                  label="Total Reviews"
                  value={reviews.length}
                  icon={MessageCircle}
                />

                <SummaryCard
                  label="Trusted Seller"
                  value="Verified"
                  icon={BadgeCheck}
                />
              </div>
            </ProfileCard>

            {/* Reviews */}
            <ProfileCard>
              
              <ProfileCardHeader
                title="Customer Reviews"
                description="Recent marketplace feedback from buyers."
              />

              <div className="mt-8 space-y-5">
                
                {reviews.map(
                  (review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                    />
                  )
                )}
              </div>
            </ProfileCard>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Summary Card */
function SummaryCard({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-6
      "
    >
      
      <div
        className="
          flex h-12 w-12
          items-center justify-center
          rounded-2xl
          bg-[var(--primary)]/10
          text-[var(--primary)]
        "
      >
        <Icon size={22} />
      </div>

      <p
        className="
          mt-5
          text-sm
          text-[var(--text-secondary)]
        "
      >
        {label}
      </p>

      <h3
        className="
          mt-2
          text-3xl font-bold
          text-[var(--text-primary)]
        "
      >
        {value}
      </h3>
    </div>
  );
}

/* Review Card */
function ReviewCard({ review }) {
  return (
    <div
      className="
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-6
      "
    >
      
      <div
        className="
          flex flex-wrap items-center
          justify-between gap-4
        "
      >
        
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
              text-sm
              text-[var(--text-secondary)]
            "
          >
            {review.date}
          </p>
        </div>

        <div className="flex items-center gap-1">
          
          {Array.from({
            length: review.rating,
          }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className="
                fill-yellow-400
                text-yellow-400
              "
            />
          ))}
        </div>
      </div>

      <p
        className="
          mt-5
          text-sm leading-relaxed
          text-[var(--text-secondary)]
        "
      >
        {review.comment}
      </p>
    </div>
  );
}
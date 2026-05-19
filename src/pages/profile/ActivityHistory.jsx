import {
  History,
  ShoppingBag,
  Heart,
  Package,
  User2,
  Clock3,
} from "lucide-react";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

export default function ActivityHistory() {
  const activities = [
    {
      id: 1,

      title:
        "Updated Profile Information",

      description:
        "You updated your account profile and marketplace information.",

      time: "2 hours ago",

      icon: User2,
    },

    {
      id: 2,

      title:
        "Added Product to Wishlist",

      description:
        "You added Organic Tomatoes to your wishlist.",

      time: "Yesterday",

      icon: Heart,
    },

    {
      id: 3,

      title:
        "Placed Marketplace Order",

      description:
        "You placed an order for Fresh Mangoes from Green Valley Farm.",

      time: "2 days ago",

      icon: ShoppingBag,
    },

    {
      id: 4,

      title:
        "Published New Product",

      description:
        "You published Fresh Carrots to the marketplace.",

      time: "4 days ago",

      icon: Package,
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      
      <section
        className="
          mx-auto
          max-w-5xl
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
              Marketplace Timeline
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
                <History size={24} />
              </div>

              <div>
                
                <h1
                  className="
                    text-3xl font-bold
                    tracking-tight
                  "
                >
                  Activity History
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm leading-relaxed
                    text-white/80
                  "
                >
                  Track your recent
                  marketplace activities,
                  profile updates, and
                  account actions across
                  F2CMARKET.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 md:p-8">
            
            <ProfileCard>
              
              <ProfileCardHeader
                title="Recent Activity"
                description="Your latest account and marketplace actions."
              />

              <div className="mt-8 space-y-6">
                
                {activities.map(
                  (activity) => (
                    <ActivityItem
                      key={
                        activity.id
                      }
                      {...activity}
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

/* Activity Item */
function ActivityItem({
  title,
  description,
  time,
  icon: Icon,
}) {
  return (
    <div
      className="
        relative
        flex gap-5
      "
    >
      
      {/* Timeline */}
      <div className="flex flex-col items-center">
        
        <div
          className="
            z-10
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-[var(--primary)]/10
            text-[var(--primary)]
          "
        >
          <Icon size={22} />
        </div>

        <div
          className="
            mt-2
            h-full w-px
            bg-black/5
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          flex-1
          rounded-2xl
          border border-black/5
          bg-[var(--surface-2)]
          p-5
        "
      >
        
        <div
          className="
            flex flex-wrap items-center
            justify-between gap-3
          "
        >
          
          <h3
            className="
              text-base font-semibold
              text-[var(--text-primary)]
            "
          >
            {title}
          </h3>

          <div
            className="
              inline-flex items-center gap-2
              text-xs font-medium
              text-[var(--text-secondary)]
            "
          >
            <Clock3 size={14} />

            {time}
          </div>
        </div>

        <p
          className="
            mt-3
            text-sm leading-relaxed
            text-[var(--text-secondary)]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}
import {
  TrendingUp,
  Package,
  Users,
  BadgeIndianRupee,
} from "lucide-react";

import DashboardCard from "@/components/dashboard/shared/DashboardCard";

const insights = [
  {
    title: "Revenue Growth",
    description:
      "Marketplace revenue increased by 18% compared to last month.",

    icon: BadgeIndianRupee,
  },

  {
    title: "Top Performing Product",
    description:
      "Organic Tomatoes generated the highest marketplace sales this month.",

    icon: Package,
  },

  {
    title: "Customer Engagement",
    description:
      "Returning customer activity increased significantly this quarter.",

    icon: Users,
  },

  {
    title: "Marketplace Trend",
    description:
      "Order activity continues to grow steadily across all categories.",

    icon: TrendingUp,
  },
];

export default function AnalyticsInsights() {
  return (
    <section>
      <div
        className="
          grid grid-cols-1
          gap-4

          lg:grid-cols-2
        "
      >
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <DashboardCard
              key={insight.title}
              className="min-w-0"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Icon */}
                <div
                  className="
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center

                    rounded-2xl

                    bg-[var(--primary)]/10
                    text-[var(--primary)]

                    sm:h-12
                    sm:w-12
                  "
                >
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3
                    className="
                      text-base font-semibold
                      leading-snug

                      text-[var(--text-primary)]

                      sm:text-lg
                    "
                  >
                    {insight.title}
                  </h3>

                  <p
                    className="
                      mt-2

                      text-xs leading-relaxed
                      text-[var(--text-secondary)]

                      sm:text-sm
                    "
                  >
                    {insight.description}
                  </p>
                </div>
              </div>
            </DashboardCard>
          );
        })}
      </div>
    </section>
  );
}
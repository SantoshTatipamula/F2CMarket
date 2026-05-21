import { ShoppingBag, Package, Star, ShieldCheck } from "lucide-react";

import { Link } from "react-router-dom";

import ProfileSectionHeader from "@/components/profile/shared/ProfileSectionHeader";

import ActivityItem from "@/components/dashboard/shared/DashboardActivityItem";

export default function RecentActivity() {
  const activities = [
    {
      title: "Order completed successfully",
      description: "Your marketplace order was delivered successfully.",
      time: "2 hours ago",
      icon: ShoppingBag,
    },

    {
      title: "New product added",
      description: "Fresh Organic Tomatoes added to marketplace inventory.",
      time: "Yesterday",
      icon: Package,
    },

    {
      title: "Received new review",
      description: "A customer rated your marketplace service 5 stars.",
      time: "2 days ago",
      icon: Star,
    },

    {
      title: "Profile verification updated",
      description: "Your seller verification status was approved.",
      time: "Last week",
      icon: ShieldCheck,
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
        title="Recent Activity"
        description="Track your latest marketplace actions and engagement."
      />

      {/* Timeline */}
      <div className="mt-8 space-y-5">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Link
          to="/profile/activity"
          className="
          inline-flex items-center
          justify-center

          rounded-2xl

          border border-black/5
          bg-[var(--surface-2)]

          px-5 py-3

          text-sm font-semibold
          text-[var(--text-primary)]

          transition-all duration-300
          hover:border-[var(--primary)]/20
          hover:bg-[var(--primary)]/5
          hover:text-[var(--primary)]
        "
        >
          View All
        </Link>
      </div>
    </section>
  );
}

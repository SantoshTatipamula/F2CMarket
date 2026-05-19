import {
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";

import StatCard from "@/components/dashboard/shared/DashboardStatCard";

export default function ProfileStats() {
  const stats = [
    {
      title: "Products",
      value: "24",
      icon: Package,
      description:
        "Active marketplace listings",
    },

    {
      title: "Orders",
      value: "128",
      icon: ShoppingBag,
      description:
        "Completed platform orders",
    },

    {
      title: "Rating",
      value: "4.9",
      icon: Star,
      description:
        "Marketplace customer rating",
    },

    {
      title: "Growth",
      value: "+18%",
      icon: TrendingUp,
      description:
        "Monthly marketplace engagement",
    },
  ];

  return (
    <section
      className="
        grid grid-cols-1
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
}
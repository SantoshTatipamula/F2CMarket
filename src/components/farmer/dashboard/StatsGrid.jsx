import {
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

import DashboardCard from "./DashboardCard";

const stats = [
  {
    title: "Total Earnings",
    value: "₹12,450",
    icon: DollarSign,
    trend: "+18%",
    trendLabel: "vs last month",
    color: "text-green-500",
  },

  {
    title: "Products",
    value: "24",
    icon: Package,
    trend: "+4",
    trendLabel: "new products",
    color: "text-orange-500",
  },

  {
    title: "Orders",
    value: "86",
    icon: ShoppingBag,
    trend: "+12%",
    trendLabel: "vs last week",
    color: "text-blue-500",
  },

  {
    title: "Growth",
    value: "32%",
    icon: TrendingUp,
    trend: "+6%",
    trendLabel: "customer growth",
    color: "text-purple-500",
  },
];

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <DashboardCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          trendLabel={stat.trendLabel}
          color={stat.color}
        />
      ))}
    </section>
  );
}
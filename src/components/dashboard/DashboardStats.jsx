import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
} from "lucide-react";

import AnalyticsStatCard from "@/components/dashboard/analytics/AnalyticsStatCard";

export default function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹48,520",
      growth: "+18%",
      icon: DollarSign,
    },

    {
      title: "Orders",
      value: "1,284",
      growth: "+12%",
      icon: ShoppingBag,
    },

    {
      title: "Customers",
      value: "842",
      growth: "+9%",
      icon: Users,
    },

    {
      title: "Growth",
      value: "24%",
      growth: "+6%",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      className="
        grid grid-cols-2
        gap-4

        lg:grid-cols-4
      "
    >
      {stats.map((stat) => (
        <AnalyticsStatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
}
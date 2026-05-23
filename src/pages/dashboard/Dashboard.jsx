import { Package, ShoppingCart, Wallet, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import FarmerOverview from "@/components/dashboard/FarmerOverview";
import ConsumerOverview from "@/components/dashboard/ConsumerOverview";
import AdminOverview from "@/components/dashboard/AdminOverview";
import RevenuePreviewChart from "@/components/dashboard/analytics/RevenuePreviewChart";

export default function Dashboard() {
  const { user } = useAuth();

  const isFarmer = user?.role === "farmer";

  const isConsumer = user?.role === "consumer";

  const isAdmin = user?.role === "admin";

  /* Dashboard Stats */
  const stats = [
    {
      title: "Products",
      value: "24",
      icon: Package,
      trend: "+12%",
      trendLabel: "this month",
    },

    {
      title: "Orders",
      value: "148",
      icon: ShoppingCart,
      trend: "+18%",
      trendLabel: "marketplace growth",
    },

    {
      title: "Revenue",
      value: "₹48K",
      icon: Wallet,
      trend: "+9%",
      trendLabel: "this month",
    },

    {
      title: "Customers",
      value: "320",
      icon: Users,
      trend: "+22%",
      trendLabel: "active buyers",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section
        className="
    mx-auto
    w-full
    max-w-7xl
    space-y-8
    px-4
    py-6
    sm:px-6
    lg:px-8
    lg:py-8
  "
      >
        {/* Header */}
        <DashboardHeader />

        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Main Grid */}
        <div
          className="
            grid grid-cols-1
            gap-8
            xl:grid-cols-[1.3fr_0.7fr]
          "
        >
          {/* LEFT */}
          <div className="space-y-8">
            {/* Farmer */}
            {isFarmer && <FarmerOverview />}

            {/* Consumer */}
            {isConsumer && <ConsumerOverview />}

            {/* Admin */}
            {isAdmin && <AdminOverview />}

            {/* Activity */}
            <RecentActivity />
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Actions */}
            <QuickActions />

            {/* Revenue Preview  */}
            <RevenuePreviewChart/>
          </div>
        </div>
      </section>
    </main>
  );
}

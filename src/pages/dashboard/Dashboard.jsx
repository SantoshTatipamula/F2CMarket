import { Package, ShoppingCart, Wallet, Users } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { getFarmerOrders } from "@/services/orderService";

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
  const { products } = useProducts();

  const isFarmer = user?.role === "farmer";

  const isConsumer = user?.role === "consumer";

  const isAdmin = user?.role === "admin";


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
        <DashboardStats />

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
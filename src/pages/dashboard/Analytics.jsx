import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import DashboardStats from "@/components/dashboard/DashboardStats";

import RevenueBarChart from "@/components/dashboard/analytics/RevenueBarChart";

import OrdersLineChart from "@/components/dashboard/analytics/OrdersLineChart";

import ProductPerformanceChart from "@/components/dashboard/analytics/ProductPerformanceChart";

import CustomerGrowthChart from "@/components/dashboard/analytics/CustomerGrowthChart";

import AnalyticsSection from "@/components/dashboard/analytics/AnalyticsSection";

import AnalyticsInsights from "@/components/dashboard/analytics/AnalyticsInsights";

import AnalyticsFilterBar from "@/components/dashboard/analytics/AnalyticsFilterBar";

export default function Analytics() {
  return (
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
      <WorkspaceHeader
        title="Analytics"
        description="
          Monitor marketplace growth,
          revenue trends, customer activity,
          and business performance insights.
        "
      />

      {/* Analytics Filters */}
      <AnalyticsFilterBar />

      {/* Analytics Stats */}
      <DashboardStats />

      {/* Revenue Analytics */}
      <AnalyticsSection
        title="Revenue Insights"
        description="
          Analyze marketplace revenue,
          earnings growth, and overall sales performance.
        "
      >
        <RevenueBarChart />
      </AnalyticsSection>

      {/* Marketplace Performance */}
      <AnalyticsSection
        title="Marketplace Performance"
        description="
          Track marketplace activity,
          orders growth, and top-performing products.
        "
      >
        <div
          className="
            grid grid-cols-1
            gap-6

            xl:grid-cols-2
          "
        >
          <OrdersLineChart />

          <ProductPerformanceChart />
        </div>
      </AnalyticsSection>

      {/* Customer Intelligence */}
      <AnalyticsSection
        title="Customer Intelligence"
        description="
          Understand customer acquisition,
          marketplace engagement, and growth trends.
        "
      >
        <CustomerGrowthChart />
      </AnalyticsSection>

      {/* Marketplace Insights */}
      <AnalyticsSection
        title="Marketplace Insights"
        description="
          AI-style marketplace observations
          and business performance summaries.
        "
      >
        <AnalyticsInsights />
      </AnalyticsSection>
    </section>
  );
}
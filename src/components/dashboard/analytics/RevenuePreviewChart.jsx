import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

import DashboardCard from "@/components/dashboard/shared/DashboardCard";

import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

const revenueData = [
  {
    month: "Jan",
    revenue: 12000,
  },

  {
    month: "Feb",
    revenue: 18000,
  },

  {
    month: "Mar",
    revenue: 15000,
  },

  {
    month: "Apr",
    revenue: 24000,
  },

  {
    month: "May",
    revenue: 30000,
  },

  {
    month: "Jun",
    revenue: 28000,
  },
];

export default function RevenuePreviewChart() {
  return (
    <DashboardCard>
      {/* Header */}
      <DashboardCardHeader
        title="Revenue Overview"
        description="
          Marketplace revenue growth
          over the last 6 months.
        "
      />

      {/* Chart */}
      <div className="mt-8 h-[220px] sm:h-[260px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 11,
              }}
              interval="preserveStartEnd"
              minTickGap={24}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}

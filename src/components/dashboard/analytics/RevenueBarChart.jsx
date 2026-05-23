import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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
    revenue: 32000,
  },

  {
    month: "Jun",
    revenue: 28000,
  },
];

export default function RevenueBarChart() {
  return (
    <DashboardCard className="min-w-0">
      
      {/* Header */}
      <DashboardCardHeader
        title="Revenue Analytics"
        description="
          Track marketplace revenue growth,
          monthly earnings, and sales performance trends.
        "
      />

      {/* Chart */}
      <div
        className="
          mt-8
          h-[300px]
          w-full
          min-w-0

          sm:h-[360px]
          lg:h-[420px]
        "
      >
        
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={revenueData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            
            {/* Grid */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              strokeOpacity={0.08}
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}

              tick={{
                fontSize: 11,
              }}

              interval="preserveStartEnd"
              minTickGap={16}
            />

            {/* Y Axis */}
            <YAxis
              tickLine={false}
              axisLine={false}

              tick={{
                fontSize: 11,
              }}

              tickFormatter={(value) =>
                `₹${value / 1000}k`
              }
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                fill: "rgba(0,0,0,0.03)",
              }}

              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.06)",
                backgroundColor: "white",
              }}

              formatter={(value) => [
                `₹${value.toLocaleString()}`,
                "Revenue",
              ]}
            />

            {/* Bars */}
            <Bar
              dataKey="revenue"

              radius={[12, 12, 0, 0]}

              fill="var(--primary)"

              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
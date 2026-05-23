import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import DashboardCard from "@/components/dashboard/shared/DashboardCard";

import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

const ordersData = [
  {
    month: "Jan",
    orders: 45,
  },

  {
    month: "Feb",
    orders: 62,
  },

  {
    month: "Mar",
    orders: 58,
  },

  {
    month: "Apr",
    orders: 90,
  },

  {
    month: "May",
    orders: 120,
  },

  {
    month: "Jun",
    orders: 98,
  },
];

export default function OrdersLineChart() {
  return (
    <DashboardCard className="min-w-0">
      
      {/* Header */}
      <DashboardCardHeader
        title="Orders Trend"
        description="
          Monitor marketplace order growth,
          customer demand, and sales activity trends.
        "
      />

      {/* Chart */}
      <div
        className="
          mt-8
          h-[280px]
          w-full
          min-w-0

          sm:h-[320px]
        "
      >
        
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={ordersData}
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
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                stroke: "var(--primary)",
                strokeOpacity: 0.15,
              }}

              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.06)",
                backgroundColor: "white",
              }}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="orders"

              stroke="var(--primary)"
              strokeWidth={3}

              dot={{
                r: 4,
              }}

              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
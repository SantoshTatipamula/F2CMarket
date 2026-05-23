import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import DashboardCard from "@/components/dashboard/shared/DashboardCard";

import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

const customerGrowthData = [
  {
    month: "Jan",
    customers: 120,
  },

  {
    month: "Feb",
    customers: 180,
  },

  {
    month: "Mar",
    customers: 240,
  },

  {
    month: "Apr",
    customers: 320,
  },

  {
    month: "May",
    customers: 420,
  },

  {
    month: "Jun",
    customers: 520,
  },
];

export default function CustomerGrowthChart() {
  return (
    <DashboardCard className="min-w-0">
      
      {/* Header */}
      <DashboardCardHeader
        title="Customer Growth"
        description="
          Analyze customer acquisition,
          marketplace engagement, and user growth trends.
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
          <AreaChart
            data={customerGrowthData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            
            {/* Gradient */}
            <defs>
              
              <linearGradient
                id="customerGrowthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
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
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.06)",
                backgroundColor: "white",
              }}
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="customers"

              stroke="var(--primary)"
              strokeWidth={3}

              fill="url(#customerGrowthGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
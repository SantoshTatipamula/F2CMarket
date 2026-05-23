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

const productData = [
  {
    product: "Tomatoes",
    sales: 420,
  },

  {
    product: "Potatoes",
    sales: 310,
  },

  {
    product: "Onions",
    sales: 280,
  },

  {
    product: "Carrots",
    sales: 240,
  },

  {
    product: "Spinach",
    sales: 190,
  },
];

export default function ProductPerformanceChart() {
  return (
    <DashboardCard className="min-w-0">
      
      {/* Header */}
      <DashboardCardHeader
        title="Product Performance"
        description="
          Compare product sales performance
          and marketplace demand trends.
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
          <BarChart
            data={productData}
            layout="vertical"

            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            
            {/* Grid */}
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              strokeOpacity={0.08}
            />

            {/* X Axis */}
            <XAxis
              type="number"

              tickLine={false}
              axisLine={false}

              tick={{
                fontSize: 11,
              }}
            />

            {/* Y Axis */}
            <YAxis
              type="category"
              dataKey="product"

              tickLine={false}
              axisLine={false}

              tick={{
                fontSize: 11,
              }}

              width={80}
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
            />

            {/* Bars */}
            <Bar
              dataKey="sales"

              fill="var(--primary)"

              radius={[0, 12, 12, 0]}

              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
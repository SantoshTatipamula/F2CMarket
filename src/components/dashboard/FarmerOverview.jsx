import {
  ArrowUpRight,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import DashboardCard from "@/components/dashboard/shared/DashboardCard";

import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function FarmerOverview() {
  const overview = [
    {
      label: "Active Products",
      value: "24",
      icon: Package,
    },

    {
      label: "Pending Orders",
      value: "12",
      icon: ShoppingCart,
    },

    {
      label: "Monthly Growth",
      value: "+18%",
      icon: TrendingUp,
    },

    {
      label: "Low Stock Alerts",
      value: "3",
      icon: AlertTriangle,
    },
  ];

  return (
    <DashboardCard>
      
      {/* Header */}
      <DashboardCardHeader
        title="Farmer Overview"
        description="
          Monitor your marketplace performance,
          product activity, and operational growth.
        "
      />

      {/* Overview Grid */}
      <div
        className="
          mt-8
          grid grid-cols-2
          gap-4
          lg:grid-cols-4
        "
      >
        {overview.map(
          ({
            label,
            value,
            icon: Icon,
          }) => (
            <div
              key={label}
              className="
                rounded-2xl
                border border-black/5
                bg-[var(--surface-2)]

                p-4

                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              
              {/* Icon */}
              <div
                className="
                  flex h-12 w-12
                  items-center justify-center

                  rounded-2xl

                  bg-[var(--primary)]/10
                  text-[var(--primary)]
                "
              >
                <Icon size={22} />
              </div>

              {/* Value */}
              <h3
                className="
                  mt-5

                  text-2xl font-bold
                  tracking-tight

                  text-[var(--text-primary)]
                "
              >
                {value}
              </h3>

              {/* Label */}
              <p
                className="
                  mt-2

                  text-sm leading-relaxed
                  text-[var(--text-secondary)]
                "
              >
                {label}
              </p>
            </div>
          )
        )}
      </div>

      {/* Bottom Summary */}
      <div
        className="
          mt-8

          flex flex-col gap-4

          rounded-2xl
          border border-[var(--primary)]/10
          bg-[var(--primary)]/5

          p-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        
        {/* Left */}
        <div>
          
          <h3
            className="
              text-base font-semibold
              text-[var(--text-primary)]
            "
          >
            Top Performing Product
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-[var(--text-secondary)]
            "
          >
            Organic Tomatoes generated
            the highest marketplace sales
            this month.
          </p>
        </div>

        {/* Action */}
        <button
          className="
            inline-flex items-center gap-2

            rounded-2xl

            bg-[var(--primary)]

            px-5 py-3

            text-sm font-semibold
            text-white

            transition-all duration-300
            hover:opacity-90
          "
        >
          View Insights

          <ArrowUpRight size={18} />
        </button>
      </div>
    </DashboardCard>
  );
}
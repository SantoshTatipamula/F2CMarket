import { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useAuth }         from "@/context/AuthContext";
import { getFarmerOrders } from "@/services/orderService";
import DashboardCard       from "@/components/dashboard/shared/DashboardCard";
import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function CustomerGrowthChart() {
  const { user } = useAuth();

  const data = useMemo(() => {
    const orders  = user?.id ? getFarmerOrders(user.id) : [];
    const map     = {};
    orders.forEach(o => {
      const m = new Date(o.createdAt).toLocaleString("en-IN", { month: "short" });
      if (!map[m]) map[m] = new Set();
      map[m].add(o.consumerId);
    });
    return Object.entries(map).map(([month, set]) => ({ month, customers: set.size }));
  }, [user]);

  return (
    <DashboardCard>
      <DashboardCardHeader
        title="Customer Growth"
        description="Unique customers placing orders each month."
      />
      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-sm text-[var(--text-muted)]">
          Customer data appears after your first orders.
        </div>
      ) : (
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--primary)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="customers" stroke="var(--primary)" strokeWidth={2} fill="url(#custGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}

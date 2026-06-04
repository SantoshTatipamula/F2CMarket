import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useAuth }         from "@/context/AuthContext";
import { getFarmerOrders } from "@/services/orderService";
import DashboardCard       from "@/components/dashboard/shared/DashboardCard";
import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function ProductPerformanceChart() {
  const { user } = useAuth();

  const data = useMemo(() => {
    const orders  = user?.id ? getFarmerOrders(user.id) : [];
    const map     = {};
    orders.forEach(o =>
      (o.items || []).forEach(i => {
        map[i.name] = (map[i.name] || 0) + i.quantity;
      })
    );
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, units]) => ({ name, units }));
  }, [user]);

  return (
    <DashboardCard>
      <DashboardCardHeader
        title="Product Performance"
        description="Top products by total units sold."
      />
      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-sm text-[var(--text-muted)]">
          Product performance data appears after orders are placed.
        </div>
      ) : (
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="units" fill="var(--primary)" radius={[0,6,6,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}

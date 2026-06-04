import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useAuth }         from "@/context/AuthContext";
import { getFarmerOrders } from "@/services/orderService";
import DashboardCard       from "@/components/dashboard/shared/DashboardCard";
import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function OrdersLineChart() {
  const { user } = useAuth();

  const data = useMemo(() => {
    const orders = user?.id ? getFarmerOrders(user.id) : [];
    const map    = {};
    orders.forEach(o => {
      const m = new Date(o.createdAt).toLocaleString("en-IN", { month: "short" });
      map[m] = (map[m] || 0) + 1;
    });
    return Object.entries(map).map(([month, orders]) => ({ month, orders }));
  }, [user]);

  return (
    <DashboardCard>
      <DashboardCardHeader
        title="Order Trends"
        description="Monthly order volume received from consumers."
      />
      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-sm text-[var(--text-muted)]">
          Order trend data appears after your first orders.
        </div>
      ) : (
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}

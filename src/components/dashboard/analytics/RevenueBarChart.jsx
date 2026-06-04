import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useAuth }         from "@/context/AuthContext";
import { getFarmerOrders } from "@/services/orderService";
import DashboardCard       from "@/components/dashboard/shared/DashboardCard";
import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function RevenueBarChart() {
  const { user } = useAuth();

  const data = useMemo(() => {
    const orders  = user?.id ? getFarmerOrders(user.id) : [];
    const map     = {};
    orders.filter(o => o.orderStatus === "Delivered").forEach(o => {
      const m = new Date(o.createdAt).toLocaleString("en-IN", { month: "short" });
      const rev = (o.items || []).reduce((s, i) => s + (i.subtotal || 0), 0);
      map[m] = (map[m] || 0) + rev;
    });
    return Object.entries(map).map(([month, revenue]) => ({ month, revenue }));
  }, [user]);

  return (
    <DashboardCard>
      <DashboardCardHeader
        title="Revenue Overview"
        description="Monthly revenue from delivered orders."
      />
      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-sm text-[var(--text-muted)]">
          Revenue data appears once orders are delivered.
        </div>
      ) : (
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v}`} />
              <Tooltip formatter={v => [`₹${v}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="var(--primary)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
}

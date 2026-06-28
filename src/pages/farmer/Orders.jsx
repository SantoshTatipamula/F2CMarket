import { useEffect, useMemo, useState } from "react";
import { Package } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { getFarmerOrders, updateOrderStatus } from "@/services/orderService";

import FarmerOrderCard from "@/components/farmer/orders/FarmerOrderCard";
import EmptyState from "@/components/common/ui/EmptyState";
import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";
import OrdersSummary from "@/components/order/OrdersSummary";

const STATUS_FILTERS = [
  "All",
  "Pending",
  "Accepted",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function FarmerOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeFilter, setFilter] = useState("All");

 const loadOrders = () => {
  if (!user?.id) return;
  setOrders(getFarmerOrders(user.id));
};

useEffect(() => {
  loadOrders();
}, [user]);

const handleStatusUpdate = async (orderId, newStatus) => {
  await updateOrderStatus(orderId, newStatus);
  loadOrders();
};

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? orders
        : orders.filter((o) => o.orderStatus === activeFilter),
    [orders, activeFilter],
  );

  const stats = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.orderStatus === "Pending").length,
      delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
      cancelled: orders.filter((o) => o.orderStatus === "Cancelled").length,
    }),
    [orders],
  );

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <WorkspaceHeader
        title="Orders"
        description="Manage and update customer order statuses."
      />

      {orders.length > 0 && <OrdersSummary stats={stats} />}

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
              activeFilter === status
                ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-green-400"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="Customer orders for your products will appear here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((order) => (
            <FarmerOrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </section>
  );
}

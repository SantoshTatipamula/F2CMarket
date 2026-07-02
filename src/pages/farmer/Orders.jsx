import { useEffect, useMemo, useState, useCallback } from "react";
import { Package } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  getFarmerOrders,
  updateOrderStatus,
  refreshOrdersFromFirestore,
} from "@/services/orderService";

import FarmerOrderCard from "@/components/farmer/orders/FarmerOrderCard";
import EmptyState from "@/components/common/ui/EmptyState";
import ErrorState from "@/components/common/ui/ErrorState";
import ListItemSkeleton from "@/components/common/loaders/ListItemSkeleton";
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
  const [orders, setOrders] = useState(() =>
    user?.id ? getFarmerOrders(user.id) : [],
  );
  const [activeFilter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      await refreshOrdersFromFirestore(user.id, "farmer");
      // getFarmerOrders re-reads + filters the freshly-cached data by farmerId
      setOrders(getFarmerOrders(user.id));
      setError(null);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    if (user?.id) setOrders(getFarmerOrders(user.id));
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

      {error && (
        <ErrorState
          title="Couldn't refresh orders"
          description={
            orders.length > 0
              ? "Showing your most recently loaded orders. Some information may be out of date."
              : "We ran into a problem loading orders. Please try again."
          }
          onRetry={loadOrders}
        />
      )}

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

      {loading && orders.length === 0 && !error ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <ListItemSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 && !error ? (
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="Customer orders for your products will appear here."
        />
      ) : filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((order) => (
            <FarmerOrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

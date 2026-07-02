import { useEffect, useMemo, useState, useCallback } from "react";
import { Package } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  getConsumerOrders,
  refreshOrdersFromFirestore,
} from "@/services/orderService";

import OrderCard from "@/components/order/OrderCard";
import OrdersSummary from "@/components/order/OrdersSummary";
import EmptyState from "@/components/common/ui/EmptyState";
import ErrorState from "@/components/common/ui/ErrorState";
import PageHeader from "@/components/common/ui/PageHeader";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import ListItemSkeleton from "@/components/common/loaders/ListItemSkeleton";

export default function Orders() {
  const { user } = useAuth();
  // Show cached orders instantly (if any) while the fresh fetch runs.
  const [orders, setOrders] = useState(() =>
    user?.id ? getConsumerOrders(user.id) : [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const fresh = await refreshOrdersFromFirestore(user.id, "consumer");
      setOrders(fresh);
      setError(null);
    } catch (err) {
      console.error("Failed to load orders:", err);
      // Keep showing the cached orders on failure — just surface the error too.
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  /* Called by OrderCard after cancel so list updates instantly */
  const handleOrderUpdate = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)),
    );
  };

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
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Breadcrumb items={[{ label: "My Orders" }]} />
        <PageHeader
          title="My Orders"
          subtitle="Track and review your purchases."
        />

        {orders.length > 0 && <OrdersSummary stats={stats} />}

        {error && (
          <div className="mt-6">
            <ErrorState
              title="Couldn't refresh your orders"
              description={
                orders.length > 0
                  ? "Showing your most recently loaded orders. Some information may be out of date."
                  : "We ran into a problem loading your orders. Please try again."
              }
              onRetry={loadOrders}
            />
          </div>
        )}

        {loading && orders.length === 0 && !error ? (
          <div className="mt-6 grid gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        ) : orders.length === 0 && !error ? (
          <EmptyState
            icon={Package}
            title="No Orders Yet"
            description="You haven't placed any orders yet."
            ctaLabel="Browse Products"
            ctaHref="/products"
          />
        ) : orders.length > 0 ? (
          <div className="mt-6 grid gap-5">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onOrderUpdate={handleOrderUpdate}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState, useCallback } from "react";
import { Package } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { getConsumerOrders } from "@/services/orderService";

import OrderCard from "@/components/order/OrderCard";
import OrdersSummary from "@/components/order/OrdersSummary";
import EmptyState from "@/components/common/ui/EmptyState";
import PageHeader from "@/components/common/ui/PageHeader";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(() => {
    if (!user?.id) return;
    
    setOrders(getConsumerOrders(user.id));
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

        {orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No Orders Yet"
            description="You haven't placed any orders yet."
            ctaLabel="Browse Products"
            ctaHref="/products"
          />
        ) : (
          <div className="mt-6 grid gap-5">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onOrderUpdate={handleOrderUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

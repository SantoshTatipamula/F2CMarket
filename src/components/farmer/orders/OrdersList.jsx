import EmptyState from "@/components/common/ui/EmptyState";

import FarmerOrderCard from "./FarmerOrderCard";

export default function OrdersList({
  orders = [],
}) {
  // Empty State
  if (!orders.length) {
    return (
      <EmptyState
        title="No Orders Found"
        description="Customer orders will appear here once purchases are made."
      />
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <FarmerOrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}
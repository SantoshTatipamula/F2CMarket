import {
  CalendarDays,
  CreditCard,
  Package,
} from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";

export default function FarmerOrderCard({
  order,
}) {
  const isPaid =
    order.paymentStatus === "Paid";

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-4">
      
      {/* Top Section */}
      <div className="flex items-start justify-between gap-3">
        
        <div>
          <h3 className="font-semibold text-[var(--text-primary)]">
            {order.customerName}
          </h3>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {order.id}
          </p>
        </div>

        <OrderStatusBadge
          status={order.status}
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Package size={16} />

          <span>
            {order.productName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <CalendarDays size={16} />

          <span>
            {order.orderDate}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CreditCard size={16} />

          <span
            className={
              isPaid
                ? "text-green-500"
                : "text-orange-500"
            }
          >
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        
        <div>
          <p className="text-xs text-[var(--text-secondary)]">
            Quantity
          </p>

          <p className="font-medium">
            {order.quantity}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-[var(--text-secondary)]">
            Total
          </p>

          <p className="text-lg font-bold text-[var(--primary)]">
            ₹{order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
}
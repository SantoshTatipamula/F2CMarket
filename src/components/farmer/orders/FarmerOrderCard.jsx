import { CalendarDays, CreditCard, MapPin, User } from "lucide-react";
import OrderStatusBadge from "@/components/order/shared/OrderStatusBadge";

/* Next logical status for each current state */
const NEXT_STATUS = {
  Pending:   { label: "Accept Order",  next: "Accepted"  },
  Accepted:  { label: "Mark Packed",   next: "Packed"    },
  Packed:    { label: "Mark Shipped",  next: "Shipped"   },
  Shipped:   { label: "Mark Delivered",next: "Delivered" },
};

export default function FarmerOrderCard({ order, onStatusUpdate }) {
  const nextStep = NEXT_STATUS[order.orderStatus];
  const canCancel = !["Delivered", "Cancelled"].includes(order.orderStatus);

  return (
    <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm overflow-hidden flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-5 py-4 bg-[var(--surface)] border-b border-[var(--border)]">
        <div>
          <p className="text-xs text-[var(--text-muted)]">Order ID</p>
          <p className="font-bold text-sm text-[var(--text-primary)]">#{order.id}</p>
        </div>
        <OrderStatusBadge status={order.orderStatus || "Pending"} />
      </div>

      <div className="p-5 space-y-4 flex-1">
        {/* Consumer */}
        <div className="flex items-center gap-2 text-sm">
          <User size={14} className="text-[var(--text-muted)] shrink-0" />
          <span className="font-medium text-[var(--text-primary)]">
            {order.consumer?.name || "Customer"}
          </span>
        </div>

        {/* Items */}
        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-10 rounded-lg object-cover border border-[var(--border)] shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.name}</p>
                <p className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-[var(--primary)] shrink-0">
                ₹{item.subtotal}
              </p>
            </div>
          ))}
        </div>

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
          {order.consumer?.address && (
            <div className="flex items-start gap-1.5">
              <MapPin size={12} className="shrink-0 mt-0.5" />
              <span>{order.consumer.address}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CreditCard size={12} />
            <span className="capitalize">{order.paymentMethod}</span>
            <span className={`font-semibold ${
              order.paymentStatus === "Paid" ? "text-green-600" : "text-orange-500"
            }`}>({order.paymentStatus})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays size={12} />
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)]">Order Total</p>
          <p className="text-base font-bold text-[var(--primary)]">₹{order.total}</p>
        </div>
      </div>

      {/* Action buttons */}
      {(nextStep || canCancel) && (
        <div className="px-5 pb-5 flex gap-2">
          {nextStep && (
            <button
              onClick={() => onStatusUpdate(order.id, nextStep.next)}
              className="flex-1 h-10 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold transition"
            >
              {nextStep.label}
            </button>
          )}
          {canCancel && (
            <button
              onClick={() => onStatusUpdate(order.id, "Cancelled")}
              className="h-10 px-4 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold transition"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

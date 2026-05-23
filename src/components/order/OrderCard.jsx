import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CalendarDays, MapPin, CreditCard, RefreshCw } from "lucide-react";
import OrderStatusBadge from "@/components/order/shared/OrderStatusBadge";

export default function OrderCard({ order }) {
  const { addToCart } = useCart();
  const navigate      = useNavigate();

  const visibleItems  = order.items.slice(0, 3);
  const extraCount    = order.items.length - 3;

  const handleReorder = () => {
    order.items.forEach((item) =>
      addToCart({
        id:           item.productId,
        name:         item.name,
        image:        item.image,
        price:        item.price,
        numericPrice: item.price,
        farmer:       item.farmerName,
        sellerId:     item.farmerId,
      }, item.quantity)
    );
    navigate("/cart");
  };

  return (
    <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm overflow-hidden">

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[var(--border)] bg-[var(--surface)]">
        <div>
          <p className="text-xs text-[var(--text-muted)]">Order ID</p>
          <p className="font-bold text-[var(--text-primary)] text-sm">#{order.id}</p>
        </div>

        <OrderStatusBadge status={order.orderStatus || order.status || "Pending"} />
      </div>

      <div className="p-5 space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {visibleItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-xl object-cover shrink-0 border border-[var(--border)]"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.name}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {item.farmerName} · Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] shrink-0">
                ₹{item.subtotal ?? item.price * item.quantity}
              </p>
            </div>
          ))}
          {extraCount > 0 && (
            <p className="text-xs text-[var(--text-muted)]">+{extraCount} more item{extraCount > 1 ? "s" : ""}</p>
          )}
        </div>

        {/* Meta row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={13} className="text-[var(--text-muted)]" />
            {new Date(order.createdAt || order.date).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </div>

          {order.consumer?.address && (
            <div className="flex items-center gap-1.5 truncate">
              <MapPin size={13} className="text-[var(--text-muted)] shrink-0" />
              <span className="truncate">{order.consumer.address}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <CreditCard size={13} className="text-[var(--text-muted)]" />
            <span className="capitalize">{order.paymentMethod}</span>
            <span className={`ml-1 font-medium ${
              order.paymentStatus === "Paid" ? "text-green-600" : "text-orange-500"
            }`}>
              ({order.paymentStatus || "Pending"})
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
          <div>
            <p className="text-xs text-[var(--text-muted)]">Order Total</p>
            <p className="text-lg font-bold text-[var(--primary)]">₹{order.total}</p>
          </div>

          <button
            onClick={handleReorder}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold transition"
          >
            <RefreshCw size={14} />
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
}

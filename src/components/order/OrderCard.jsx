import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { cancelOrder } from "@/services/orderService";
import { CalendarDays, MapPin, CreditCard, RefreshCw, XCircle, AlertTriangle } from "lucide-react";
import OrderStatusBadge from "@/components/order/shared/OrderStatusBadge";

const CANCELLABLE = ["Pending", "Accepted"];

export default function OrderCard({ order, onOrderUpdate }) {
  const { addToCart }  = useCart();
  const navigate       = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const visibleItems = order.items.slice(0, 3);
  const extraCount   = order.items.length - 3;
  const canCancel    = CANCELLABLE.includes(order.orderStatus);

  const handleReorder = () => {
    order.items.forEach((item) =>
      addToCart({
        id: item.productId, name: item.name, image: item.image,
        price: item.price, numericPrice: item.price,
        farmer: item.farmerName, sellerId: item.farmerId,
      }, item.quantity)
    );
    navigate("/cart");
  };

  const handleCancel = () => {
    const updated = cancelOrder(order.id);
    setShowConfirm(false);
    if (updated && onOrderUpdate) onOrderUpdate(updated);
  };

  return (
    <>
      <div className="bg-white border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4 bg-[var(--surface)] border-b border-[var(--border)]">
          <div>
            <p className="text-[11px] text-[var(--text-muted)]">Order ID</p>
            <p className="font-bold text-[var(--text-primary)] text-sm">#{order.id}</p>
          </div>
          <OrderStatusBadge status={order.orderStatus || "Pending"} />
        </div>

        <div className="p-4 sm:p-5 space-y-4">

          {/* Items */}
          <div className="space-y-3">
            {visibleItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.image && (
                  <img src={item.image} alt={item.name} className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl object-cover shrink-0 border border-[var(--border)]" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.farmerName} · Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)] shrink-0">
                  ₹{item.subtotal ?? item.price * item.quantity}
                </p>
              </div>
            ))}
            {extraCount > 0 && (
              <p className="text-xs text-[var(--text-muted)] pl-1">+{extraCount} more item{extraCount > 1 ? "s" : ""}</p>
            )}
          </div>

          {/* Meta — stacks on mobile */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={12} className="text-[var(--text-muted)] shrink-0" />
              {new Date(order.createdAt || order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </div>
            {order.consumer?.address && (
              <div className="flex items-center gap-1.5 max-w-[180px]">
                <MapPin size={12} className="text-[var(--text-muted)] shrink-0" />
                <span className="truncate">{order.consumer.address}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <CreditCard size={12} className="text-[var(--text-muted)]" />
              <span className="capitalize">{order.paymentMethod}</span>
              <span className={`font-medium ${order.paymentStatus === "Paid" ? "text-green-600" : "text-orange-500"}`}>
                ({order.paymentStatus || "Pending"})
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div>
              <p className="text-xs text-[var(--text-muted)]">Total</p>
              <p className="text-lg font-bold text-[var(--primary)]">₹{order.total}</p>
            </div>

            {/* Buttons — row on all screens, min 44px height */}
            <div className="flex items-center gap-2">
              {canCancel && (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center gap-1.5 h-10 px-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold transition active:scale-95"
                >
                  <XCircle size={14} />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
              )}
              <button
                onClick={handleReorder}
                className="flex items-center gap-1.5 h-10 px-3 sm:px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold transition active:scale-95"
              >
                <RefreshCw size={14} />
                <span>Reorder</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel confirmation — portal-style, safe on mobile */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle size={26} className="text-red-500" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] text-center">Cancel Order?</h3>
            <p className="text-sm text-[var(--text-secondary)] text-center mt-2 leading-6">
              Cancel order <span className="font-semibold">#{order.id}</span>? This cannot be undone.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="h-12 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface)] transition"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancel}
                className="h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition active:scale-95"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
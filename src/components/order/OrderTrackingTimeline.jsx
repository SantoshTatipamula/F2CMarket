import {
  CheckCircle2, Clock3, PackageCheck,
  Truck, ShoppingBag, XCircle,
} from "lucide-react";

const STEPS = [
  { status: "Pending",   label: "Order Placed",    icon: ShoppingBag,  desc: "Your order has been placed successfully."      },
  { status: "Accepted",  label: "Accepted",         icon: CheckCircle2, desc: "Farmer has accepted your order."               },
  { status: "Packed",    label: "Packed",           icon: PackageCheck, desc: "Your order is packed and ready for dispatch."  },
  { status: "Shipped",   label: "Out for Delivery", icon: Truck,        desc: "Your order is on the way to you."              },
  { status: "Delivered", label: "Delivered",        icon: CheckCircle2, desc: "Order delivered successfully. Enjoy!"          },
];

const STATUS_ORDER = ["Pending", "Accepted", "Packed", "Shipped", "Delivered"];

export default function OrderTrackingTimeline({ order }) {
  const isCancelled    = order.orderStatus === "Cancelled";
  const currentIndex   = STATUS_ORDER.indexOf(order.orderStatus);
  const statusHistory  = order.statusHistory || [];

  /* Get timestamp for a status from history */
  const getTimestamp = (status) => {
    const entry = statusHistory.find(h => h.status === status);
    if (!entry) return null;
    return new Date(entry.timestamp).toLocaleString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 mt-4">
        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <XCircle size={20} className="text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-red-700">Order Cancelled</p>
          <p className="text-xs text-red-500 mt-0.5">
            {getTimestamp("Cancelled") || ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-[var(--border)]">
      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-4">
        Delivery Tracking
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[var(--border)]" />

        <div className="space-y-5">
          {STEPS.map((step, i) => {
            const Icon       = step.icon;
            const isDone     = i <= currentIndex;
            const isActive   = i === currentIndex;
            const timestamp  = getTimestamp(step.status);

            return (
              <div key={step.status} className="flex items-start gap-4 relative">
                {/* Step circle */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all ${
                  isDone
                    ? "bg-[var(--primary)] border-[var(--primary)]"
                    : "bg-white border-[var(--border)]"
                }`}>
                  {isDone
                    ? <Icon size={14} className="text-white" />
                    : <Clock3 size={14} className="text-[var(--text-muted)]" />
                  }
                </div>

                {/* Step content */}
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-semibold ${isDone ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
                      {step.label}
                    </p>
                    {isActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary)] text-white">
                        Current
                      </span>
                    )}
                  </div>
                  {isDone && (
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{step.desc}</p>
                  )}
                  {timestamp && (
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{timestamp}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated delivery */}
      {order.estimatedDelivery && currentIndex < STATUS_ORDER.indexOf("Delivered") && (
        <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-200">
          <Truck size={15} className="text-[var(--primary)] shrink-0" />
          <p className="text-xs text-green-800">
            <span className="font-semibold">Estimated delivery: </span>
            {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
              weekday: "long", day: "numeric", month: "long",
            })}
            {order.deliverySlot && (
              <span className="ml-1">
                ({order.deliverySlot === "morning" ? "7 AM – 12 PM" : order.deliverySlot === "afternoon" ? "12 PM – 5 PM" : "5 PM – 9 PM"})
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

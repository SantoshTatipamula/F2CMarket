import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Package, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import { getOrders } from "@/services/orderService";

export default function OrderSuccess() {
  const location = useLocation();
  const orderId  = location.state?.orderId;

  /* Try to fetch the full order so we can show a receipt */
  const order = orderId
    ? getOrders().find((o) => o.id === orderId)
    : null;

  return (
    <section className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <Breadcrumb items={[
          { label: "Cart",     href: "/cart"     },
          { label: "Checkout", href: "/checkout" },
          { label: "Order Confirmed" },
        ]} />

        <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm p-8">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-[var(--primary)]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[var(--text-primary)] text-center">
            Order Placed Successfully!
          </h1>
          <p className="text-[var(--text-secondary)] mt-2 text-center text-sm leading-6">
            Thank you for shopping with F2CMARKET. Fresh products will be delivered directly from farmers.
          </p>

          {/* Order ID */}
          <div className="mt-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] px-5 py-4 text-center">
            <p className="text-xs text-[var(--text-muted)]">Order ID</p>
            <p className="text-lg font-bold text-[var(--text-primary)] mt-0.5">#{orderId || "—"}</p>
          </div>

          {/* Receipt preview */}
          {order && (
            <div className="mt-5 space-y-3">
              {/* Items */}
              <div className="rounded-2xl border border-[var(--border)] p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2">
                  <Package size={15} /> Items Ordered
                </div>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.subtotal}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold text-[var(--primary)]">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>

              {/* Delivery & Payment */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[var(--text-secondary)]">
                <div className="rounded-xl border border-[var(--border)] p-3 flex items-start gap-2">
                  <MapPin size={13} className="shrink-0 mt-0.5" />
                  <span>{order.consumer?.address}</span>
                </div>
                <div className="rounded-xl border border-[var(--border)] p-3 flex items-center gap-2">
                  <CreditCard size={13} />
                  <span className="capitalize">{order.paymentMethod} · {order.paymentStatus}</span>
                </div>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <Link to="/products">
              <Button className="w-full h-12 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/orders">
              <Button variant="outline" className="w-full h-12 rounded-xl">
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

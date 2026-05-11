import { Card, CardContent } from "@/components/ui/card";
import { parsePrice } from "@/utils/parsePrice";

export default function OrderSummary({
  cartItems,
  cartTotal,
  deliveryFee,
  finalTotal,
}) {
  return (
    <Card className="rounded-2xl border-[var(--border)] shadow-sm">
      <CardContent className="p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Order Summary
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Review your items before placing order.
          </p>
        </div>

        {/* Item List */}
        <div className="space-y-3 border-b pb-4">
          {cartItems.map((item) => {
            const lineTotal = parsePrice(item.price) * item.quantity;
            return (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-[var(--text-primary)] truncate">
                    {item.name}
                  </p>
                  <p className="text-[var(--text-secondary)] text-xs mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-[var(--text-primary)] whitespace-nowrap">
                  ₹{lineTotal}
                </p>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Subtotal</span>
            <span className="font-medium text-[var(--text-primary)]">
              ₹{cartTotal}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Delivery Fee</span>
            <span className="font-medium text-[var(--text-primary)]">
              {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between text-base font-semibold">
            <span className="text-[var(--text-primary)]">Total</span>
            <span className="text-[var(--primary)]">₹{finalTotal}</span>
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-5">
          Fresh products packed carefully and delivered directly from farmers.
        </p>
      </CardContent>
    </Card>
  );
}

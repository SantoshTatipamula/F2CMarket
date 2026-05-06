import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderCard({ order, onReorder }) {
  const visibleItems = order.items.slice(0, 3);

  return (
    <Card className="rounded-2xl border-[var(--border)] shadow-sm">
      <CardContent className="p-5 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-[var(--text-secondary)]">
              Order ID
            </p>
            <p className="font-semibold text-[var(--text-primary)]">
              #{order.id}
            </p>

            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {new Date(order.date).toLocaleString()}
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            {order.status}
          </span>
        </div>

        {/* Items Preview */}
        <div className="space-y-1 text-sm">
          {visibleItems.map((item) => (
            <p key={item.id} className="text-[var(--text-secondary)]">
              {item.name} × {item.quantity}
            </p>
          ))}

          {order.items.length > 3 && (
            <p className="text-xs text-[var(--text-secondary)]">
              +{order.items.length - 3} more items
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t pt-3 flex justify-between items-center">
          <div className="text-sm space-y-1">
            <p className="text-[var(--text-secondary)]">
              Payment:{" "}
              <span className="capitalize font-medium text-[var(--text-primary)]">
                {order.paymentMethod}
              </span>
            </p>

            <p className="font-semibold text-[var(--primary)]">
              ₹{order.total}
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => onReorder(order)}
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
          >
            Reorder
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}
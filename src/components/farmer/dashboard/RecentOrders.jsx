import {
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const recentOrders = [
  {
    id: "#ORD-1024",
    customer: "Ravi Kumar",
    product: "Organic Tomatoes",
    amount: "₹320",
    status: "Delivered",
  },

  {
    id: "#ORD-1025",
    customer: "Sneha Reddy",
    product: "Fresh Spinach",
    amount: "₹180",
    status: "Pending",
  },

  {
    id: "#ORD-1026",
    customer: "Ajay Sharma",
    product: "Green Chillies",
    amount: "₹250",
    status: "Delivered",
  },
];

export default function RecentOrders() {
  return (
    <section className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Recent Orders
          </h2>

          <p className="text-sm text-[var(--text-secondary)]">
            Latest customer purchases
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-[var(--primary)]">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {recentOrders.map((order) => {
          const isDelivered =
            order.status === "Delivered";

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {order.customer}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {order.product}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-[var(--text-primary)]">
                    {order.amount}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    {order.id}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between">
                
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    isDelivered
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {isDelivered ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Clock3 size={14} />
                  )}

                  {order.status}
                </div>

                <button className="text-sm font-medium text-[var(--primary)]">
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}   
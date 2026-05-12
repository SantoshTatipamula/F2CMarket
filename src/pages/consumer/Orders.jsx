import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import OrderCard from "@/components/order/OrderCard";
import EmptyState from "@/components/common/ui/EmptyState";
import PageHeader from "@/components/common/ui/PageHeader";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

export default function Orders() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("f2c-orders")) || []);
  }, []);

  const handleReorder = (order) => {
    order.items.forEach((item) => addToCart(item, item.quantity));
    navigate("/cart");
  };

  return (
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Breadcrumb items={[{ label: "My Orders" }]} />
        <PageHeader title="My Orders" subtitle="Track and review your previous purchases." />

        {orders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No Orders Yet"
            description="You haven't placed any orders yet."
            ctaLabel="Browse Products"
            ctaHref="/products"
          />
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onReorder={handleReorder} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

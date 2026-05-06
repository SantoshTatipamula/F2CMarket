import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

import OrderCard from "@/components/order/OrderCard";
import { Button } from "@/components/ui/button";

export default function Orders() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("f2c-orders")) || [];

    setOrders(savedOrders);
  }, []);

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.quantity);
    });

    navigate("/cart");
  };
  return (
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            My Orders
          </h1>

          <p className="text-[var(--text-secondary)] mt-2">
            Track and review your previous purchases.
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white border border-[var(--border)] rounded-2xl p-8 text-center">
            <p className="text-[var(--text-secondary)] mb-4">
              You haven’t placed any orders yet.
            </p>

            <Link to="/products">
              <Button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onReorder={handleReorder}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

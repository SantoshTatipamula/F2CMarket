import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/order/CheckoutForm";
import PaymentMethods from "@/components/order/PaymentMethods";
import OrderSummary from "@/components/order/OrderSummary";
import PlaceOrderButton from "@/components/order/PlaceOrderButton";
import PageHeader from "@/components/common/ui/PageHeader";

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  city: "",
  pincode: "",
  address: "",
};

const isFormFilled = (form) =>
  Object.values(form).every((v) => v.trim() !== "");

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const deliveryFee = cartTotal > 499 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    setLoading(true);

    setTimeout(() => {
      const newOrder = {
        id: "F2C" + Math.floor(100000 + Math.random() * 900000),
        items: cartItems,
        total: finalTotal,
        paymentMethod: selectedMethod,
        address: formData,
        date: new Date().toISOString(),
        status: "Placed",
      };

      const existing = JSON.parse(localStorage.getItem("f2c-orders")) || [];
      localStorage.setItem("f2c-orders", JSON.stringify([newOrder, ...existing]));

      navigate("/order-success", { state: { orderId: newOrder.id } });
      setTimeout(clearCart, 100);
    }, 1200);
  };

  return (
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <PageHeader
          title="Checkout"
          subtitle="Complete your purchase securely."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CheckoutForm formData={formData} onChange={handleChange} />
            <PaymentMethods
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 h-fit">
            <OrderSummary
              cartItems={cartItems}
              cartTotal={cartTotal}
              deliveryFee={deliveryFee}
              finalTotal={finalTotal}
            />
            <PlaceOrderButton
              onClick={handlePlaceOrder}
              loading={loading}
              disabled={!isFormFilled(formData)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

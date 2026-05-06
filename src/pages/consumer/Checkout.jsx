import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";

import CheckoutForm from "@/components/order/CheckoutForm";
import PaymentMethods from "@/components/order/PaymentMethods";
import OrderSummary from "@/components/order/OrderSummary";
import PlaceOrderButton from "@/components/order/PlaceOrderButton";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [selectedMethod, setSelectedMethod] =
    useState("cod");

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    pincode: "",
    address: "",
  });

  const isFormValid =
  formData.fullName.trim() &&
  formData.phone.trim() &&
  formData.city.trim() &&
  formData.pincode.trim() &&
  formData.address.trim();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const deliveryFee =
    cartTotal > 499 ? 0 : 40;

  const finalTotal =
    cartTotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    // Get existing orders
    const existingOrders =
      JSON.parse(localStorage.getItem("f2c-orders")) || [];

    // Save new order
    localStorage.setItem(
      "f2c-orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    // Navigate first
    navigate("/order-success", {
      state: { orderId: newOrder.id },
    });

    // Clear cart after navigation
    setTimeout(() => {
      clearCart();
    }, 100);
  }, 1200);
};
  return (
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Checkout
          </h1>

          <p className="text-[var(--text-secondary)] mt-2">
            Complete your purchase securely.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            <CheckoutForm
              formData={formData}
              onChange={handleChange}
            />

            <PaymentMethods
              selectedMethod={selectedMethod}
              setSelectedMethod={
                setSelectedMethod
              }
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
              disabled={!isFormValid}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
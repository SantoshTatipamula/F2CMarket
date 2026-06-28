import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { buildOrder, saveOrder } from "@/services/orderService";
import { SERVICEABLE_LOCATIONS } from "@/data/serviceableLocations";

import { useLocation } from "@/context/LocationContext";
import LocationDialog from "@/components/home/hero/LocationDialog";
import { MapPin } from "lucide-react";

import CheckoutForm from "@/components/order/CheckoutForm";
import PaymentMethods from "@/components/order/PaymentMethods";
import OrderSummary from "@/components/order/OrderSummary";
import PlaceOrderButton from "@/components/order/PlaceOrderButton";
import PageHeader from "@/components/common/ui/PageHeader";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  city: "",
  pincode: "",
  address: "",
  deliverySlot: "morning",
};
const isFormFilled = (form) =>
  Object.values(form).every((v) => v.trim() !== "");

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const { selectedLocation } = useLocation();

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const deliveryFee = cartTotal > 499 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  useEffect(() => {
    if (cartItems.length === 0) navigate("/cart");
  }, [cartItems, navigate]);

  useEffect(() => {
    if (!selectedLocation) return;

    const matchedVillage = SERVICEABLE_LOCATIONS.find((location) =>
      location.aliases.some(
        (alias) =>
          alias.toLowerCase() === (selectedLocation.city || "").toLowerCase(),
      ),
    );

    setFormData((prev) => ({
      ...prev,

      city: selectedLocation.city || "",

      address: selectedLocation.fullAddress || "",

      // Use API postcode first, otherwise use dataset postcode
      pincode: selectedLocation.postcode || matchedVillage?.postcode || "",
    }));
  }, [selectedLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!isFormFilled(formData) || loading) return;

    setLoading(true);

    try {
      const orderPayload = buildOrder({
        cartItems,
        formData,
        paymentMethod: selectedMethod,
        user,
        deliveryFee,
        deliveryLocation: selectedLocation,
      });

      const saved = await saveOrder(orderPayload);

      navigate("/order-success", {
        state: { orderId: saved.id },
      });

      clearCart();
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--surface)] py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Breadcrumb
          items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
        />
        <PageHeader
          title="Checkout"
          subtitle="Complete your purchase securely."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <MapPin className="h-5 w-5 text-[var(--primary)]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[var(--text-secondary)]">
                      Delivery Location
                    </p>

                    <p
                      className="mt-1 text-sm font-semibold text-[var(--text-primary)]"
                      title={selectedLocation?.city}
                    >
                      {selectedLocation?.city || "Unknown Location"}
                    </p>

                    <p className="text-xs text-[var(--text-secondary)]">
                      {selectedLocation?.district}
                      {selectedLocation?.district && selectedLocation?.state
                        ? ", "
                        : ""}
                      {selectedLocation?.state}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setLocationDialogOpen(true)}
                  className="shrink-0 text-sm font-semibold text-[var(--primary)] hover:underline"
                >
                  Change
                </button>
              </div>
            </div>
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
      <LocationDialog
        open={locationDialogOpen}
        onOpenChange={setLocationDialogOpen}
      />
    </section>
  );
}

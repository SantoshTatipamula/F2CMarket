import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, MapPin } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { parsePrice } from "@/utils/parsePrice";

import { useLocation } from "@/context/LocationContext";
import LocationDialog from "@/components/home/hero/LocationDialog";

import EmptyState from "@/components/common/ui/EmptyState";
import PageHeader from "@/components/common/ui/PageHeader";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

export default function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const { selectedLocation } = useLocation();

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const deliveryFee = cartTotal > 499 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <section className="min-h-screen bg-[var(--surface)] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Cart" }]} />

        {cartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="Your Cart is Empty"
            description="Add fresh farm products to start shopping."
            ctaLabel="Browse Products"
            ctaHref="/products"
          />
        ) : (
          <>
            <PageHeader
              title="Shopping Cart"
              subtitle={`${cartItems.reduce(
                (sum, item) => sum + item.quantity,
                0,
              )} item${
                cartItems.reduce((sum, item) => sum + item.quantity, 0) !== 1
                  ? "s"
                  : ""
              } in your cart`}
              action={
                <button
                  onClick={clearCart}
                  className="rounded-xl border border-[var(--border)] px-4 h-11 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface)] hover:text-red-500"
                >
                  Clear Cart
                </button>
              }
            />

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const price = parsePrice(item.price);
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover shrink-0 border border-[var(--border)]"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[var(--text-primary)] text-sm sm:text-base leading-tight truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                            {item.farmer}
                          </p>
                          <p className="font-bold text-[var(--primary)] mt-1 text-sm sm:text-base">
                            ₹{price}
                          </p>

                          {/* Qty + Delete row — always visible on mobile */}
                          <div className="flex items-center justify-between mt-3">
                            {/* Qty controls — min 44px */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decreaseQty(item.id)}
                                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--border)] transition hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] active:scale-95"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-[28px] text-center font-bold text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQty(item.id)}
                                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--border)] transition hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] active:scale-95"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Subtotal + Delete */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[var(--text-primary)]">
                                ₹{(price * item.quantity).toFixed(0)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="h-9 w-9 flex items-center justify-center rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition active:scale-95"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary — stacks below on mobile, sticky on desktop */}
              <div className="h-fit rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">
                      Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)}{" "}
                      items)
                    </span>
                    <span className="font-semibold">
                      ₹{cartTotal.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">
                      Delivery
                    </span>

                    {deliveryFee === 0 ? (
                      <span className="font-semibold text-green-600">Free</span>
                    ) : (
                      <span className="font-semibold">₹{deliveryFee}</span>
                    )}
                  </div>
                  <div className="border-t border-[var(--border)] pt-3 flex justify-between">
                    <span className="font-bold text-base text-[var(--text-primary)]">
                      Total
                    </span>
                    <span className="text-xl font-bold text-[var(--primary)]">
                      ₹{finalTotal.toFixed(0)}
                    </span>
                  </div>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-xs text-[var(--text-secondary)]">
                    Add products worth ₹{(500 - cartTotal).toFixed(0)} more to
                    get free delivery.
                  </p>
                )}

                <Link to="/checkout" className="block mt-5">
                  <button className="w-full h-12 rounded-2xl bg-[var(--primary)] font-bold text-white text-sm transition hover:bg-[var(--primary-hover)] active:scale-95">
                    Proceed to Checkout
                  </button>
                </Link>

                <Link
                  to="/products"
                  className="mt-3 block text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <LocationDialog
        open={locationDialogOpen}
        onOpenChange={setLocationDialogOpen}
      />
    </section>
  );
}

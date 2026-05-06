// src/pages/consumer/Cart.jsx

import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  /* Empty Cart */
  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[var(--bg)] py-16">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface)]">
            <ShoppingCart size={34} className="text-[var(--text-muted)]" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[var(--text-primary)]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-[var(--text-secondary)]">
            Add fresh farm products to start shopping.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)]"
          >
            <ArrowLeft size={18} />
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[var(--bg)] py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              Shopping Cart
            </h1>

            <p className="mt-1 text-[var(--text-secondary)]">
              {cartItems.length} item(s) in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface)]"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => {
              const price =
                Number(String(item.price).replace(/[^\d.]/g, "")) || 0;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-full rounded-2xl object-cover sm:w-32"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {item.farmer}
                      </p>

                      <p className="mt-2 font-semibold text-[var(--primary)]">
                        ₹{price}
                      </p>
                    </div>

                    {/* Qty */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] transition hover:bg-[var(--primary)] hover:text-white"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-[32px] text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] transition hover:bg-[var(--primary)] hover:text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Delivery</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[var(--primary)]">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Link to="/checkout">
              <button className="mt-6 w-full rounded-2xl bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)]">
                Proceed to Checkout
              </button>
            </Link>

            <Link
              to="/products"
              className="mt-3 block text-center text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

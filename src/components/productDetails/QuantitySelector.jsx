// src/components/productDetails/QuantitySelector.jsx

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  min = 1,
  max = 20,
  initial = 1,
  onChange,
}) {
  const [qty, setQty] = useState(initial);

  const updateQty = (value) => {
    const nextQty = Math.max(min, Math.min(max, value));
    setQty(nextQty);
    
    if (onChange) {
      onChange(nextQty);
    }
  };

  const decreaseQty = () => {
    if (qty > min) {
      updateQty(qty - 1);
    }
  };

  const increaseQty = () => {
    if (qty < max) {
      updateQty(qty + 1);
    }
  };

  const isMinReached = qty <= min;
  const isMaxReached = qty >= max;

  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-[var(--border)] bg-white p-2 shadow-sm">
      <button
        onClick={decreaseQty}
        disabled={isMinReached}
        className={`flex h-11 w-11 items-center justify-center rounded-xl font-semibold transition-all ${
          isMinReached
            ? "cursor-not-allowed bg-gray-100 text-gray-300"
            : "bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white hover:scale-110 active:scale-95"
        }`}
        aria-label="Decrease quantity"
      >
        <Minus size={18} strokeWidth={2.5} />
      </button>

      <div className="relative min-w-[60px] text-center">
        <input
          type="number"
          value={qty}
          onChange={(e) => {
            const val = parseInt(e.target.value) || min;
            updateQty(val);
          }}
          min={min}
          max={max}
          className="w-full border-none bg-transparent text-center text-xl font-bold text-[var(--text-primary)] outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {/* <p className="text-[10px] font-medium text-[var(--text-muted)]">
          {product?.unit || "Kg"}
        </p> */}
      </div>

      <button
        onClick={increaseQty}
        disabled={isMaxReached}
        className={`flex h-11 w-11 items-center justify-center rounded-xl font-semibold transition-all ${
          isMaxReached
            ? "cursor-not-allowed bg-gray-100 text-gray-300"
            : "bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white hover:scale-110 active:scale-95"
        }`}
        aria-label="Increase quantity"
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
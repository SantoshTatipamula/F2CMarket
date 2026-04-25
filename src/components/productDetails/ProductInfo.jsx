// src/components/productDetails/ProductInfo.jsx

import { Star, MapPin } from "lucide-react";
import { useState } from "react";

import QuantitySelector from "./QuantitySelector";
import ProductPricing from "./ProductPricing";
import ProductActions from "./ProductActions";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);

  const price = Number(String(product?.price).replace(/[^\d.]/g, "")) || 0;

  const handleAddToCart = () => {
    console.log("Added to cart:", { product, quantity });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { product, quantity });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight text-[var(--text-primary)] lg:text-4xl">
          {product?.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5">
            <Star size={16} fill="#F59E0B" className="text-amber-500" />
            <span className="font-semibold text-amber-900">
              {product?.rating || 4.8}
            </span>
            <span className="text-sm text-amber-700">(125 reviews)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <MapPin size={15} className="text-[var(--primary)]" />
            <span>{product?.location}</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <ProductPricing product={product} price={price} />

      {/* Quantity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Select Quantity
          </p>
          <p className="text-sm font-medium text-green-600">✓ In Stock</p>
        </div>

        <QuantitySelector
          min={1}
          max={20}
          initial={quantity}
          onChange={setQuantity}
        />

        <p className="text-xs text-[var(--text-muted)] rounded-lg bg-green-100 px-2.5 py-1 w-fit">
          Total: ₹{(price * quantity).toFixed(2)}
        </p>
      </div>

      {/* Actions (Add to Cart + Buy Now + Save/Share) */}
      <ProductActions
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}
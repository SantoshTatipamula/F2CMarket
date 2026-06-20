// src/components/productDetails/ProductPricing.jsx

export default function ProductPricing({ product, price }) {
  const oldPrice = Math.round(price + price * 0.18);
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
      <div className="flex items-end gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--text-muted)]">Price</p>
          <div className="flex items-center gap-0.5">
            <span className="text-4xl font-bold text-orange-500 lg:text-5xl">
              ₹
            </span>

            <span className="text-4xl font-bold text-[var(--primary)] lg:text-5xl">
              {String(price).replace(/^₹/, "")}
            </span>
          </div>
        </div>

        {discount > 0 && (
          <div className="mb-2 space-y-1">
            <span className="inline-block rounded-lg bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
              Save {discount}%
            </span>
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Per {product.stockUnit || "kg"} | Inclusive of all taxes
      </p>
    </div>
  );
}

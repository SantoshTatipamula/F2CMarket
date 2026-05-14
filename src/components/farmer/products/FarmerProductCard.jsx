import ProductActions from "./ProductActions";

export default function FarmerProductCard({
  product,
  onEdit,
  onDelete,
}) {
  return (
    <article
      className="
        overflow-hidden
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
      "
    >
      
      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-full w-full object-cover
          "
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        
        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {product.description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between">
          
          <div>
            <p className="text-xs text-[var(--text-secondary)]">
              Price
            </p>

            <p className="text-lg font-bold text-[var(--primary)]">
              ₹{product.price}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-[var(--text-secondary)]">
              Stock
            </p>

            <p className="font-semibold">
              {product.stock}
            </p>
          </div>
        </div>

        {/* Actions */}
        <ProductActions
          onEdit={() => onEdit(product)}
          onDelete={() =>
            onDelete(product.id)
          }
        />
      </div>
    </article>
  );
}
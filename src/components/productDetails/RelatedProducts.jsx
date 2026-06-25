import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

import ProductCard from "../product/ProductCard";

import { useProducts } from "@/context/ProductContext";

export default function RelatedProducts({ product }) {
  const navigate = useNavigate();

  const { products } = useProducts();

  const relatedProducts = products
    .filter(
      (item) =>
        String(item.id) !== String(product?.id) &&
        item.category === product?.category
    )
    .slice(0, 4);

  const goToProducts = () => {
    navigate("/products");
  };

  if (!relatedProducts.length) return null;

  return (
    <section className="mt-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-1.5">
            <Sparkles size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              You May Also Like
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            Related Products
          </h2>
          
          <p className="mt-2 text-[var(--text-secondary)]">
            Similar fresh products from the same category
          </p>
        </div>

        <button onClick={goToProducts} className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--border)] bg-white px-6 py-3 font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:scale-105">
          <span>View All</span>
          <ArrowRight 
            size={18} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            variant="catalog"
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">
          Explore More Fresh Products
        </h3>
        
        <p className="mt-2 text-[var(--text-secondary)]">
          Discover our wide range of farm-fresh vegetables, fruits, and organic products
        </p>
        
        <button onClick={goToProducts} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-green-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-[var(--primary)]/30 transition-all hover:scale-105 hover:shadow-xl">
          <span>Browse All Products</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
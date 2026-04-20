import { Heart, ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white border border-slate-200 rounded-3xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image Area */}
      <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
        {/* Badge */}
        <span className="absolute top-3 left-3 z-10 text-xs font-semibold bg-green-600 text-white px-3 py-1 rounded-full">
          {product.badge}
        </span>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-red-100 transition">
          <Heart size={16} className="text-slate-500" />
        </button>

        {/* Fixed Size Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* Farmer */}
        <p className="text-sm text-slate-500">{product.farmer}</p>

        {/* Name + Rating */}
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-800 text-lg leading-snug line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 shrink-0 mt-1">
            <Star size={15} className="fill-orange-400 text-orange-400" />
            <span className="text-sm font-medium text-slate-700">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button className="px-5 py-2.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2 transition">
            <ShoppingCart size={16} />
            Add
          </button>

          <span className="text-2xl font-bold text-green-600">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

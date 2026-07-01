// src/components/productDetails/ProductGallery.jsx

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function ProductGallery({ product }) {
  const images =
    product?.images?.length > 0 ? product.images : [product?.image];

  const [activeIndex, setActiveIndex] = useState(0);

  const currentImage = images[activeIndex];

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-white to-[var(--surface)] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <div className="relative overflow-hidden rounded-2xl bg-white">
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-[var(--text-primary)]" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/95 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-[var(--text-primary)]" />
              </button>
            </>
          )}

          {/* Expand Icon */}
          <button className="absolute right-4 top-4 z-20 rounded-full bg-white/95 p-2 opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-110">
            <Maximize2 size={16} className="text-[var(--text-primary)]" />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 z-20 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {activeIndex + 1} / {images.length}
            </div>
          )}

          {/* Main Image */}
          <div className="aspect-[4/3] w-full max-h-[500px] overflow-hidden bg-gradient-to-br from-[var(--surface)] to-white">
            <img loading="lazy"
              src={currentImage}
              alt={product?.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
          {images.map((img, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                  isActive
                    ? "scale-105 border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
                    : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:scale-105"
                }`}
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-[var(--surface)] to-white">
                  <img loading="lazy"
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`h-full w-full object-cover transition-all ${
                      isActive ? "" : "group-hover:scale-110"
                    }`}
                  />
                </div>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute inset-0 border-2 border-[var(--primary)] bg-[var(--primary)]/10" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
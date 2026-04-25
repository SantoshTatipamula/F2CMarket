import { MapPin, RotateCcw } from "lucide-react";

export default function ProductFilters({
  setCategory,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  selectedLocation,
  setSelectedLocation,
  availableLocations = [],
  maxLimit,
}) {
  const min = 20;
  const max = maxLimit;

  const percentage =
    ((maxPrice - min) / (max - min)) * 100;

  return (
    <div
      className="
        bg-transparent border-none shadow-none p-0
        lg:bg-[var(--bg)]
        lg:p-6
        lg:rounded-3xl
        lg:border
        lg:border-[var(--border)]
        lg:shadow-sm
        flex flex-col gap-8
      "
    >
      {/* Location */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-[var(--text-primary)] font-bold text-xs uppercase tracking-widest">
          <MapPin
            size={16}
            className="text-[var(--primary)]"
          />
          Location
        </div>

        <div className="grid grid-cols-2 gap-2">
          {availableLocations.map((loc) => {
            const active =
              selectedLocation.toLowerCase() ===
              loc.toLowerCase();

            return (
              <button
                key={loc}
                type="button"
                onClick={() =>
                  setSelectedLocation(loc)
                }
                className={`px-2 py-2 text-[11px] font-bold rounded-xl border transition-all ${
                  active
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-md"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">
            Price Range
          </span>

          <div className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <span className="text-sm font-bold text-[var(--primary)]">
              ₹{maxPrice}
            </span>
          </div>
        </div>

        <div className="relative flex items-center px-1">
          <input
            type="range"
            min={min}
            max={max}
            step="10"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Number(e.target.value))
            }
            style={{
              background: `linear-gradient(to right, var(--primary) ${percentage}%, var(--surface-2) ${percentage}%)`,
            }}
            className="
              w-full h-2 rounded-lg appearance-none cursor-pointer transition-all

              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-[var(--bg)]
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-[var(--primary)]
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              hover:[&::-webkit-slider-thumb]:scale-110
            "
          />
        </div>

        <div className="flex justify-between px-0.5">
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            ₹{min}
          </span>

          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            ₹{max}
          </span>
        </div>
      </div>

      {/* Ratings */}
      <div>
        <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest block mb-4">
          Ratings
        </span>

        <div className="space-y-3">
          {[4, 3].map((star) => {
            const active =
              Number(minRating) === star;

            return (
              <label
                key={star}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() =>
                    setMinRating(
                      active ? 0 : star
                    )
                  }
                  className="w-5 h-5 cursor-pointer accent-[var(--primary)]"
                />

                <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  {star}★ & above
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={() => {
          setCategory("All");
          setMaxPrice(maxLimit);
          setSelectedLocation("All");
          setMinRating(0);
        }}
        className="w-full h-11 px-5 rounded-xl bg-[var(--text-primary)] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition shadow-lg"
      >
        <RotateCcw size={14} />
        Reset All Filters
      </button>
    </div>
  );
}
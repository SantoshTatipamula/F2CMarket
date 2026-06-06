export default function CategoryFilters({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`
                px-5 py-2.5
                rounded-full
                font-medium
                transition-all
                duration-300
                ${
                  selectedCategory === category
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "bg-white border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
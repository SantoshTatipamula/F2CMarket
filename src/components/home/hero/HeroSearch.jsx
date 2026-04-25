import { Search } from "lucide-react";

export default function HeroSearch() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">

      <div className="relative w-full">
        <Search
          size={20}
          className="absolute top-1/2 -translate-y-1/2 left-4 text-[var(--text-light)]"
        />

        <input
          type="text"
          placeholder="Search fresh products..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--border-strong)] focus:border-green-500 outline-none"
        />
      </div>

      <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-7 py-4 rounded-2xl font-semibold transition">
        Search
      </button>

    </div>
  );
}
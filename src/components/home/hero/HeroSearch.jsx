import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/context/SearchContext";

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { setSearchQuery } = useSearch();

  const handleSearch = () => {
    const query = searchTerm.trim();

    if (!query) return;

    setSearchQuery(query);
    navigate("/products");
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <div className="relative w-full">
        <Search
          size={20}
          className="absolute top-1/2 -translate-y-1/2 left-4 text-[var(--text-light)]"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search fresh products..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--border-strong)] focus:border-green-500 outline-none"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-7 py-4 rounded-2xl font-semibold transition"
      >
        Search
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";

import { searchLocation } from "@/services/locationService";

export default function LocationSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const locations = await searchLocation(query);
        setResults(locations);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="space-y-3">
      {/* Search Box */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          placeholder="Search village, town or city..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-white py-3 pl-10 pr-4 outline-none transition focus:border-[var(--primary)]"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Loader2 size={16} className="animate-spin" />
          Searching locations...
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="max-h-32 overflow-y-auto rounded-xl border border-[var(--border)] bg-white shadow-sm">
          {results.map((item) => (
            <button
              key={item.placeId}
              type="button"
              onClick={() => {
                onSelect(item);
                setQuery(item.displayName);
                setResults([]);
              }}
              className="block w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 last:border-b-0"
            >
              <p className="font-medium text-[var(--text-primary)]">
                {item.name}
              </p>

              <p className="text-xs text-[var(--text-secondary)]">
                {item.displayName}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
import {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";

const SearchContext = createContext();

export function SearchProvider({
  children,
}) {
  const [searchQuery, setSearchQuery] =
    useState("");

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
    }),
    [searchQuery],
  );

  return (
    <SearchContext.Provider
      value={value}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}f
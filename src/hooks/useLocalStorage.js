import { useState, useEffect } from "react";

/**
 * Drop-in replacement for useState that persists the value in localStorage.
 *
 * @template T
 * @param {string}   key          - localStorage key
 * @param {T}        initialValue - Fallback when no stored value exists
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      /* quota exceeded or private-mode – fail silently */
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

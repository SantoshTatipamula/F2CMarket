import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] =
    useState(() => {
      const saved = localStorage.getItem(
        "f2c-wishlist"
      );

      return saved ? JSON.parse(saved) : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "f2c-wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  /* Toggle Wishlist */
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prev, product];
    });
  };

  /* Check Exists */
  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) => item.id === id
    );
  };

  const wishlistCount = useMemo(() => {
    return wishlistItems.length;
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
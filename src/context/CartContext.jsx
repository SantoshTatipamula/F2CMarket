import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { parsePrice } from "@/utils/parsePrice";
import { useAuth } from "@/context/AuthContext";
import {
  getCartFromFirestore,
  saveCartToFirestore,
} from "@/services/cartFirestoreService";

const CartContext = createContext();

function mergeCartItems(localItems, remoteItems) {
  const merged = [...remoteItems];
  const remoteMap = new Map(remoteItems.map((item) => [String(item.id), item]));

  for (const localItem of localItems) {
    const key = String(localItem.id);
    if (!remoteMap.has(key)) {
      merged.push(localItem);
      continue;
    }

    const remoteItem = remoteMap.get(key);
    merged[merged.findIndex((item) => String(item.id) === key)] = {
      ...remoteItem,
      quantity: (remoteItem.quantity || 0) + (localItem.quantity || 0),
    };
  }

  return merged;
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useLocalStorage("f2c-cart", []);
  const [remoteCartLoaded, setRemoteCartLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadRemoteCart() {
      if (!user?.id) {
        setRemoteCartLoaded(false);
        return;
      }

      try {
        const remoteItems = await getCartFromFirestore(user.id);
        if (!mounted) return;

        setCartItems((prevCartItems) => mergeCartItems(prevCartItems, remoteItems));
        setRemoteCartLoaded(true);
      } catch (error) {
        console.error("Failed to load cart from Firestore:", error);
        if (mounted) {
          setRemoteCartLoaded(true);
        }
      }
    }

    loadRemoteCart();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || !remoteCartLoaded) return;

    saveCartToFirestore(user.id, cartItems).catch((error) => {
      console.error("Failed to sync cart to Firestore:", error);
    });
  }, [cartItems, user?.id, remoteCartLoaded]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      /* Store numericPrice once so downstream (orderService) never re-parses */
      return [...prev, { ...product, quantity, numericPrice: parsePrice(product.price) }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const increaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + (item.numericPrice ?? parsePrice(item.price)) * item.quantity,
        0
      ),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

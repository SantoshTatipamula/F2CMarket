// src/context/CartContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("f2c-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  /* Save cart in localStorage */
  useEffect(() => {
    localStorage.setItem(
      "f2c-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  /* Add Item */
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  /* Remove Item */
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /* Increase Qty */
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /* Decrease Qty */
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  /* Clear Cart */
  const clearCart = () => {
    setCartItems([]);
  };

  /* Cart Count */
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cartItems]);

  /* Cart Total */
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => {
        const price =
          Number(
            String(item.price).replace(
              /[^\d.]/g,
              ""
            )
          ) || 0;

        return (
          total +
          price * item.quantity
        );
      },
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* Hook */
export function useCart() {
  return useContext(CartContext);
}